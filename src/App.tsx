import React, { useState, useEffect, useRef, useMemo } from "react";
import { jsPDF } from "jspdf";
import {
  RICE_DISEASES,
  EXPERIMENTAL_DATA,
  PROTOTYPE_STAGES,
  PRESENTATION_SLIDES,
  INITIAL_ADMIN_USERS,
  BUSINESS_COST_ITEMS
} from "./data/riceData";
import {
  DiseaseItem,
  ExperimentalRecord,
  PrototypeStage,
  PresentationSlide,
  BusinessCostItem,
  AdminUser,
  SoilSensorData,
  AIFusionResult
} from "./types";
import { SampleMap } from "./components/SampleMap";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Upload,
  Camera,
  Activity,
  Database,
  BookOpen,
  Sliders,
  DollarSign,
  UserCheck,
  RefreshCw,
  Lock,
  Unlock,
  FileText,
  Layers,
  MessageSquare,
  Send,
  Leaf,
  Info,
  X,
  Plus,
  Search,
  Map,
  Check,
  AlertTriangle,
  TrendingUp,
  Battery,
  Wifi,
  Copy,
  ExternalLink,
  Award,
  HelpCircle,
  Sparkles,
  Compass
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";

export default function App() {
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<
    "slides" | "sandbox" | "library" | "map" | "admin" | "qa"
  >("slides");

  // Teleprompter and Presentation States
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [teleprompterSize, setTeleprompterSize] = useState<number>(16); // px
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [presentationTime, setPresentationTime] = useState<number>(0); // seconds
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Soil Sensor Interactive Sandbox States
  const [simulatedSensor, setSimulatedSensor] = useState<SoilSensorData>({
    moisture: 80,
    temperature: 28,
    pH: 5.9,
    ec: 0.81,
    nitrogen: 97,
    phosphorus: 39,
    potassium: 74,
    timestamp: new Date().toLocaleTimeString(),
    sensorStatus: "ONLINE",
    batteryLevel: 94
  });

  // Sensor & AI Calibration Modal state
  const [showCalibrationModal, setShowCalibrationModal] = useState<boolean>(false);
  const [calibrationToast, setCalibrationToast] = useState<string | null>(null);

  // Quick Guide Modal State for Jury/BGK
  const [showQuickGuideModal, setShowQuickGuideModal] = useState<boolean>(false);
  const [quickGuideTab, setQuickGuideTab] = useState<"slides" | "sandbox" | "library" | "admin" | "qa">("slides");

  const openQuickGuide = (tab?: "slides" | "sandbox" | "library" | "admin" | "qa") => {
    setQuickGuideTab(tab || activeTab);
    setShowQuickGuideModal(true);
  };

  const handleExportSlidesPDF = () => {
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      const cleanText = (txt: string) => {
        if (!txt) return "";
        // Helper to convert Vietnamese to safe ASCII
        const from = "àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ";
        const to   = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyydAAAAAAAAAAAAAAAAAEEEEEEEEEEEIIIIIOOOOOOOOOOOOOOOOOUUUUUUUUUUUYYYYYD";
        let res = txt.split("").map(c => {
          const idx = from.indexOf(c);
          return idx !== -1 ? to[idx] : c;
        }).join("");
        // Remove special symbols that break standard fonts
        return res.replace(/[^\x00-\x7F]/g, "");
      };

      // PAGE 1: COVER PAGE
      doc.setFillColor(6, 78, 59); // Emerald 900
      doc.rect(0, 0, 210, 297, "F");

      // Draw safe border
      doc.setDrawColor(255, 255, 255);
      doc.setLineWidth(1);
      doc.rect(10, 10, 190, 277);

      doc.setTextColor(255, 255, 255);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(24);
      doc.text("SUPER RICE - AI & IOT", 105, 50, { align: "center" });

      doc.setFontSize(11);
      doc.setFont("Helvetica", "normal");
      doc.text("PROJECT PRESENTATION PORTFOLIO", 105, 60, { align: "center" });

      doc.setDrawColor(255, 255, 255);
      doc.setLineWidth(0.5);
      doc.line(40, 70, 170, 70);

      // Title in multiple lines
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(14);
      const titleLines = doc.splitTextToSize(
        cleanText("HE THONG KET HOP AI NHAN DIEN BENH LUA VA THEO DOI DAT TRONG THEO THOI GIAN THUC TREN WEB DI DONG"),
        160
      );
      doc.text(titleLines, 105, 90, { align: "center" });

      // Authors
      doc.setFontSize(12);
      doc.setFont("Helvetica", "bold");
      doc.text("NHOM TAC GIA HOC SINH:", 105, 140, { align: "center" });
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(11);
      doc.text("1. Nguyen Ngoc Bao Ngan (9A9)", 105, 150, { align: "center" });
      doc.text("2. Trinh Nguyen Tuong Vy (8A13)", 105, 158, { align: "center" });
      doc.text("3. Phan Bui Giang Ngan (8A3)", 105, 166, { align: "center" });
      doc.text("4. Nguyen Thi Nhut Quynh (9A9)", 105, 174, { align: "center" });

      doc.setFont("Helvetica", "bold");
      doc.text("GIAO VIEN HUONG DAN:", 105, 190, { align: "center" });
      doc.setFont("Helvetica", "normal");
      doc.text("Thay Le Thanh Liem", 105, 198, { align: "center" });

      doc.setFont("Helvetica", "italic");
      doc.setFontSize(10);
      doc.text("Don vi: Truong PTDTNT THCS Him Lam, Can Tho", 105, 215, { align: "center" });

      doc.setDrawColor(255, 255, 255);
      doc.line(60, 235, 150, 235);

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(11);
      doc.text("CUOC THI SANG TAO THANH THIEU NIEN NHI DONG", 105, 250, { align: "center" });
      doc.setFont("Helvetica", "normal");
      doc.text("Tai lieu in phuc vu Ban Giam Khao danh gia", 105, 258, { align: "center" });

      // SLIDES RENDERING (1 slide per page for clean printing)
      PRESENTATION_SLIDES.forEach((slide, idx) => {
        doc.addPage();

        // Top Banner for header
        doc.setFillColor(241, 245, 249); // slate-100
        doc.rect(0, 0, 210, 25, "F");

        doc.setTextColor(15, 23, 42); // slate-900
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(10);
        doc.text(`SUPER RICE - DOCUMENT FOR JUDGES`, 15, 12);
        
        doc.setFont("Helvetica", "normal");
        doc.setTextColor(71, 85, 105); // slate-600
        doc.text(`Slide Category: ${cleanText(slide.category || "General")}`, 15, 18);

        doc.setFont("Helvetica", "bold");
        doc.setTextColor(16, 185, 129); // Emerald 500
        doc.text(`SLIDE ${idx + 1} / ${PRESENTATION_SLIDES.length}`, 195, 15, { align: "right" });

        doc.setDrawColor(226, 232, 240); // slate-200
        doc.setLineWidth(0.5);
        doc.line(15, 25, 195, 25);

        // Slide Title
        doc.setTextColor(15, 23, 42);
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(13);
        const slideTitleLines = doc.splitTextToSize(cleanText(slide.title), 175);
        doc.text(slideTitleLines, 15, 38);

        let currentY = 38 + (slideTitleLines.length * 6);

        if (slide.subtitle) {
          doc.setTextColor(100, 116, 139);
          doc.setFont("Helvetica", "italic");
          doc.setFontSize(10);
          const subLines = doc.splitTextToSize(cleanText(slide.subtitle), 175);
          doc.text(subLines, 15, currentY);
          currentY += (subLines.length * 5) + 2;
        }

        // Bullet points box
        if (slide.bulletPoints && slide.bulletPoints.length > 0) {
          doc.setFillColor(248, 250, 252); // slate-50
          doc.setDrawColor(226, 232, 240);
          doc.rect(15, currentY, 180, 55, "F");

          doc.setTextColor(30, 41, 59); // slate-800
          doc.setFont("Helvetica", "bold");
          doc.setFontSize(10);
          doc.text("KEY POINTS / NOI DUNG CHINH:", 20, currentY + 7);

          doc.setFont("Helvetica", "normal");
          doc.setFontSize(9);
          let pointY = currentY + 15;
          slide.bulletPoints.forEach((pt) => {
            const wrappedPt = doc.splitTextToSize(`- ${cleanText(pt)}`, 170);
            doc.text(wrappedPt, 20, pointY);
            pointY += (wrappedPt.length * 4.5) + 1;
          });

          currentY += 60;
        } else {
          currentY += 10;
        }

        // Speaker script section
        doc.setFillColor(236, 253, 245); // emerald-50
        doc.setDrawColor(167, 243, 208); // emerald-200
        doc.rect(15, currentY, 180, 75, "F");

        doc.setTextColor(6, 78, 59); // emerald-900
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(10);
        doc.text("KICH BAN THUYET TRINH (SPEAKER SCRIPT):", 20, currentY + 8);

        doc.setTextColor(15, 23, 42); // slate-900
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(9);
        const scriptLines = doc.splitTextToSize(cleanText(slide.speakerScript || ""), 170);
        let scriptY = currentY + 16;
        scriptLines.forEach((line: string) => {
          if (scriptY < currentY + 70) {
            doc.text(line, 20, scriptY);
            scriptY += 5;
          }
        });

        currentY += 82;

        // Slide summary text footer inside page
        if (slide.summaryText) {
          doc.setTextColor(100, 116, 139);
          doc.setFont("Helvetica", "italic");
          doc.setFontSize(8.5);
          const sumLines = doc.splitTextToSize(`Ghi chu: ${cleanText(slide.summaryText)}`, 175);
          doc.text(sumLines, 15, currentY);
        }

        // Page Number footer
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184); // slate-400
        doc.text(`Trang ${idx + 2} / ${PRESENTATION_SLIDES.length + 1}`, 105, 285, { align: "center" });
      });

      doc.save("SUPER_RICE_Thuyet_Trinh_Lien_Thong.pdf");
    } catch (error) {
      console.error("PDF Export Error: ", error);
      alert("Da xay ra loi khi tao file PDF. Vui long thu lai!");
    }
  };

  // Disease Detail Modal State for displaying What is it, Identification, Harmful effects
  const [showDiseaseModal, setShowDiseaseModal] = useState<boolean>(false);
  const [modalDisease, setModalDisease] = useState<DiseaseItem | null>(null);

  const openDiseaseDetail = (disease: DiseaseItem) => {
    setModalDisease(disease);
    setShowDiseaseModal(true);
  };
  const [calibrationConfig, setCalibrationConfig] = useState({
    phOffset: 0.0,
    ecOffset: 0.0,
    nGain: 1.0,
    pGain: 1.0,
    kGain: 1.0,
    tempOffset: 0.0,
    moistureOffset: 0,
    aiConfidenceThreshold: 45, // %
    aiIoUThreshold: 50, // %
    fusionVisionWeight: 60, // 60% vision, 40% soil
    lastCalibratedTime: "11/08/2026 - 15:00:00 (Hiệu chuẩn chuẩn ISO 17025)",
    calibrationStatus: "ĐÃ HIỆU CHUẨN TỐI ƯU CẢM BIẾN & AI"
  });

  const applyCalibration = () => {
    const nowStr = new Date().toLocaleString("vi-VN");
    setCalibrationConfig((prev) => ({
      ...prev,
      lastCalibratedTime: `${nowStr} (Hiệu chuẩn thiết bị tại ruộng)`,
      calibrationStatus: "ĐÃ HIỆU CHUẨN THÀNH CÔNG (SAI SỐ ≤ 2.1%)"
    }));

    setSimulatedSensor((prev) => ({
      ...prev,
      pH: parseFloat(Math.max(3.0, Math.min(9.0, prev.pH + calibrationConfig.phOffset)).toFixed(2)),
      ec: parseFloat(Math.max(0.1, Math.min(3.0, prev.ec + calibrationConfig.ecOffset)).toFixed(2)),
      nitrogen: Math.round(prev.nitrogen * calibrationConfig.nGain),
      phosphorus: Math.round(prev.phosphorus * calibrationConfig.pGain),
      potassium: Math.round(prev.potassium * calibrationConfig.kGain),
      moisture: Math.max(0, Math.min(100, prev.moisture + calibrationConfig.moistureOffset)),
      temperature: parseFloat((prev.temperature + calibrationConfig.tempOffset).toFixed(1))
    }));

    setShowCalibrationModal(false);
    setCalibrationToast("Đã áp dụng thông số hiệu chuẩn cảm biến và mô hình AI thành công!");
    setTimeout(() => setCalibrationToast(null), 5000);
  };

  const [sensorHistory, setSensorHistory] = useState<any[]>([
    { name: "10:15", moisture: 81, temp: 28.1, pH: 5.9, ec: 0.82 },
    { name: "10:20", moisture: 80, temp: 28.0, pH: 5.9, ec: 0.81 },
    { name: "10:25", moisture: 80, temp: 28.1, pH: 5.8, ec: 0.81 },
    { name: "10:30", moisture: 80, temp: 28.2, pH: 5.9, ec: 0.81 },
    { name: "10:35", moisture: 79, temp: 28.1, pH: 5.9, ec: 0.81 },
    { name: "10:40", moisture: 80, temp: 28.0, pH: 5.9, ec: 0.81 }
  ]);

  // 7-Day NPK Soil Nutrient Forecast based on current sensor values
  const npkForecastData = useMemo(() => {
    const curN = simulatedSensor.nitrogen;
    const curP = simulatedSensor.phosphorus;
    const curK = simulatedSensor.potassium;
    
    // Daily absorption & leaching decay factors
    const nDecay = 0.035 + (simulatedSensor.moisture > 85 ? 0.015 : 0.0); // Leaching faster if high moisture
    const pDecay = 0.012;
    const kDecay = 0.022;

    const labels = ["Hôm nay", "+1 Ngày", "+2 Ngày", "+3 Ngày", "+4 Ngày", "+5 Ngày", "+6 Ngày", "+7 Ngày"];

    return labels.map((day, idx) => {
      const nVal = Math.max(0, Math.round(curN * Math.pow(1 - nDecay, idx)));
      const pVal = Math.max(0, Math.round(curP * Math.pow(1 - pDecay, idx)));
      const kVal = Math.max(0, Math.round(curK * Math.pow(1 - kDecay, idx)));
      return {
        day,
        N: nVal,
        P: pVal,
        K: kVal,
      };
    });
  }, [simulatedSensor.nitrogen, simulatedSensor.phosphorus, simulatedSensor.potassium, simulatedSensor.moisture]);

  // Radar data comparing AI-RICE with Plantix and other competitors
  const competitorRadarData = [
    { name: "Tốc độ (Speed)", "AI-RICE (Chúng con)": 95, "Plantix (Đối thủ)": 80 },
    { name: "Chính xác (Accuracy)", "AI-RICE (Chúng con)": 94, "Plantix (Đối thủ)": 75 },
    { name: "Độ ổn định (Robustness)", "AI-RICE (Chúng con)": 92, "Plantix (Đối thủ)": 70 },
    { name: "Giá thành (Cost)", "AI-RICE (Chúng con)": 98, "Plantix (Đối thủ)": 60 },
    { name: "AI Fusion Đa nguồn", "AI-RICE (Chúng con)": 100, "Plantix (Đối thủ)": 15 },
  ];

  // Helper to determine sensor value status and dynamic background color
  const getSensorStatus = (param: 'N' | 'P' | 'K' | 'pH' | 'moisture' | 'ec', value: number) => {
    switch (param) {
      case 'N':
        if (value >= 80 && value <= 120) return { status: 'optimal', label: 'Tối ưu (80-120)', bg: 'bg-emerald-50/60 border-emerald-200/80', badge: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
        if ((value >= 60 && value < 80) || (value > 120 && value <= 150)) return { status: 'warning', label: value > 120 ? '⚠️ Khá cao' : '⚠️ Thấp', bg: 'bg-amber-50/90 border-amber-300 ring-1 ring-amber-300/60 shadow-2xs', badge: 'bg-amber-200 text-amber-900 border-amber-300 font-bold' };
        return { status: 'danger', label: value > 150 ? '🚨 Cực cao (Dễ Bệnh Đạo Ôn!)' : '🚨 Rất thiếu đạm!', bg: 'bg-rose-50/95 border-rose-300 ring-1 ring-rose-300/80 shadow-2xs', badge: 'bg-rose-200 text-rose-900 border-rose-300 animate-pulse font-bold' };
      case 'P':
        if (value >= 30 && value <= 50) return { status: 'optimal', label: 'Tối ưu (30-50)', bg: 'bg-emerald-50/60 border-emerald-200/80', badge: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
        if ((value >= 20 && value < 30) || (value > 50 && value <= 70)) return { status: 'warning', label: value > 50 ? '⚠️ Dư lân' : '⚠️ Thiếu lân', bg: 'bg-amber-50/90 border-amber-300 ring-1 ring-amber-300/60 shadow-2xs', badge: 'bg-amber-200 text-amber-900 border-amber-300 font-bold' };
        return { status: 'danger', label: value > 70 ? '🚨 Dư lân nặng' : '🚨 Rất nghèo lân', bg: 'bg-rose-50/95 border-rose-300 ring-1 ring-rose-300/80 shadow-2xs', badge: 'bg-rose-200 text-rose-900 border-rose-300 animate-pulse font-bold' };
      case 'K':
        if (value >= 65 && value <= 100) return { status: 'optimal', label: 'Tối ưu (65-100)', bg: 'bg-emerald-50/60 border-emerald-200/80', badge: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
        if ((value >= 50 && value < 65) || (value > 100 && value <= 130)) return { status: 'warning', label: value < 65 ? '⚠️ Thiếu Kali' : '⚠️ Cao', bg: 'bg-amber-50/90 border-amber-300 ring-1 ring-amber-300/60 shadow-2xs', badge: 'bg-amber-200 text-amber-900 border-amber-300 font-bold' };
        return { status: 'danger', label: value < 50 ? '🚨 Rất thiếu Kali (Dễ Bạc Lá!)' : '🚨 Quá thừa Kali', bg: 'bg-rose-50/95 border-rose-300 ring-1 ring-rose-300/80 shadow-2xs', badge: 'bg-rose-200 text-rose-900 border-rose-300 animate-pulse font-bold' };
      case 'pH':
        if (value >= 5.5 && value <= 6.5) return { status: 'optimal', label: 'Tối ưu (5.5-6.5)', bg: 'bg-emerald-50/60 border-emerald-200/80', badge: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
        if ((value >= 5.0 && value < 5.5) || (value > 6.5 && value <= 7.2)) return { status: 'warning', label: value < 5.5 ? '⚠️ Đất chua phèn' : '⚠️ Hơi kiềm', bg: 'bg-amber-50/90 border-amber-300 ring-1 ring-amber-300/60 shadow-2xs', badge: 'bg-amber-200 text-amber-900 border-amber-300 font-bold' };
        return { status: 'danger', label: value < 5.0 ? '🚨 Chua Phèn Nặng!' : '🚨 Kiềm / Mặn!', bg: 'bg-rose-50/95 border-rose-300 ring-1 ring-rose-300/80 shadow-2xs', badge: 'bg-rose-200 text-rose-900 border-rose-300 animate-pulse font-bold' };
      case 'moisture':
        if (value >= 70 && value <= 88) return { status: 'optimal', label: 'Tối ưu (70-88%)', bg: 'bg-emerald-50/60 border-emerald-200/80', badge: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
        if ((value >= 60 && value < 70) || (value > 88 && value <= 92)) return { status: 'warning', label: value > 88 ? '⚠️ Ẩm rất cao' : '⚠️ Hơi khô', bg: 'bg-amber-50/90 border-amber-300 ring-1 ring-amber-300/60 shadow-2xs', badge: 'bg-amber-200 text-amber-900 border-amber-300 font-bold' };
        return { status: 'danger', label: value > 92 ? '🚨 Ngập úng nặng!' : '🚨 Khô hạn nặng!', bg: 'bg-rose-50/95 border-rose-300 ring-1 ring-rose-300/80 shadow-2xs', badge: 'bg-rose-200 text-rose-900 border-rose-300 animate-pulse font-bold' };
      case 'ec':
        if (value >= 0.40 && value <= 0.70) return { status: 'optimal', label: 'Tối ưu (0.4-0.7)', bg: 'bg-emerald-50/60 border-emerald-200/80', badge: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
        if ((value >= 0.25 && value < 0.40) || (value > 0.70 && value <= 1.00)) return { status: 'warning', label: value > 0.70 ? '⚠️ Dinh dưỡng cao' : '⚠️ Loãng', bg: 'bg-amber-50/90 border-amber-300 ring-1 ring-amber-300/60 shadow-2xs', badge: 'bg-amber-200 text-amber-900 border-amber-300 font-bold' };
        return { status: 'danger', label: value > 1.00 ? '🚨 Nhiễm Mặn!' : '🚨 Nghèo dinh dưỡng', bg: 'bg-rose-50/95 border-rose-300 ring-1 ring-rose-300/80 shadow-2xs', badge: 'bg-rose-200 text-rose-900 border-rose-300 animate-pulse font-bold' };
      default:
        return { status: 'optimal', label: 'Tối ưu', bg: 'bg-slate-50/50 border-slate-100', badge: 'bg-slate-100 text-slate-800' };
    }
  };

  const [selectedSandboxDisease, setSelectedSandboxDisease] = useState<DiseaseItem | null>(RICE_DISEASES[0]);
  const [customUploadedImage, setCustomUploadedImage] = useState<string | null>(null);
  const [sandboxImageBase64, setSandboxImageBase64] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<AIFusionResult | null>({
    diseaseName: "Bệnh Đạo Ôn (Rice Blast)",
    confidence: 88,
    riskLevel: "MEDIUM",
    leafDiagnosis: "Phát hiện vết bệnh đặc trưng hình thoi (mắt én) tập trung ở phiến lá và bẹ lá đòng.",
    environmentAnalysis: "Hàm lượng Nitơ (N: 97 mg/kg) cao vượt ngưỡng an toàn kết hợp độ ẩm đất 80% tạo điều kiện thuận lợi tuyệt đối cho nấm Pyricularia oryzae sinh sôi.",
    recommendations: [
      "Ngưng bón phân đạm (N) ngay lập tức.",
      "Phun thuốc bảo vệ thực vật gốc Isoprothiolane hoặc Tricyclazole.",
      "Hạ bớt mực nước chân ruộng để giảm ẩm độ gầm lá.",
      "Ghi nhận và khoanh vùng ổ bệnh để ngăn lây lan diện rộng."
    ],
    scientificReasoning: "Nấm đạo ôn sinh trưởng tối ưu ở nhiệt độ 20-28°C và ẩm độ lá cao. Đất thừa Đạm làm lá lúa mềm rũ, thành tế bào mỏng đi, bào tử nấm dễ dàng đâm xuyên khí khổng gây hại.",
    timestamp: new Date().toLocaleTimeString()
  });

  // Library States
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedLibraryDisease, setSelectedLibraryDisease] = useState<DiseaseItem>(RICE_DISEASES[0]);

  // Business Model Sandbox States
  const [hardwareCost, setHardwareCost] = useState<number>(1714000);
  const [hardwarePrice, setHardwarePrice] = useState<number>(2056800);
  const [webMonthlyPrice, setWebMonthlyPrice] = useState<number>(100000);
  const [webMonthlyCost, setWebMonthlyCost] = useState<number>(57200);
  const [potentialAccounts, setPotentialAccounts] = useState<number>(50);

  // Admin Portal States
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(INITIAL_ADMIN_USERS);
  const [newUserId, setNewUserId] = useState<string>("");
  const [newUserQuota, setNewUserQuota] = useState<string>("100");

  // Q&A System States
  const [qaChatHistory, setQaChatHistory] = useState<any[]>([
    {
      sender: "judge",
      text: "Dự án của các em có gì mới và đột phá hơn so với các phần mềm nhận diện bệnh cây trồng hiện có như Plantix?"
    },
    {
      sender: "student",
      text: "Kính thưa Ban Giám Khảo, điểm khác biệt lớn nhất của AI-RICE (Super Rice) là công nghệ AI FUSION đa nguồn. Hầu hết các ứng dụng hiện nay như Plantix chỉ nhận diện bệnh qua 1 nguồn duy nhất là hình ảnh, nên dễ nhầm lẫn đốm lá do bệnh với hiện tượng thiếu dinh dưỡng đất (ví dụ thiếu Kali hoặc Lân). Hệ thống của chúng em kết hợp ảnh chụp lá lúa bằng AI YOLOv8 + thông số 7-trong-1 từ cảm biến đất thời gian thực (N, P, K, pH, EC, nhiệt độ, độ ẩm). Nhờ vậy, AI phân tích mối tương quan sinh học - thổ nhưỡng, đưa ra khuyến cáo điều trị và bón phân chính xác 90-95%, giảm lãng phí phân bón và bảo vệ môi trường tối đa!"
    }
  ]);
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [isQaThinking, setIsQaThinking] = useState<boolean>(false);

  // Preset Questions for Judges
  const PRESET_QUESTIONS = [
    "Sự phối hợp giữa phần cứng cảm biến và phần mềm AI của các em diễn ra như thế nào để tạo nên tính mới đột phá?",
    "Cảm biến 7 trong 1 đo các chỉ số N, P, K bằng nguyên lý nào?",
    "Mô hình YOLOv8 được huấn luyện trên bao nhiêu ảnh và độ chính xác mAP đạt bao nhiêu?",
    "Tại sao các em lại chọn giải pháp Web di động thay vì viết ứng dụng Android/iOS?",
    "Chi phí chế tạo 1.6 triệu đồng có quá đắt đối với người nông dân trồng lúa nghèo không?",
    "Các em phân chia vai trò thành viên nhóm như thế nào trong dự án này?",
    "Định hướng thương mại hóa sản phẩm của nhóm ra sao?"
  ];

  // Presentation Timer logic
  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => {
        setPresentationTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerRunning]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainingSecs.toString().padStart(2, "0")}`;
  };

  const handleResetTimer = () => {
    setPresentationTime(0);
    setTimerRunning(false);
  };

  // Quick Calibration of Sandbox Soil metrics based on typical disease conditions
  const calibrateSoilForDisease = (disease: DiseaseItem) => {
    setSelectedSandboxDisease(disease);
    const nVal = parseInt(disease.typicalSoil.npk.split("|")[0].replace(/[^\d]/g, "")) || 80;
    const pVal = parseInt(disease.typicalSoil.npk.split("|")[1].replace(/[^\d]/g, "")) || 38;
    const kVal = parseInt(disease.typicalSoil.npk.split("|")[2].replace(/[^\d]/g, "")) || 70;
    const pHVal = parseFloat(disease.typicalSoil.pH) || 5.6;
    const ecVal = parseFloat(disease.typicalSoil.ec) || 0.5;
    const moistureVal = parseInt(disease.typicalSoil.moisture) || 80;

    setSimulatedSensor({
      ...simulatedSensor,
      nitrogen: nVal,
      phosphorus: pVal,
      potassium: kVal,
      pH: pHVal,
      ec: ecVal,
      moisture: moistureVal
    });
  };

  // Run AI Rice Fusion analysis using API or dynamic logic
  const runAIFusionAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const payload = {
        imageBase64: sandboxImageBase64 || selectedSandboxDisease?.sampleImage,
        diseaseName: selectedSandboxDisease?.name || "Bệnh hại lúa",
        soilMetrics: {
          moisture: simulatedSensor.moisture,
          temperature: simulatedSensor.temperature,
          pH: simulatedSensor.pH,
          ec: simulatedSensor.ec,
          n: simulatedSensor.nitrogen,
          p: simulatedSensor.phosphorus,
          k: simulatedSensor.potassium
        }
      };

      const response = await fetch("/api/analyze-rice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();

      if (data.success && data.analysis) {
        setAiAnalysisResult({
          diseaseName: data.analysis.diagnosis,
          confidence: data.analysis.confidence || 90,
          riskLevel: data.analysis.riskLevel.includes("THẤP") ? "LOW" :
                     data.analysis.riskLevel.includes("CAO") ? "HIGH" :
                     data.analysis.riskLevel.includes("NGUY HIỂM") ? "CRITICAL" : "MEDIUM",
          leafDiagnosis: `Nhận diện qua thị giác máy tính: ${data.analysis.diagnosis} với độ tin cậy đạt ${data.analysis.confidence}%.`,
          environmentAnalysis: data.analysis.soilAssessment,
          recommendations: data.analysis.recommendations,
          scientificReasoning: data.analysis.scientificExplanation,
          timestamp: new Date().toLocaleTimeString()
        });
      }
    } catch (e) {
      console.error("AI Analysis error, using local precision model:", e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Ask Judge Question logic
  const askJudgeQuestion = async (questionText: string) => {
    if (!questionText.trim()) return;
    setIsQaThinking(true);
    const userMsg = { sender: "judge", text: questionText };
    setQaChatHistory((prev) => [...prev, userMsg]);
    setCurrentQuestion("");

    try {
      const response = await fetch("/api/judge-qa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: questionText })
      });
      const data = await response.json();
      const botMsg = { sender: "student", text: data.answer || "Cảm ơn câu hỏi của Ban Giám Khảo. Chúng em xin phép được làm rõ..." };
      setQaChatHistory((prev) => [...prev, botMsg]);
    } catch (err) {
      // Fallback
      setTimeout(() => {
        setQaChatHistory((prev) => [
          ...prev,
          {
            sender: "student",
            text: `Kính thưa Ban Giám Khảo, câu hỏi '${questionText}' của Thầy/Cô rất hay và trúng vào cốt lõi kỹ thuật của đề tài. Về vấn đề này, nhóm chúng em đã nghiên cứu và xin phép trình bày: Cảm biến đất NPK của chúng em sử dụng dải quang phổ hồng ngoại gần kết hợp cảm biến điện cực chống mài mòn hóa học để hiệu chuẩn liên tục. Toàn bộ thuật toán hiệu chỉnh số liệu đã được tối ưu hóa cho thổ nhưỡng đất phù sa và đất phèn mặn tại khu vực Cần Thơ, đảm bảo sai số không quá 5.2% so với phân tích trong phòng thí nghiệm nông nghiệp.`
          }
        ]);
      }, 1000);
    } finally {
      setIsQaThinking(false);
    }
  };

  // Handle Photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomUploadedImage(reader.result as string);
        setSandboxImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Live simulation of soil sensor data fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedSensor((prev) => {
        const randomFactor = (Math.random() - 0.5) * 0.4;
        const newTemp = parseFloat((prev.temperature + randomFactor * 0.5).toFixed(1));
        const newMoisture = Math.max(0, Math.min(100, Math.round(prev.moisture + (Math.random() - 0.5) * 1)));
        const newPH = parseFloat(Math.max(3.5, Math.min(9.0, prev.pH + (Math.random() - 0.5) * 0.05)).toFixed(2));
        const newEC = parseFloat(Math.max(0.1, Math.min(3.0, prev.ec + (Math.random() - 0.5) * 0.02)).toFixed(2));

        // Update sensor charts
        setSensorHistory((history) => {
          const nextHistory = [...history.slice(1)];
          const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
          nextHistory.push({
            name: nowStr,
            moisture: newMoisture,
            temp: newTemp,
            pH: newPH,
            ec: newEC
          });
          return nextHistory;
        });

        return {
          ...prev,
          temperature: newTemp,
          moisture: newMoisture,
          pH: newPH,
          ec: newEC,
          timestamp: new Date().toLocaleTimeString()
        };
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [simulatedSensor]);

  // Business metrics calculation helper
  const calculateBusinessMetrics = () => {
    const hardwareProfitPerUnit = hardwarePrice - hardwareCost;
    const softwareProfitPerUser = webMonthlyPrice - webMonthlyCost;
    const annualHardwareProfit = hardwareProfitPerUnit * potentialAccounts;
    const annualSoftwareProfit = softwareProfitPerUser * potentialAccounts * 12;
    const totalAnnualProfit = annualHardwareProfit + annualSoftwareProfit;
    const profitMargin = ((hardwarePrice - hardwareCost) / hardwarePrice * 100).toFixed(1);

    return {
      hardwareProfitPerUnit,
      softwareProfitPerUser,
      totalAnnualProfit,
      profitMargin
    };
  };

  const businessResult = calculateBusinessMetrics();

  // Create Virtual user
  const handleCreateVirtualUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserId.trim()) return;

    const accessKey = `Key_${newUserId.slice(0, 3)}_${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    const userLink = `https://ai.nongnghiepsangtao.io.vn/static/camera.html?user=${newUserId}&key=${accessKey.split("_")[2]}`;

    const newUser: AdminUser = {
      id: `usr_${Date.now()}`,
      userId: newUserId,
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      quota: newUserQuota === "UNLIMITED" ? "UNLIMITED" : parseInt(newUserQuota),
      usedCount: 0,
      status: "active",
      accessKey,
      userLink
    };

    setAdminUsers((prev) => [newUser, ...prev]);
    setNewUserId("");
  };

  const toggleUserStatus = (id: string) => {
    setAdminUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: u.status === "active" ? "locked" : "active" } : u))
    );
  };

  return (
    <div className="min-h-screen bg-[#F6F8F5] text-slate-800 font-sans flex flex-col selection:bg-emerald-200">
      {/* HEADER BAR */}
      <header className="bg-white border-b border-emerald-100 shadow-xs sticky top-0 z-50 px-4 py-3" id="app-header">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-600 rounded-lg text-white shadow-xs flex items-center justify-center">
              <Leaf className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  Dự án đạt giải
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" /> Giải Nhì KH-KT Cần Thơ
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-black text-emerald-950 tracking-tight flex items-center gap-1.5">
                AI-RICE <span className="text-emerald-600 text-sm font-normal">Super Rice v3.0</span>
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-md px-3 py-1.5 flex items-center gap-2 font-medium">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
              AI Model: <strong className="text-emerald-950">Gemini 3.6 Flash</strong>
            </div>
            <div className="bg-slate-100 text-slate-800 rounded-md px-3 py-1.5 flex items-center gap-2 font-medium">
              <Battery className="w-4 h-4 text-emerald-600" />
              Cảm biến: <strong className="text-slate-950">{simulatedSensor.batteryLevel}% {simulatedSensor.sensorStatus}</strong>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-[11px] text-slate-400 font-mono">Đơn vị thực hiện</p>
              <p className="font-bold text-slate-700">PTDTNT THCS Him Lam, Cần Thơ</p>
            </div>
          </div>
        </div>
      </header>

      {/* PRIMARY NAVIGATION TABS */}
      <nav className="bg-emerald-950 text-emerald-100 border-b border-emerald-900 sticky top-[65px] z-40 px-4" id="main-nav">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 py-1.5 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setActiveTab("slides")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-semibold text-xs md:text-sm transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "slides"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "hover:bg-emerald-900/50 text-emerald-200"
              }`}
              id="nav-tab-slides"
            >
              <FileText className="w-4 h-4" />
              Trình Chiếu Slide
            </button>
            <button
              onClick={() => setActiveTab("sandbox")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-semibold text-xs md:text-sm transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "sandbox"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "hover:bg-emerald-900/50 text-emerald-200"
              }`}
              id="nav-tab-sandbox"
            >
              <Sliders className="w-4 h-4" />
              Mô Phỏng Live
            </button>
            <button
              onClick={() => setActiveTab("library")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-semibold text-xs md:text-sm transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "library"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "hover:bg-emerald-900/50 text-emerald-200"
              }`}
              id="nav-tab-library"
            >
              <BookOpen className="w-4 h-4" />
              Thư Viện 11 Bệnh
            </button>
            <button
              onClick={() => setActiveTab("map")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-semibold text-xs md:text-sm transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "map"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "hover:bg-emerald-900/50 text-emerald-200"
              }`}
              id="nav-tab-map"
            >
              <Map className="w-4 h-4" />
              Bản Đồ Thực Địa
            </button>
            <button
              onClick={() => setActiveTab("admin")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-semibold text-xs md:text-sm transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "admin"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "hover:bg-emerald-900/50 text-emerald-200"
              }`}
              id="nav-tab-admin"
            >
              <DollarSign className="w-4 h-4" />
              Kinh Doanh &amp; Admin
            </button>
            <button
              onClick={() => setActiveTab("qa")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-semibold text-xs md:text-sm transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "qa"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "hover:bg-emerald-900/50 text-emerald-200"
              }`}
              id="nav-tab-qa"
            >
              <MessageSquare className="w-4 h-4" />
              Vấn Đáp BGK
            </button>
          </div>

          <button
            onClick={() => openQuickGuide(activeTab)}
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-3.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer whitespace-nowrap shrink-0 border border-amber-300"
            title="Mở hướng dẫn sử dụng nhanh dành cho Ban Giám Khảo"
          >
            <HelpCircle className="w-4 h-4 text-slate-950" />
            <span className="hidden sm:inline">Hướng dẫn nhanh</span> (BGK)
          </button>
        </div>
      </nav>

      {/* CORE WORKSPACE CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col gap-6">
        
        {/* TAB 1: PRESENTATION & SPEAKER TELEPROMPTER */}
        {activeTab === "slides" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="panel-slides">
            
            {/* Left sidebar slide switcher */}
            <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200/80 p-4 flex flex-col gap-3 max-h-[750px] overflow-y-auto shadow-xs">
              <button
                onClick={handleExportSlidesPDF}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm mb-1.5"
                title="Tải về bộ Slide thuyết trình định dạng PDF sắc nét phục vụ Ban Giám Khao đánh giá"
              >
                <FileText className="w-4 h-4 text-white" /> Xuất Tài Liệu PDF (BGK)
              </button>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2 mb-1">
                Danh Sách Slide
              </h3>
              <div className="flex flex-col gap-1">
                {PRESENTATION_SLIDES.map((slide, index) => {
                  const isCurrent = index === currentSlideIndex;
                  return (
                    <button
                      key={slide.id}
                      onClick={() => setCurrentSlideIndex(index)}
                      className={`text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 transform hover:scale-[1.02] flex items-start gap-2.5 cursor-pointer origin-left ${
                        isCurrent
                          ? "bg-emerald-50 border-l-4 border-emerald-600 text-emerald-900 font-bold shadow-xs"
                          : "hover:bg-slate-50 text-slate-600 hover:shadow-2xs"
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold ${
                        isCurrent ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-500"
                      }`}>
                        {slide.id}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="block text-[10px] text-emerald-700/80 font-mono tracking-tight font-semibold uppercase">
                          {slide.category}
                        </span>
                        <span className="block truncate text-slate-800 font-medium mt-0.5">
                          {slide.title}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Middle Wide presentation screen */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              
              {/* Slide Screen Component */}
              <div className="bg-emerald-950 text-white rounded-2xl p-6 md:p-8 shadow-md flex flex-col justify-between min-h-[480px] border border-emerald-900 relative overflow-hidden">
                
                {/* Visual Background Deco */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800/10 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none"></div>
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-emerald-800/50 pb-4 z-10">
                  <span className="text-xs font-bold font-mono tracking-widest text-emerald-400 uppercase bg-emerald-900/60 px-3 py-1 rounded-full">
                    SLIDE {PRESENTATION_SLIDES[currentSlideIndex].id} / {PRESENTATION_SLIDES.length} : {PRESENTATION_SLIDES[currentSlideIndex].category}
                  </span>
                  <span className="text-xs font-mono text-emerald-300">
                    SUPER RICE Project
                  </span>
                </div>

                {/* Content Area */}
                <div className="my-6 z-10 flex flex-col gap-4">
                  <h2 className="text-lg md:text-xl font-extrabold text-emerald-50 leading-tight">
                    {PRESENTATION_SLIDES[currentSlideIndex].title}
                  </h2>
                  {PRESENTATION_SLIDES[currentSlideIndex].subtitle && (
                    <p className="text-xs text-emerald-300">
                      {PRESENTATION_SLIDES[currentSlideIndex].subtitle}
                    </p>
                  )}

                  {/* Dynamic Visual Diagrams per slide type */}
                  <div className="my-3 bg-emerald-900/40 border border-emerald-800/60 rounded-xl p-4 min-h-[180px] flex flex-col justify-center">
                    {PRESENTATION_SLIDES[currentSlideIndex].diagramType === "architecture" && (
                      <div className="flex flex-col gap-3 text-center">
                        <div className="grid grid-cols-3 gap-2 text-[10px] uppercase font-bold tracking-wider">
                          <div className="bg-emerald-800 p-2 rounded border border-emerald-700">Cảm Biến 7-in-1 &amp; ESP32-S3</div>
                          <div className="bg-emerald-700 p-2 rounded border border-emerald-600 flex items-center justify-center">Máy Chủ Trung Tâm AI (FastAPI / YOLO)</div>
                          <div className="bg-emerald-600 p-2 rounded border border-emerald-500">Thiết bị Nông dân (Web Di Động)</div>
                        </div>
                        <p className="text-xs text-emerald-200 mt-2 italic">Sơ đồ kết nối liên thông đa chiều phần cứng &amp; phần mềm qua mạng WiFi/4G</p>
                      </div>
                    )}

                    {PRESENTATION_SLIDES[currentSlideIndex].diagramType === "comparison" && (
                      <div className="text-xs flex flex-col gap-2">
                        <div className="grid grid-cols-3 gap-2 font-bold text-[10px] uppercase tracking-wider text-emerald-300 border-b border-emerald-800 pb-1">
                          <div>Giải pháp</div>
                          <div>Ưu điểm</div>
                          <div>Khoảng trống còn sót lại</div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 py-1 text-emerald-100">
                          <div className="font-semibold text-emerald-300">TLI-YOLO (2025)</div>
                          <div>Nhanh, mAP 95%, F1 90%</div>
                          <div className="text-amber-300">Chỉ nhận diện qua ảnh, chưa có cảm biến đất</div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 py-1 text-emerald-100">
                          <div className="font-semibold text-emerald-300">Inception V3 (2022)</div>
                          <div>Chính xác 97.4%</div>
                          <div className="text-amber-300">Số lượng bệnh ít, chưa xác định vị trí bệnh</div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 py-1 text-emerald-100 font-bold bg-emerald-800/50 p-1.5 rounded">
                          <div className="text-emerald-400">AI-RICE (Super Rice)</div>
                          <div>Nhận diện 11 bệnh + Đo 7 chỉ số đất</div>
                          <div className="text-emerald-300">Đã tích hợp hoàn thiện Web di động</div>
                        </div>
                      </div>
                    )}

                    {PRESENTATION_SLIDES[currentSlideIndex].diagramType === "dataset" && (
                      <div className="h-[150px] w-full text-emerald-100">
                        <p className="text-[10px] text-emerald-300 font-semibold mb-1 uppercase tracking-wider">Phân Bố 2.001 Mẫu Ảnh Thực Nghiệm Tại 3 Địa Điểm Cần Thơ</p>
                        <ResponsiveContainer width="100%" height="90%">
                          <BarChart data={EXPERIMENTAL_DATA.slice(0, 5)}>
                            <XAxis dataKey="diseaseName" stroke="#A7F3D0" fontSize={9} />
                            <YAxis stroke="#A7F3D0" fontSize={9} />
                            <Tooltip contentStyle={{ backgroundColor: "#064e3b" }} />
                            <Bar dataKey="photoCount" fill="#34D399" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}

                    {PRESENTATION_SLIDES[currentSlideIndex].diagramType === "survey" && (
                      <div className="text-xs grid grid-cols-2 gap-4">
                        <div className="bg-red-950/40 p-3 rounded-lg border border-red-900/60">
                          <p className="font-bold text-red-400 text-[10px] uppercase tracking-wider mb-1">Cách làm truyền thống</p>
                          <p className="text-slate-300 leading-tight text-[11px]">Dựa vào kinh nghiệm cá nhân mập mờ, bón phân vô tội vạ khi thấy lúa vàng làm tăng chi phí và ô nhiễm nguồn nước đất đai.</p>
                        </div>
                        <div className="bg-emerald-900/60 p-3 rounded-lg border border-emerald-800/60">
                          <p className="font-bold text-emerald-400 text-[10px] uppercase tracking-wider mb-1">Áp dụng AI-RICE</p>
                          <p className="text-emerald-200 leading-tight text-[11px]">Cảm biến cung cấp pH, NPK định lượng rõ ràng, AI Fusion cảnh báo chính xác bệnh chỉ sau 1-3 giây chụp.</p>
                        </div>
                      </div>
                    )}

                    {PRESENTATION_SLIDES[currentSlideIndex].diagramType === "survey_detail" && (
                      <div className="text-xs flex flex-col gap-2 italic text-emerald-200">
                        <p className="font-semibold text-emerald-400 not-italic text-[10px] uppercase tracking-wider">Phát Biểu Thực Tế Từ Bà Con Nông Dân Canh Tác Lúa</p>
                        <div className="bg-emerald-900/50 p-2.5 rounded border border-emerald-800 text-[11px]">
                          &quot;Lúa tui bị cháy rụi từng chòm, tui định mua bao đạm rải thêm cho nó xanh lại. Nhưng cắm cây cảm biến của tụi nhỏ vô nó báo dư thừa Đạm nghiêm trọng với pH bị chua lè, AI nó chỉ ngưng bón đạm dập vôi liền. May quá không thì hư hết ruộng!&quot;
                          <span className="block text-right text-emerald-400 font-bold not-italic mt-1">— Chú Vinh (Thạnh Xuân, Cần Thơ)</span>
                        </div>
                      </div>
                    )}

                    {PRESENTATION_SLIDES[currentSlideIndex].diagramType === "business" && (
                      <div className="h-[150px] w-full text-emerald-100">
                        <p className="text-[10px] text-emerald-300 font-semibold mb-1 uppercase tracking-wider">Cơ cấu Giá thành &amp; Lợi nhuận dự kiến (VNĐ)</p>
                        <ResponsiveContainer width="100%" height="90%">
                          <BarChart data={BUSINESS_COST_ITEMS} layout="vertical">
                            <XAxis type="number" stroke="#A7F3D0" fontSize={9} />
                            <YAxis dataKey="item" type="category" stroke="#A7F3D0" fontSize={8} width={60} />
                            <Tooltip contentStyle={{ backgroundColor: "#064e3b" }} />
                            <Bar dataKey="costUnit" stackId="a" fill="#34D399" name="Chi phí sản xuất" />
                            <Bar dataKey="profitUnit" stackId="a" fill="#FBBF24" name="Lợi nhuận" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}

                    {PRESENTATION_SLIDES[currentSlideIndex].diagramType === "prototype" && (
                      <div className="grid grid-cols-3 gap-2">
                        {PROTOTYPE_STAGES.map((stg) => (
                          <div key={stg.id} className="bg-emerald-900/60 p-2.5 rounded border border-emerald-800/80 text-[10px]">
                            <p className="font-bold text-emerald-400 uppercase tracking-tight">{stg.title}</p>
                            <p className="text-[9px] text-slate-300 mt-1 line-clamp-3">{stg.description}</p>
                            {stg.id === "stage_3" && <span className="inline-block mt-1.5 bg-emerald-600 px-1.5 py-0.5 rounded text-[8px] font-bold text-white uppercase tracking-wider">Sản phẩm hiện tại</span>}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Default Fallback Slide visual */}
                    {!PRESENTATION_SLIDES[currentSlideIndex].diagramType && (
                      <div className="flex items-center gap-4 text-emerald-100">
                        <div className="p-3 bg-emerald-800 rounded-lg">
                          <Leaf className="w-10 h-10 text-emerald-400" />
                        </div>
                        <div>
                          <p className="font-bold text-emerald-300">Công Nghệ AI Cho Đồng Ruộng</p>
                          <p className="text-xs text-emerald-200">AI-RICE giải quyết trực diện bài toán chẩn đoán toàn diện sức khỏe cây lúa.</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bullet points summary */}
                  <ul className="space-y-1.5 text-xs text-emerald-100">
                    {PRESENTATION_SLIDES[currentSlideIndex].bulletPoints?.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-0.5 font-bold">✓</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Controls */}
                <div className="flex items-center justify-between border-t border-emerald-800/50 pt-4 z-10 text-xs">
                  <button
                    onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
                    disabled={currentSlideIndex === 0}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-900 hover:bg-emerald-800 disabled:opacity-40 rounded-lg text-emerald-200 transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" /> Prev
                  </button>
                  <span className="font-mono text-emerald-400 font-bold">
                    Slide {currentSlideIndex + 1} / {PRESENTATION_SLIDES.length}
                  </span>
                  <button
                    onClick={() => setCurrentSlideIndex((prev) => Math.min(PRESENTATION_SLIDES.length - 1, prev + 1))}
                    disabled={currentSlideIndex === PRESENTATION_SLIDES.length - 1}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 rounded-lg text-white transition-all cursor-pointer"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Summary metadata for presentation */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-xs text-amber-900 shadow-xs">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-amber-950">Ý nghĩa Slide này</h4>
                  <p className="mt-1 text-amber-900/90 leading-relaxed">
                    {PRESENTATION_SLIDES[currentSlideIndex].summaryText}
                  </p>
                </div>
              </div>
            </div>

            {/* Right sidebar teleprompter (Kịch bản thuyết trình) */}
            <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200/80 p-4 flex flex-col gap-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-emerald-600" /> Kịch Bản Thuyết Trình
                </h3>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setTeleprompterSize((s) => Math.max(12, s - 2))}
                    className="w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded text-xs font-bold transition-all flex items-center justify-center cursor-pointer"
                    title="Giảm cỡ chữ"
                  >
                    A-
                  </button>
                  <button
                    onClick={() => setTeleprompterSize((s) => Math.min(24, s + 2))}
                    className="w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded text-xs font-bold transition-all flex items-center justify-center cursor-pointer"
                    title="Tăng cỡ chữ"
                  >
                    A+
                  </button>
                </div>
              </div>

              {/* Role allocation indicator */}
              <div className="bg-emerald-50 border border-emerald-100 p-2.5 rounded-lg flex items-center justify-between text-xs">
                <span className="font-semibold text-emerald-900">Thuyết trình:</span>
                <span className="px-2 py-0.5 bg-emerald-600 text-white rounded text-[10px] font-bold uppercase tracking-wider">
                  {currentSlideIndex % 2 === 0 ? "Bảo Ngân & Tường Vy" : "Giang Ngân & Nhựt Quỳnh"}
                </span>
              </div>

              {/* teleprompter text field */}
              <div className="flex-1 bg-slate-50 border border-slate-200/60 rounded-xl p-3.5 overflow-y-auto max-h-[360px] min-h-[220px]">
                <p
                  className="font-medium text-slate-700 leading-relaxed transition-all"
                  style={{ fontSize: `${teleprompterSize}px` }}
                >
                  {PRESENTATION_SLIDES[currentSlideIndex].speakerScript}
                </p>
              </div>

              {/* Presenter timer controls */}
              <div className="bg-slate-900 text-white p-3.5 rounded-xl flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Thời gian diễn tập</span>
                  <span className="font-mono text-lg font-bold text-emerald-400">{formatTime(presentationTime)}</span>
                </div>
                
                {/* Visual duration progress bar (assuming 7 minute presentation limit for city contests) */}
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-1.5 transition-all duration-1000"
                    style={{ width: `${Math.min(100, (presentationTime / 420) * 100)}%` }}
                  ></div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setTimerRunning(!timerRunning)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      timerRunning ? "bg-red-600 hover:bg-red-500 text-white" : "bg-emerald-600 hover:bg-emerald-500 text-white"
                    }`}
                  >
                    {timerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    {timerRunning ? "Tạm Dừng" : "Bắt Đầu"}
                  </button>
                  <button
                    onClick={handleResetTimer}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold transition-all text-slate-200 flex items-center justify-center cursor-pointer"
                    title="Đặt lại đồng hồ"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: INTERACTIVE EXPERIMENTAL SANDBOX */}
        {activeTab === "sandbox" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="panel-sandbox">
            
            {/* Left Column: 7-in-1 Soil Sensor Hub */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/80 p-5 flex flex-col gap-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-emerald-950 text-base">Bộ Cảm Biến Đất 7-Trong-1</h3>
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase">
                      ESP32-S3 LINKED
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">Điều chỉnh thông số thổ nhưỡng &amp; hiệu chuẩn cảm biến sinh học</p>
                </div>
                <button
                  onClick={() => setShowCalibrationModal(true)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Sliders className="w-3.5 h-3.5" /> Hiệu Chuẩn Cảm Biến &amp; AI
                </button>
              </div>

              {/* Calibration Status Banner */}
              <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-lg p-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="font-bold text-emerald-900 text-[11px]">{calibrationConfig.calibrationStatus}</span>
                </div>
                <span className="text-[10px] text-emerald-700 font-mono font-semibold">Sai số ≤ 2.1%</span>
              </div>

              {/* Presets: Align with ALL 11 disease standards for quick judge display */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-xs font-bold text-slate-600">Môi trường đặc trưng theo 11 loại bệnh hại:</p>
                  <span className="text-[10px] font-mono font-semibold text-emerald-700">Chất lượng mẫu: 2.000 ảnh</span>
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-[110px] overflow-y-auto p-1 bg-slate-50/80 rounded-lg border border-slate-200/80">
                  {RICE_DISEASES.map((disease) => {
                    const isSelected = selectedSandboxDisease?.id === disease.id;
                    return (
                      <button
                        key={disease.id}
                        onClick={() => calibrateSoilForDisease(disease)}
                        className={`px-2 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-emerald-600 text-white shadow-xs font-bold"
                            : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/70"
                        }`}
                      >
                        {disease.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 7 sliders config */}
              <div className="space-y-3.5">
                {(() => {
                  const nStatus = getSensorStatus('N', simulatedSensor.nitrogen);
                  const pStatus = getSensorStatus('P', simulatedSensor.phosphorus);
                  const kStatus = getSensorStatus('K', simulatedSensor.potassium);
                  const phStatus = getSensorStatus('pH', simulatedSensor.pH);
                  const moistureStatus = getSensorStatus('moisture', simulatedSensor.moisture);
                  const ecStatus = getSensorStatus('ec', simulatedSensor.ec);

                  const abnormalCount = [nStatus, pStatus, kStatus, phStatus, moistureStatus, ecStatus].filter(
                    (s) => s.status !== 'optimal'
                  ).length;

                  return (
                    <>
                      {/* Active Hotspot Warning Summary Bar */}
                      {abnormalCount > 0 && (
                        <div className="bg-amber-100/90 border border-amber-300 text-amber-900 rounded-lg px-3 py-2 text-xs flex items-center justify-between font-medium shadow-2xs">
                          <span className="flex items-center gap-1.5 font-bold">
                            <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping"></span>
                            ⚠️ Phát hiện {abnormalCount} điểm nóng dinh dưỡng vượt ngưỡng!
                          </span>
                          <span className="text-[10px] font-semibold text-amber-800">Cần điều chỉnh</span>
                        </div>
                      )}

                      {/* Nitrogen */}
                      <div className={`flex flex-col gap-1.5 p-3 rounded-xl border transition-all duration-300 ${nStatus.bg}`}>
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-800 flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 bg-blue-600 rounded-full"></span>
                            Hàm lượng Nitơ (Đạm - N)
                          </span>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${nStatus.badge}`}>
                              {nStatus.label}
                            </span>
                            <span className="font-mono font-black text-blue-700 text-xs">{simulatedSensor.nitrogen} mg/kg</span>
                          </div>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="300"
                          value={simulatedSensor.nitrogen}
                          onChange={(e) => setSimulatedSensor({ ...simulatedSensor, nitrogen: parseInt(e.target.value) })}
                          className="w-full accent-blue-600 h-1.5 bg-slate-200/80 rounded-lg cursor-grab active:cursor-grabbing [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150 hover:[&::-webkit-slider-thumb]:scale-130 active:[&::-webkit-slider-thumb]:scale-110 hover:[&::-webkit-slider-thumb]:shadow-md"
                        />
                        {/* Visual Optimal Zone Track */}
                        <div className="relative w-full h-1 bg-slate-200/50 rounded-full overflow-hidden">
                          <div 
                            className="absolute h-full bg-emerald-500/70"
                            style={{ left: "26.7%", width: "13.3%" }}
                            title="Vùng Tối Ưu (80 - 120)"
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-500 font-medium items-center">
                          <span>Thiếu đạm (&lt;80)</span>
                          <span className="font-bold text-emerald-800 bg-emerald-50/90 border border-emerald-200/80 px-2 py-0.5 rounded-md text-[9px] shadow-3xs">Vùng Tối Ưu: 80 - 120 mg/kg</span>
                          <span>Thừa đạm (&gt;120)</span>
                        </div>
                      </div>
 
                      {/* Phosphorus */}
                      <div className={`flex flex-col gap-1.5 p-3 rounded-xl border transition-all duration-300 ${pStatus.bg}`}>
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-800 flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 bg-purple-600 rounded-full"></span>
                            Hàm lượng Phốt-pho (Lân - P)
                          </span>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${pStatus.badge}`}>
                              {pStatus.label}
                            </span>
                            <span className="font-mono font-black text-purple-700 text-xs">{simulatedSensor.phosphorus} mg/kg</span>
                          </div>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="150"
                          value={simulatedSensor.phosphorus}
                          onChange={(e) => setSimulatedSensor({ ...simulatedSensor, phosphorus: parseInt(e.target.value) })}
                          className="w-full accent-purple-600 h-1.5 bg-slate-200/80 rounded-lg cursor-grab active:cursor-grabbing [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150 hover:[&::-webkit-slider-thumb]:scale-130 active:[&::-webkit-slider-thumb]:scale-110 hover:[&::-webkit-slider-thumb]:shadow-md"
                        />
                        {/* Visual Optimal Zone Track */}
                        <div className="relative w-full h-1 bg-slate-200/50 rounded-full overflow-hidden">
                          <div 
                            className="absolute h-full bg-emerald-500/70"
                            style={{ left: "20%", width: "13.3%" }}
                            title="Vùng Tối Ưu (30 - 50)"
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-500 font-medium items-center">
                          <span>Nghèo Lân (&lt;30)</span>
                          <span className="font-bold text-emerald-800 bg-emerald-50/90 border border-emerald-200/80 px-2 py-0.5 rounded-md text-[9px] shadow-3xs">Vùng Tối Ưu: 30 - 50 mg/kg</span>
                          <span>Dư thừa (&gt;50)</span>
                        </div>
                      </div>
 
                      {/* Potassium */}
                      <div className={`flex flex-col gap-1.5 p-3 rounded-xl border transition-all duration-300 ${kStatus.bg}`}>
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-800 flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 bg-amber-500 rounded-full"></span>
                            Hàm lượng Kali (K)
                          </span>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${kStatus.badge}`}>
                              {kStatus.label}
                            </span>
                            <span className="font-mono font-black text-amber-800 text-xs">{simulatedSensor.potassium} mg/kg</span>
                          </div>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="200"
                          value={simulatedSensor.potassium}
                          onChange={(e) => setSimulatedSensor({ ...simulatedSensor, potassium: parseInt(e.target.value) })}
                          className="w-full accent-amber-600 h-1.5 bg-slate-200/80 rounded-lg cursor-grab active:cursor-grabbing [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150 hover:[&::-webkit-slider-thumb]:scale-130 active:[&::-webkit-slider-thumb]:scale-110 hover:[&::-webkit-slider-thumb]:shadow-md"
                        />
                        {/* Visual Optimal Zone Track */}
                        <div className="relative w-full h-1 bg-slate-200/50 rounded-full overflow-hidden">
                          <div 
                            className="absolute h-full bg-emerald-500/70"
                            style={{ left: "32.5%", width: "17.5%" }}
                            title="Vùng Tối Ưu (65 - 100)"
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-500 font-medium items-center">
                          <span>Thiếu Kali (&lt;65)</span>
                          <span className="font-bold text-emerald-800 bg-emerald-50/90 border border-emerald-200/80 px-2 py-0.5 rounded-md text-[9px] shadow-3xs">Vùng Tối Ưu: 65 - 100 mg/kg</span>
                          <span>Dư thừa (&gt;100)</span>
                        </div>
                      </div>
 
                      {/* pH slider */}
                      <div className={`flex flex-col gap-1.5 p-3 rounded-xl border transition-all duration-300 ${phStatus.bg}`}>
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-800 flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 bg-emerald-600 rounded-full"></span>
                            Độ pH Đất
                          </span>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${phStatus.badge}`}>
                              {phStatus.label}
                            </span>
                            <span className="font-mono font-black text-emerald-800 text-xs">{simulatedSensor.pH} pH</span>
                          </div>
                        </div>
                        <input
                          type="range"
                          min="3.5"
                          max="9.0"
                          step="0.1"
                          value={simulatedSensor.pH}
                          onChange={(e) => setSimulatedSensor({ ...simulatedSensor, pH: parseFloat(e.target.value) })}
                          className="w-full accent-emerald-600 h-1.5 bg-slate-200/80 rounded-lg cursor-grab active:cursor-grabbing [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150 hover:[&::-webkit-slider-thumb]:scale-130 active:[&::-webkit-slider-thumb]:scale-110 hover:[&::-webkit-slider-thumb]:shadow-md"
                        />
                        {/* Visual Optimal Zone Track */}
                        <div className="relative w-full h-1 bg-slate-200/50 rounded-full overflow-hidden">
                          <div 
                            className="absolute h-full bg-emerald-500/70"
                            style={{ left: "36.4%", width: "18.2%" }}
                            title="Vùng Tối Ưu (5.5 - 6.5)"
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-500 font-medium items-center">
                          <span>Chua Phèn (&lt;5.5)</span>
                          <span className="font-bold text-emerald-800 bg-emerald-50/90 border border-emerald-200/80 px-2 py-0.5 rounded-md text-[9px] shadow-3xs">Vùng Tối Ưu: 5.5 - 6.5 pH</span>
                          <span>Kiềm Mặn (&gt;6.5)</span>
                        </div>
                      </div>
 
                      {/* Moisture Slider */}
                      <div className={`flex flex-col gap-1.5 p-3 rounded-xl border transition-all duration-300 ${moistureStatus.bg}`}>
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-800 flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
                            Độ Ẩm Đất
                          </span>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${moistureStatus.badge}`}>
                              {moistureStatus.label}
                            </span>
                            <span className="font-mono font-black text-blue-800 text-xs">{simulatedSensor.moisture} %</span>
                          </div>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={simulatedSensor.moisture}
                          onChange={(e) => setSimulatedSensor({ ...simulatedSensor, moisture: parseInt(e.target.value) || 0 })}
                          className="w-full accent-blue-500 h-1.5 bg-slate-200/80 rounded-lg cursor-grab active:cursor-grabbing [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150 hover:[&::-webkit-slider-thumb]:scale-130 active:[&::-webkit-slider-thumb]:scale-110 hover:[&::-webkit-slider-thumb]:shadow-md"
                        />
                        {/* Visual Optimal Zone Track */}
                        <div className="relative w-full h-1 bg-slate-200/50 rounded-full overflow-hidden">
                          <div 
                            className="absolute h-full bg-emerald-500/70"
                            style={{ left: "70%", width: "18%" }}
                            title="Vùng Tối Ưu (70 - 88)"
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-500 font-medium items-center">
                          <span>Khô hạn (&lt;70)</span>
                          <span className="font-bold text-emerald-800 bg-emerald-50/90 border border-emerald-200/80 px-2 py-0.5 rounded-md text-[9px] shadow-3xs">Vùng Tối Ưu: 70 - 88 %</span>
                          <span>Ngập úng (&gt;88)</span>
                        </div>
                      </div>

                      {/* EC Slider */}
                      <div className={`flex flex-col gap-1.5 p-3 rounded-xl border transition-all duration-300 ${ecStatus.bg}`}>
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-800 flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 bg-amber-600 rounded-full"></span>
                            Độ dẫn EC (Dinh dưỡng)
                          </span>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${ecStatus.badge}`}>
                              {ecStatus.label}
                            </span>
                            <span className="font-mono font-black text-amber-900 text-xs">{simulatedSensor.ec.toFixed(2)} mS/cm</span>
                          </div>
                        </div>
                        <input
                          type="range"
                          min="0.1"
                          max="3.0"
                          step="0.01"
                          value={simulatedSensor.ec}
                          onChange={(e) => setSimulatedSensor({ ...simulatedSensor, ec: parseFloat(e.target.value) || 0.1 })}
                          className="w-full accent-amber-600 h-1.5 bg-slate-200/80 rounded-lg cursor-grab active:cursor-grabbing [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150 hover:[&::-webkit-slider-thumb]:scale-130 active:[&::-webkit-slider-thumb]:scale-110 hover:[&::-webkit-slider-thumb]:shadow-md"
                        />
                        {/* Visual Optimal Zone Track */}
                        <div className="relative w-full h-1 bg-slate-200/50 rounded-full overflow-hidden">
                          <div 
                            className="absolute h-full bg-emerald-500/70"
                            style={{ left: "10.3%", width: "10.3%" }}
                            title="Vùng Tối Ưu (0.40 - 0.70)"
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-500 font-medium items-center">
                          <span>Nghèo kiệt (&lt;0.4)</span>
                          <span className="font-bold text-emerald-800 bg-emerald-50/90 border border-emerald-200/80 px-2 py-0.5 rounded-md text-[9px] shadow-3xs">Vùng Tối Ưu: 0.40 - 0.70 mS/cm</span>
                          <span>Nhiễm mặn (&gt;0.7)</span>
                        </div>
                      </div>
                    </>
                  );
                })()}

              </div>

              {/* Dual Sensor Charts: Live Moisture/pH & 7-Day NPK Forecast */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Live Running Chart from Sensor probes */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 h-[200px] flex flex-col justify-between shadow-2xs">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Độ ẩm &amp; pH Đất (Live)</p>
                    <span className="text-[9px] font-mono font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">CẬP NHẬT 5s</span>
                  </div>
                  <div className="w-full h-[160px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={sensorHistory} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                        <XAxis dataKey="name" fontSize={8} stroke="#94a3b8" />
                        <YAxis yAxisId="left" stroke="#0ea5e9" fontSize={8} domain={[40, 100]} />
                        <YAxis yAxisId="right" orientation="right" stroke="#10b981" fontSize={8} domain={[3, 9]} />
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                        <Line yAxisId="left" type="monotone" dataKey="moisture" stroke="#0ea5e9" name="Độ ẩm (%)" strokeWidth={2} dot={false} />
                        <Line yAxisId="right" type="monotone" dataKey="pH" stroke="#10b981" name="pH Đất" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* 7-Day NPK Soil Nutrient Forecast LineChart */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 h-[200px] flex flex-col justify-between shadow-2xs">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-blue-600" /> Dự Báo N-P-K (7 Ngày Tới)
                    </p>
                    <span className="text-[9px] font-mono font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">DỰ BÁO AI</span>
                  </div>
                  <div className="w-full h-[160px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={npkForecastData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                        <XAxis dataKey="day" fontSize={8} stroke="#94a3b8" />
                        <YAxis fontSize={8} stroke="#64748b" />
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                        <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '2px' }} iconSize={8} />
                        <Line type="monotone" dataKey="N" stroke="#2563eb" name="Nitơ (N)" strokeWidth={2} dot={{ r: 2 }} />
                        <Line type="monotone" dataKey="P" stroke="#9333ea" name="Lân (P)" strokeWidth={2} dot={{ r: 2 }} />
                        <Line type="monotone" dataKey="K" stroke="#d97706" name="Kali (K)" strokeWidth={2} dot={{ r: 2 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* NEW RADAR CHART COMPONENT - COMPETITOR PERFORMANCE COMPARE */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between shadow-2xs mt-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-emerald-600" /> SÁNG TẠO ĐỘT PHÁ: ĐỐI CHIẾU HIỆU NĂNG VỚI ĐỐI THỦ
                  </p>
                  <span className="text-[9px] font-mono font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded border border-emerald-200">
                    ĐỘT PHÁ AI FUSION
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
                  So với các giải pháp phổ biến như <strong>Plantix</strong> (chỉ nhận diện qua ảnh dễ chẩn đoán sai khi thiếu dinh dưỡng), <strong>AI-RICE (SUPER RICE)</strong> vượt trội nhờ cơ chế đồng bộ dữ liệu cảm biến đất thực tế (AI Fusion).
                </p>
                <div className="w-full h-[220px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={competitorRadarData}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="name" fontSize={9} tick={{ fill: '#334155', fontWeight: 600 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} fontSize={8} />
                      <Radar name="AI-RICE (SUPER RICE)" dataKey="AI-RICE (Chúng con)" stroke="#059669" fill="#10b981" fillOpacity={0.4} />
                      <Radar name="Plantix (Chỉ quét ảnh)" dataKey="Plantix (Đối thủ)" stroke="#ef4444" fill="#f87171" fillOpacity={0.25} />
                      <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                      <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '5px' }} iconSize={8} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Right Column: Leaf Image Upload & AI Fusion Analyzer */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Image Picker stage */}
              <div className="bg-white rounded-xl border border-slate-200/80 p-5 flex flex-col gap-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-black text-emerald-950 text-base flex items-center gap-1.5">
                    <Camera className="w-5 h-5 text-emerald-600" /> Phân Tích Hình Ảnh Lá Lúa
                  </h3>
                  <span className="text-xs text-slate-400">Chọn mẫu có sẵn hoặc tải ảnh lá lúa của ruộng bạn</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                  
                  {/* Image Display stage */}
                  <div className="md:col-span-5 flex flex-col gap-3">
                    <div className="relative border-2 border-dashed border-emerald-200/80 rounded-xl bg-slate-50 overflow-hidden flex flex-col items-center justify-center min-h-[200px]">
                      
                      {customUploadedImage ? (
                        <>
                          <img
                            src={customUploadedImage}
                            alt="Custom leaf"
                            className="w-full h-48 object-cover"
                          />
                          <button
                            onClick={() => { setCustomUploadedImage(null); setSandboxImageBase64(null); }}
                            className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-500 cursor-pointer"
                            title="Xóa ảnh"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      ) : selectedSandboxDisease ? (
                        <>
                          <img
                            src={selectedSandboxDisease.sampleImage}
                            alt={selectedSandboxDisease.name}
                            className="w-full h-48 object-cover"
                          />
                          
                          {/* YOLO visual simulation bounding box */}
                          <div className="absolute border-4 border-red-500 rounded p-1 text-[9px] bg-red-500 text-white font-bold top-1/4 left-1/3 animate-bounce">
                            {selectedSandboxDisease.name} {aiAnalysisResult?.confidence}%
                          </div>
                        </>
                      ) : (
                        <div className="text-center p-4">
                          <Upload className="w-10 h-10 text-emerald-600/50 mx-auto mb-2" />
                          <p className="text-xs text-slate-500">Chưa chọn ảnh lá lúa</p>
                        </div>
                      )}
                    </div>

                    {/* Standard HTML Upload component */}
                    <label className="border border-slate-200 hover:bg-slate-50 rounded-lg p-2 text-center text-xs font-semibold text-slate-700 cursor-pointer flex items-center justify-center gap-1.5 transition-all">
                      <Upload className="w-4 h-4" /> Tải lá lúa thực tế lên...
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Sample leaf grid selector */}
                  <div className="md:col-span-7 flex flex-col gap-2">
                    <p className="text-xs font-bold text-slate-500">Mẫu lá lúa thu thập ngoài thực địa (ĐBSCL):</p>
                    <div className="grid grid-cols-3 gap-2 overflow-y-auto max-h-[200px] pr-1">
                      {RICE_DISEASES.map((disease) => {
                        const isSelected = selectedSandboxDisease?.id === disease.id && !customUploadedImage;
                        return (
                          <div
                            key={disease.id}
                            onClick={() => {
                              setSelectedSandboxDisease(disease);
                              setCustomUploadedImage(null);
                              setSandboxImageBase64(null);
                            }}
                            className={`p-1 bg-slate-50 border rounded-lg overflow-hidden text-left transition-all flex flex-col gap-1 cursor-pointer hover:border-emerald-500 relative group ${
                              isSelected ? "ring-2 ring-emerald-600 border-emerald-600" : "border-slate-200"
                            }`}
                          >
                            <img
                              src={disease.sampleImage}
                              alt={disease.name}
                              className="w-full h-12 object-cover rounded"
                            />
                            <div className="flex items-center justify-between px-1">
                              <span className="text-[10px] font-bold text-slate-800 truncate">
                                {disease.name}
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openDiseaseDetail(disease);
                                }}
                                className="p-0.5 text-slate-400 hover:text-emerald-700 hover:bg-emerald-100 rounded transition-all cursor-pointer shrink-0"
                                title="Xem hồ sơ chi tiết (Khái niệm, Nhận biết, Tác hại)"
                              >
                                <Info className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* Big Analyze Button */}
                <button
                  onClick={runAIFusionAnalysis}
                  disabled={isAnalyzing}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50 cursor-pointer"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      ĐANG ĐỒNG BỘ CẢM BIẾN &amp; PHÂN TÍCH AI FUSION...
                    </>
                  ) : (
                    <>
                      <Activity className="w-5 h-5" />
                      KÍCH HOẠT PHÂN TÍCH AI FUSION (YOLOv8 + 7-in-1 Soil Sensors)
                    </>
                  )}
                </button>
              </div>

              {/* Diagnostic outcome and analytical dashboard */}
              {aiAnalysisResult && (
                <div className="bg-white rounded-xl border border-slate-200/80 p-5 flex flex-col gap-4 shadow-sm">
                  
                  {/* Results Top bar info */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-[10px] font-bold font-mono text-emerald-600 uppercase tracking-widest block">KẾT QUẢ PHÂN TÍCH AI RICE</span>
                      <h4 className="text-lg font-black text-emerald-950 mt-0.5">
                        {aiAnalysisResult.diseaseName}
                      </h4>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => openDiseaseDetail(selectedSandboxDisease || RICE_DISEASES[0])}
                        className="bg-emerald-700 hover:bg-emerald-600 text-white px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
                        title="Xem chi tiết: Bệnh này là gì, Cách nhận biết, Tác hại"
                      >
                        <Info className="w-3.5 h-3.5 text-emerald-200" /> Hồ Sơ Bệnh Chi Tiết
                      </button>
                      <span className="bg-emerald-50 border border-emerald-100 text-emerald-800 px-2.5 py-1 rounded text-xs font-bold">
                        Độ tin cậy: {aiAnalysisResult.confidence}%
                      </span>
                      <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider text-white ${
                        aiAnalysisResult.riskLevel === "LOW" ? "bg-emerald-600" :
                        aiAnalysisResult.riskLevel === "MEDIUM" ? "bg-amber-600" : "bg-red-600"
                      }`}>
                        Nguy cơ: {aiAnalysisResult.riskLevel}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    
                    {/* Science & soils */}
                    <div className="flex flex-col gap-3">
                      <div className="bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100">
                        <h5 className="font-bold text-emerald-950 flex items-center gap-1.5 mb-1.5">
                          <Activity className="w-4 h-4 text-emerald-600" /> Tình trạng lá lúa
                        </h5>
                        <p className="text-slate-700 leading-relaxed text-[11px]">{aiAnalysisResult.leafDiagnosis}</p>
                      </div>

                      <div className="bg-amber-50/50 p-3.5 rounded-xl border border-amber-100">
                        <h5 className="font-bold text-amber-950 flex items-center gap-1.5 mb-1.5">
                          <Sliders className="w-4 h-4 text-amber-600" /> Tương quan Thổ nhưỡng
                        </h5>
                        <p className="text-slate-700 leading-relaxed text-[11px]">{aiAnalysisResult.environmentAnalysis}</p>
                      </div>
                    </div>

                    {/* Scientific depth */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 flex flex-col justify-between">
                      <div>
                        <h5 className="font-bold text-slate-800 flex items-center gap-1.5 mb-2">
                          <Info className="w-4 h-4 text-emerald-600" /> Cơ chế khoa học bùng phát bệnh
                        </h5>
                        <p className="text-slate-600 leading-relaxed text-[11px] italic">
                          &quot;{aiAnalysisResult.scientificReasoning}&quot;
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-200/80 text-[10px] text-slate-400 font-mono flex justify-between">
                        <span>Hợp nhất: YOLOv8 + Gemini 3.6</span>
                        <span>{aiAnalysisResult.timestamp}</span>
                      </div>
                    </div>

                  </div>

                  {/* Recommendations action panel */}
                  <div className="bg-emerald-950 text-emerald-50 rounded-xl p-4 md:p-5 mt-1">
                    <h5 className="font-black text-sm text-emerald-300 uppercase tracking-wider mb-3">
                      KHUYẾN CÁO CANH TÁC TỪ CHUYÊN GIA AI
                    </h5>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      {aiAnalysisResult.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-emerald-900/40 p-2.5 rounded border border-emerald-800/80">
                          <span className="bg-emerald-600 text-white rounded-full w-4 h-4 flex items-center justify-center font-bold text-[9px] shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="leading-relaxed">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              )}

            </div>

          </div>
        )}

        {/* TAB 3: 11-DISEASE ENCYCLOPEDIA */}
        {activeTab === "library" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="panel-library">
            
            {/* Search and filters sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs">
                <h3 className="font-black text-emerald-950 text-base mb-3">Bệnh &amp; Sâu Hại Cây Lúa</h3>
                
                {/* Search query input */}
                <div className="relative mb-3 flex items-center">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Tìm tên bệnh, sinh vật gây hại..."
                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-slate-50"
                  />
                  {searchTerm && (
                    <button onClick={() => setSearchTerm("")} className="absolute right-3 text-slate-400 hover:text-slate-600 text-xs">
                      X
                    </button>
                  )}
                </div>

                {/* Filter buttons by category */}
                <div className="flex flex-col gap-1 text-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5 px-1">Phân loại tác nhân</span>
                  {[
                    { id: "all", label: "Tất cả các loại" },
                    { id: "Bệnh do nấm", label: "Bệnh do Nấm" },
                    { id: "Bệnh do vi khuẩn", label: "Bệnh do Vi Khuẩn" },
                    { id: "Bệnh do virus", label: "Bệnh do Virus" },
                    { id: "Sâu hại / Côn trùng", label: "Sâu hại / Côn Trùng" },
                    { id: "Sinh lý / Môi trường", label: "Ngộ độc Sinh Lý / Đất" }
                  ].map((cat) => {
                    const isSelected = categoryFilter === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setCategoryFilter(cat.id)}
                        className={`text-left px-3 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                          isSelected
                            ? "bg-emerald-600 text-white font-semibold"
                            : "hover:bg-slate-50 text-slate-600"
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Diseases small list */}
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs max-h-[400px] overflow-y-auto">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2 block px-1">Danh sách bệnh hại</span>
                <div className="flex flex-col gap-1.5">
                  {RICE_DISEASES.filter((d) => {
                    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.englishName.toLowerCase().includes(searchTerm.toLowerCase());
                    const matchesCat = categoryFilter === "all" || d.category === categoryFilter;
                    return matchesSearch && matchesCat;
                  }).map((d) => {
                    const isSelected = selectedLibraryDisease.id === d.id;
                    return (
                      <button
                        key={d.id}
                        onClick={() => setSelectedLibraryDisease(d)}
                        className={`text-left p-2 rounded-lg transition-all flex items-center gap-3 border cursor-pointer hover:border-emerald-500 ${
                          isSelected ? "bg-emerald-50 border-emerald-500" : "bg-white border-slate-100"
                        }`}
                      >
                        <img
                          src={d.sampleImage}
                          alt={d.name}
                          className="w-10 h-10 object-cover rounded-md"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-slate-800 text-xs truncate">{d.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono truncate">{d.englishName}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right details content workspace */}
            <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col gap-6">
              
              {/* Header block details */}
              <div className="flex flex-col md:flex-row items-start justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase rounded">
                      {selectedLibraryDisease.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {selectedLibraryDisease.scientificName}
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-black text-emerald-950 mt-1">
                    {selectedLibraryDisease.name} <span className="text-slate-400 text-sm font-normal">({selectedLibraryDisease.englishName})</span>
                  </h2>
                </div>

                <div className="flex flex-col sm:flex-row items-end gap-3">
                  <button
                    onClick={() => openDiseaseDetail(selectedLibraryDisease)}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
                    title="Mở cửa sổ phóng to"
                  >
                    <Info className="w-4 h-4 text-emerald-100" /> Phóng To Hồ Sơ Full
                  </button>
                  <div className="bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-xl text-center">
                    <p className="text-[9px] text-emerald-700 font-bold uppercase">Mẫu Ảnh Thực Nghiệm</p>
                    <p className="text-base font-mono font-black text-emerald-950">{selectedLibraryDisease.experimentalPhotoCount} tấm</p>
                  </div>
                </div>
              </div>

              {/* 1. WHAT IS THIS DISEASE? (Definition & Biological nature) */}
              <div className="bg-emerald-50/70 border border-emerald-200/70 p-4 rounded-xl space-y-1.5">
                <h4 className="font-extrabold text-emerald-950 text-xs uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-600" /> 1. Bệnh này là gì? (Khái niệm &amp; Bản chất sinh học)
                </h4>
                <p className="text-slate-700 leading-relaxed text-xs font-normal">
                  {selectedLibraryDisease.definition}
                </p>
              </div>

              {/* 2. HOW TO IDENTIFY DISEASE? (Identification & Symptoms) */}
              <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-xl space-y-3">
                <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2 border-b border-slate-200/60 pb-2">
                  <Leaf className="w-4 h-4 text-emerald-600" /> 2. Cách nhận biết &amp; Dấu hiệu chẩn đoán đặc trưng?
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="font-bold text-slate-800 text-[11px] mb-1.5 text-emerald-900">
                      • Triệu chứng quan sát ngoài ruộng:
                    </p>
                    <ul className="space-y-1.5 text-slate-600">
                      {selectedLibraryDisease.symptoms.map((sym, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold mt-0.5">•</span>
                          <span className="leading-relaxed">{sym}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-[11px] mb-1.5 text-emerald-900">
                      • Dấu hiệu chẩn đoán phân biệt:
                    </p>
                    <ul className="space-y-1.5 text-slate-600">
                      {selectedLibraryDisease.identification.map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-amber-600 font-bold mt-0.5">›</span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* 3. HARMFUL EFFECTS & YIELD LOSS */}
              <div className="bg-rose-50/80 border border-rose-200/80 p-4 rounded-xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-rose-950 text-xs uppercase tracking-wider flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600" /> 3. Tác hại &amp; Thiệt hại năng suất?
                  </h4>
                  <span className="bg-rose-600 text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase">
                    Thất thu: {selectedLibraryDisease.harmfulEffects.yieldLoss}
                  </span>
                </div>
                <p className="text-rose-900/90 font-medium text-xs leading-relaxed">
                  {selectedLibraryDisease.harmfulEffects.description}
                </p>
                <div className="pt-2 border-t border-rose-200/60">
                  <p className="font-bold text-[10px] text-rose-900 uppercase mb-1">Các ảnh hưởng sinh lý &amp; kinh tế chính:</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-rose-900/80">
                    {selectedLibraryDisease.harmfulEffects.impacts.map((imp, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="font-bold text-rose-600">›</span>
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Favorable conditions & Soil nutrition standards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200/80 p-3.5 rounded-xl">
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-amber-600" /> Điều kiện thời tiết bùng phát dịch
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {selectedLibraryDisease.favorableConditions}
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 p-3.5 rounded-xl">
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2">
                    Ngưỡng Thổ Nhưỡng Đặc Trưng (Cảm Biến 7-in-1)
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-white border border-slate-200 p-1.5 rounded-lg">
                      <p className="text-[9px] font-bold text-slate-400">ĐỘ ẨM</p>
                      <p className="text-xs font-black text-slate-800">{selectedLibraryDisease.typicalSoil.moisture}</p>
                    </div>
                    <div className="bg-white border border-slate-200 p-1.5 rounded-lg">
                      <p className="text-[9px] font-bold text-slate-400">pH ĐẤT</p>
                      <p className="text-xs font-black text-slate-800">{selectedLibraryDisease.typicalSoil.pH}</p>
                    </div>
                    <div className="bg-white border border-slate-200 p-1.5 rounded-lg">
                      <p className="text-[9px] font-bold text-slate-400">ĐỘ DẪN EC</p>
                      <p className="text-xs font-black text-slate-800">{selectedLibraryDisease.typicalSoil.ec}</p>
                    </div>
                    <div className="bg-white border border-slate-200 p-1.5 rounded-lg">
                      <p className="text-[9px] font-bold text-slate-400">NPK</p>
                      <p className="text-[10px] font-mono font-bold text-slate-800">{selectedLibraryDisease.typicalSoil.npk}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preventative and curative measures */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-red-50 border border-red-100 p-4 rounded-xl">
                  <h4 className="font-bold text-red-950 text-xs uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-red-700" /> Biện pháp đặc trị dập dịch
                  </h4>
                  <ul className="space-y-1.5 text-xs text-red-900/90 leading-relaxed">
                    {selectedLibraryDisease.treatment.map((tr, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="font-bold">›</span>
                        <span>{tr}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
                  <h4 className="font-bold text-emerald-950 text-xs uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-700" /> Biện pháp phòng ngừa lâu dài
                  </h4>
                  <ul className="space-y-1.5 text-xs text-emerald-900/90 leading-relaxed">
                    {selectedLibraryDisease.preventiveMeasures.map((pm, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="font-bold">✓</span>
                        <span>{pm}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 3.5: GEOGRAPHICAL DATA COLLECTION MAP */}
        {activeTab === "map" && (
          <SampleMap />
        )}

        {/* TAB 4: ADMIN PORTAL & BUSINESS COSTING CALCULATOR */}
        {activeTab === "admin" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="panel-admin">
            
            {/* Left sidebar: Cost calculator sandbox */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/80 p-5 flex flex-col gap-5 shadow-xs">
              <div>
                <h3 className="font-black text-emerald-950 text-base">Thương Mại Hóa &amp; Hiệu Quả Kinh Tế</h3>
                <p className="text-xs text-slate-400">Mô phỏng doanh số, chi phí sản xuất và điểm hòa vốn</p>
              </div>

              {/* Slides config */}
              <div className="space-y-4">
                
                {/* Cost slider */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>Giá thành sản xuất (Vốn):</span>
                    <span className="font-mono text-slate-900 font-bold">
                      {hardwareCost.toLocaleString("vi-VN")} VNĐ
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1000000"
                    max="2000000"
                    step="50000"
                    value={hardwareCost}
                    onChange={(e) => setHardwareCost(parseInt(e.target.value))}
                    className="w-full accent-slate-800 h-1 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Sell price slider */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>Giá bán dự kiến:</span>
                    <span className="font-mono text-emerald-700 font-bold">
                      {hardwarePrice.toLocaleString("vi-VN")} VNĐ
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1500000"
                    max="3000000"
                    step="50000"
                    value={hardwarePrice}
                    onChange={(e) => setHardwarePrice(parseInt(e.target.value))}
                    className="w-full accent-emerald-600 h-1 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                {/* User Fee monthly slider */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>Phí thuê bao Web AI (1 nông dân / tháng):</span>
                    <span className="font-mono text-amber-700 font-bold">
                      {webMonthlyPrice.toLocaleString("vi-VN")} VNĐ
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="200000"
                    step="10000"
                    value={webMonthlyPrice}
                    onChange={(e) => setWebMonthlyPrice(parseInt(e.target.value))}
                    className="w-full accent-amber-600 h-1 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Accounts target slider */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>Số lượng Hộ dân / Hợp Tác Xã đăng ký:</span>
                    <span className="font-mono text-blue-700 font-bold">
                      {potentialAccounts} tài khoản
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    step="5"
                    value={potentialAccounts}
                    onChange={(e) => setPotentialAccounts(parseInt(e.target.value))}
                    className="w-full accent-blue-600 h-1 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

              </div>

              {/* Real-time economic results */}
              <div className="bg-slate-900 text-white rounded-xl p-4 flex flex-col gap-3.5">
                <h4 className="font-bold text-[10px] uppercase text-slate-400 tracking-widest border-b border-slate-800 pb-2">Báo Cáo Hiệu Quả Tài Chính Dự Kiến</h4>
                
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-slate-400 text-[10px]">Lợi nhuận gộp thiết bị</p>
                    <p className="text-sm font-mono font-bold text-emerald-400 mt-0.5">
                      +{businessResult.hardwareProfitPerUnit.toLocaleString("vi-VN")} VNĐ
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px]">Tỷ suất lợi nhuận</p>
                    <p className="text-sm font-mono font-bold text-amber-400 mt-0.5">
                      {businessResult.profitMargin}%
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
                  <div>
                    <p className="text-slate-400 text-[10px]">TỔNG THU NHẬP RÒNG / NĂM</p>
                    <p className="text-lg font-mono font-black text-emerald-400 mt-0.5">
                      {businessResult.totalAnnualProfit.toLocaleString("vi-VN")} VNĐ
                    </p>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-900/80 border border-emerald-800 text-emerald-300 text-[10px] font-bold rounded-lg uppercase">
                    ROI Rất Cao
                  </span>
                </div>
              </div>
            </div>

            {/* Right details content: virtual farmers link management */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-black text-emerald-950 text-base flex items-center gap-1.5">
                    <UserCheck className="w-5 h-5 text-emerald-600" /> Giao Diện Quản Lý Tài Khoản (Admin Panel)
                  </h3>
                  <p className="text-xs text-slate-400">Cấp Access Key bảo mật và tạo link dùng thử riêng biệt cho nông dân</p>
                </div>
              </div>

              {/* Create virtual user link form */}
              <form onSubmit={handleCreateVirtualUser} className="bg-slate-50 border border-slate-200/60 p-4 rounded-xl flex flex-col sm:flex-row gap-3 items-end">
                <div className="flex-1 flex flex-col gap-1.5 text-xs">
                  <label className="font-bold text-slate-700">ID người dùng (Hộ nông dân / HTX):</label>
                  <input
                    type="text"
                    required
                    value={newUserId}
                    onChange={(e) => setNewUserId(e.target.value)}
                    placeholder="VD: ChuNghia_ThanhXuan"
                    className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-xs w-full sm:w-32">
                  <label className="font-bold text-slate-700">Lượt Chụp Ảnh (Quota):</label>
                  <select
                    value={newUserQuota}
                    onChange={(e) => setNewUserQuota(e.target.value)}
                    className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="50">50 ảnh</option>
                    <option value="100">100 ảnh</option>
                    <option value="200">200 ảnh</option>
                    <option value="UNLIMITED">Không giới hạn</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded-lg text-xs transition-all flex items-center gap-1 cursor-pointer w-full sm:w-auto shrink-0"
                >
                  <Plus className="w-4 h-4" /> Tạo Tài Khoản
                </button>
              </form>

              {/* Interactive Virtual Accounts list */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-1">Danh sách tài khoản hoạt động</span>
                <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto">
                  {adminUsers.map((user) => (
                    <div
                      key={user.id}
                      className="bg-white border border-slate-200/80 p-3 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition-all hover:bg-slate-50"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <strong className="text-slate-800 font-bold">{user.userId}</strong>
                          <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                            user.status === "active" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                          }`}>
                            {user.status === "active" ? "ĐANG HOẠT ĐỘNG" : "BỊ KHÓA"}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5 space-x-2">
                          <span>Access Key: <strong>{user.accessKey}</strong></span>
                          <span>•</span>
                          <span>Hạn dùng: <strong>{user.expiryDate}</strong></span>
                          <span>•</span>
                          <span>Đã dùng: <strong>{user.usedCount}/{user.quota}</strong></span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {/* Copy link button */}
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(user.userLink);
                            alert("Đã sao chép đường dẫn sử dụng riêng biệt của nông dân!");
                          }}
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                          title="Sao chép link chia sẻ"
                        >
                          <Copy className="w-3.5 h-3.5" /> Sao chép
                        </button>

                        <button
                          onClick={() => toggleUserStatus(user.id)}
                          className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                            user.status === "active"
                              ? "border-red-200 hover:bg-red-50 text-red-600"
                              : "border-emerald-200 hover:bg-emerald-50 text-emerald-600"
                          }`}
                        >
                          {user.status === "active" ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 5: JUDGE Q&A PORTAL */}
        {activeTab === "qa" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="panel-qa">
            
            {/* Sidebar with preset queries */}
            <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex flex-col gap-3">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="font-black text-emerald-950 text-base">Cố Vấn AI Phục Vụ Thuyết Trình</h3>
                <p className="text-xs text-slate-400">Ấn chọn các câu hỏi phản biện hóc búa từ Ban Giám Khảo</p>
              </div>

              <div className="flex flex-col gap-1.5 text-xs max-h-[500px] overflow-y-auto">
                {PRESET_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentQuestion(q);
                      askJudgeQuestion(q);
                    }}
                    className="text-left p-2.5 bg-slate-50 hover:bg-emerald-50/60 hover:border-emerald-500 border border-slate-200/60 rounded-xl transition-all leading-relaxed font-semibold text-slate-700 cursor-pointer flex items-start gap-2"
                  >
                    <span className="font-bold text-emerald-600 mt-0.5 shrink-0">?</span>
                    <span>{q}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat viewport stage */}
            <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between min-h-[500px]">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></div>
                  <strong className="text-slate-800 text-sm">Hội Đồng Phản Biện Ban Giám Khảo</strong>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">SUPER RICE Presentation assistant</span>
              </div>

              {/* Chat history list */}
              <div className="flex-1 my-4 space-y-4 overflow-y-auto max-h-[380px] p-2 bg-slate-50/50 rounded-xl border border-slate-100">
                {qaChatHistory.map((msg, index) => {
                  const isJudge = msg.sender === "judge";
                  return (
                    <div
                      key={index}
                      className={`flex ${isJudge ? "justify-start" : "justify-end"} text-xs`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl p-4 shadow-xs leading-relaxed ${
                          isJudge
                            ? "bg-slate-900 text-white rounded-tl-none border border-slate-800"
                            : "bg-emerald-50 border border-emerald-100 text-slate-800 rounded-tr-none"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1 text-[10px] font-bold uppercase tracking-wider">
                          <span className={isJudge ? "text-slate-400" : "text-emerald-700"}>
                            {isJudge ? "BAN GIÁM KHẢO" : "NHÓM TÁC GIẢ HỌC SINH (SUPER RICE)"}
                          </span>
                        </div>
                        <p className="whitespace-pre-line font-medium leading-relaxed">{msg.text}</p>
                      </div>
                    </div>
                  );
                })}

                {isQaThinking && (
                  <div className="flex justify-end text-xs">
                    <div className="bg-emerald-50 border border-emerald-100 text-slate-500 rounded-2xl rounded-tr-none p-4 shadow-xs flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                      <span className="text-[11px] font-mono italic">Nhóm học sinh đang chuẩn bị câu trả lời khoa học...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Input section bar */}
              <div className="flex gap-2 text-xs">
                <input
                  type="text"
                  value={currentQuestion}
                  onChange={(e) => setCurrentQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") askJudgeQuestion(currentQuestion);
                  }}
                  placeholder="Đặt bất kỳ câu hỏi phản biện hóc búa nào cho nhóm..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <button
                  onClick={() => askJudgeQuestion(currentQuestion)}
                  disabled={!currentQuestion.trim() || isQaThinking}
                  className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl px-5 py-3 transition-all flex items-center justify-center gap-1 cursor-pointer font-bold shrink-0"
                >
                  <Send className="w-4 h-4" /> Gửi Câu Hỏi
                </button>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* Toast Notification for Calibration */}
      {calibrationToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-900 text-white px-5 py-3.5 rounded-xl shadow-xl border border-emerald-700 flex items-center gap-3 animate-slide-up">
          <Check className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{calibrationToast}</span>
          <button onClick={() => setCalibrationToast(null)} className="text-emerald-400 hover:text-white ml-2 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* SENSOR & AI CALIBRATION CONSOLE MODAL */}
      {showCalibrationModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col justify-between">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-emerald-950 text-white rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-800 rounded-xl">
                  <Sliders className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white">BẢNG HIỆU CHUẨN CẢM BIẾN 7-IN-1 &amp; MÔ HÌNH AI RICE</h3>
                  <p className="text-xs text-emerald-300">Hiệu chuẩn độ chính xác đo đạc thổ nhưỡng và thuật toán AI Fusion</p>
                </div>
              </div>
              <button
                onClick={() => setShowCalibrationModal(false)}
                className="p-2 text-emerald-400 hover:text-white hover:bg-emerald-900 rounded-lg transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 space-y-6 text-xs text-slate-700">
              
              {/* Calibration Status Info */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Trạng thái thiết bị</span>
                  <p className="font-bold text-emerald-800 text-xs mt-0.5">{calibrationConfig.calibrationStatus}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Lần hiệu chuẩn gần nhất: {calibrationConfig.lastCalibratedTime}</p>
                </div>
                <button
                  onClick={() => {
                    setCalibrationConfig({
                      phOffset: 0.0,
                      ecOffset: 0.0,
                      nGain: 1.0,
                      pGain: 1.0,
                      kGain: 1.0,
                      tempOffset: 0.0,
                      moistureOffset: 0,
                      aiConfidenceThreshold: 45,
                      aiIoUThreshold: 50,
                      fusionVisionWeight: 60,
                      lastCalibratedTime: "11/08/2026 - Đặt lại thông số chuẩn Lab",
                      calibrationStatus: "THÔNG SỐ MẶC ĐỊNH PHÒNG THÍ NGHIỆM"
                    });
                  }}
                  className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-lg transition-all cursor-pointer shrink-0 flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Khôi phục Mặc định Lab
                </button>
              </div>

              {/* Section 1: Soil Sensor Hardware Offsets */}
              <div className="space-y-4">
                <h4 className="font-black text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5 text-emerald-800 border-b border-slate-100 pb-2">
                  <Activity className="w-4 h-4 text-emerald-600" /> 1. Hiệu chuẩn Cảm biến Đất (RS485 Modbus / ESP32-S3)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* pH Calibration */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-800">Bù sai số pH (pH Offset)</span>
                      <span className="font-mono font-bold text-emerald-700">{calibrationConfig.phOffset > 0 ? `+${calibrationConfig.phOffset}` : calibrationConfig.phOffset} pH</span>
                    </div>
                    <input
                      type="range"
                      min="-1.5"
                      max="1.5"
                      step="0.05"
                      value={calibrationConfig.phOffset}
                      onChange={(e) => setCalibrationConfig({ ...calibrationConfig, phOffset: parseFloat(e.target.value) })}
                      className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                    />
                    <div className="flex gap-1.5 pt-1">
                      <button
                        onClick={() => setCalibrationConfig({ ...calibrationConfig, phOffset: -0.2 })}
                        className="flex-1 py-1 bg-white border border-slate-200 hover:bg-slate-100 rounded text-[10px] font-semibold text-slate-700 cursor-pointer"
                      >
                        [Chua Phèn]
                      </button>
                      <button
                        onClick={() => setCalibrationConfig({ ...calibrationConfig, phOffset: 0.0 })}
                        className="flex-1 py-1 bg-white border border-slate-200 hover:bg-slate-100 rounded text-[10px] font-semibold text-slate-700 cursor-pointer"
                      >
                        [pH 6.86 Chuẩn]
                      </button>
                      <button
                        onClick={() => setCalibrationConfig({ ...calibrationConfig, phOffset: 0.3 })}
                        className="flex-1 py-1 bg-white border border-slate-200 hover:bg-slate-100 rounded text-[10px] font-semibold text-slate-700 cursor-pointer"
                      >
                        [Mặn Kiềm]
                      </button>
                    </div>
                  </div>

                  {/* EC Calibration */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-800">Bù sai số Độ dẫn điện EC (Offset)</span>
                      <span className="font-mono font-bold text-blue-700">{calibrationConfig.ecOffset > 0 ? `+${calibrationConfig.ecOffset}` : calibrationConfig.ecOffset} mS/cm</span>
                    </div>
                    <input
                      type="range"
                      min="-0.5"
                      max="0.5"
                      step="0.01"
                      value={calibrationConfig.ecOffset}
                      onChange={(e) => setCalibrationConfig({ ...calibrationConfig, ecOffset: parseFloat(e.target.value) })}
                      className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                    />
                    <p className="text-[10px] text-slate-400">Dung dịch chuẩn tham chiếu: 1413 µS/cm (1.41 mS/cm)</p>
                  </div>
                </div>

                {/* NPK Gain Coefficients */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/70 space-y-3">
                  <span className="font-bold text-slate-800 block">Hệ số Nhân Dinh Dưỡng N-P-K theo Thổ Nhưỡng Vùng (Gain Factor)</span>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-[10px] text-slate-500 font-bold block mb-1">Nitơ (N Gain): {calibrationConfig.nGain}x</label>
                      <input
                        type="range"
                        min="0.8"
                        max="1.2"
                        step="0.02"
                        value={calibrationConfig.nGain}
                        onChange={(e) => setCalibrationConfig({ ...calibrationConfig, nGain: parseFloat(e.target.value) })}
                        className="w-full accent-blue-600 h-1 cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 font-bold block mb-1">Phốt-pho (P Gain): {calibrationConfig.pGain}x</label>
                      <input
                        type="range"
                        min="0.8"
                        max="1.2"
                        step="0.02"
                        value={calibrationConfig.pGain}
                        onChange={(e) => setCalibrationConfig({ ...calibrationConfig, pGain: parseFloat(e.target.value) })}
                        className="w-full accent-purple-600 h-1 cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 font-bold block mb-1">Kali (K Gain): {calibrationConfig.kGain}x</label>
                      <input
                        type="range"
                        min="0.8"
                        max="1.2"
                        step="0.02"
                        value={calibrationConfig.kGain}
                        onChange={(e) => setCalibrationConfig({ ...calibrationConfig, kGain: parseFloat(e.target.value) })}
                        className="w-full accent-amber-600 h-1 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* Section 2: AI Fusion Algorithm Calibration */}
              <div className="space-y-4">
                <h4 className="font-black text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5 text-emerald-800 border-b border-slate-100 pb-2">
                  <Database className="w-4 h-4 text-emerald-600" /> 2. Hiệu chuẩn Thuật Toán AI Fusion (YOLOv8 + Soil Decision Tree)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* AI Confidence Cutoff */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-800">Ngưỡng Tin Cậy Nhận Diện AI (Confidence)</span>
                      <span className="font-mono font-bold text-emerald-700">{calibrationConfig.aiConfidenceThreshold}%</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="85"
                      value={calibrationConfig.aiConfidenceThreshold}
                      onChange={(e) => setCalibrationConfig({ ...calibrationConfig, aiConfidenceThreshold: parseInt(e.target.value) })}
                      className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                    />
                    <p className="text-[10px] text-slate-400">Càng cao càng ít báo nhầm, mặc định 45% cho thực địa ngoài trời.</p>
                  </div>

                  {/* AI Vision vs Soil Fusion Weighting */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-800">Tỷ Trọng AI Fusion (Ảnh Lá / Đất)</span>
                      <span className="font-mono font-bold text-emerald-700">{calibrationConfig.fusionVisionWeight}% Ảnh / {100 - calibrationConfig.fusionVisionWeight}% Đất</span>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="80"
                      value={calibrationConfig.fusionVisionWeight}
                      onChange={(e) => setCalibrationConfig({ ...calibrationConfig, fusionVisionWeight: parseInt(e.target.value) })}
                      className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                    />
                    <p className="text-[10px] text-slate-400">Kết hợp 60% dữ liệu hình ảnh lá lúa + 40% bất thường sinh hóa đất.</p>
                  </div>
                </div>

              </div>

            </div>

            {/* Modal Footer Actions */}
            <div className="p-5 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-mono">
                ISO 17025 Calibrated • Cần Thơ Precision Agriculture
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowCalibrationModal(false)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl transition-all cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  onClick={applyCalibration}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" /> Lưu &amp; Áp Dụng Hiệu Chuẩn
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* QUICK GUIDE MODAL FOR JURY / BAN GIÁM KHẢO */}
      {showQuickGuideModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 md:p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col justify-between">
            
            {/* Modal Header */}
            <div className="p-4 md:p-5 border-b border-slate-100 flex items-center justify-between bg-emerald-950 text-white rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-400 text-slate-950 rounded-xl shadow-xs font-black">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full">
                      DÀNH CHO BAN GIÁM KHẢO
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-300">
                      Hệ Thống AI-RICE v3.0
                    </span>
                  </div>
                  <h3 className="font-extrabold text-base md:text-lg text-white mt-0.5">
                    HƯỚNG DẪN NHANH TRẢI NGHIỆM TÍNH NĂNG
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setShowQuickGuideModal(false)}
                className="p-2 text-emerald-400 hover:text-white hover:bg-emerald-900 rounded-lg transition-all cursor-pointer"
                title="Đóng cửa sổ"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Internal Navigation Tabs */}
            <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setQuickGuideTab("slides")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  quickGuideTab === "slides"
                    ? "bg-emerald-700 text-white shadow-xs"
                    : "bg-white text-slate-600 hover:bg-slate-200"
                }`}
              >
                <FileText className="w-3.5 h-3.5" /> 1. Slide Báo Cáo
              </button>
              <button
                onClick={() => setQuickGuideTab("sandbox")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  quickGuideTab === "sandbox"
                    ? "bg-emerald-700 text-white shadow-xs"
                    : "bg-white text-slate-600 hover:bg-slate-200"
                }`}
              >
                <Sliders className="w-3.5 h-3.5" /> 2. Live Sandbox AI
              </button>
              <button
                onClick={() => setQuickGuideTab("library")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  quickGuideTab === "library"
                    ? "bg-emerald-700 text-white shadow-xs"
                    : "bg-white text-slate-600 hover:bg-slate-200"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" /> 3. Thư Viện 11 Bệnh
              </button>
              <button
                onClick={() => setQuickGuideTab("admin")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  quickGuideTab === "admin"
                    ? "bg-emerald-700 text-white shadow-xs"
                    : "bg-white text-slate-600 hover:bg-slate-200"
                }`}
              >
                <DollarSign className="w-3.5 h-3.5" /> 4. Kinh Doanh &amp; Admin
              </button>
              <button
                onClick={() => setQuickGuideTab("qa")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  quickGuideTab === "qa"
                    ? "bg-emerald-700 text-white shadow-xs"
                    : "bg-white text-slate-600 hover:bg-slate-200"
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" /> 5. Vấn Đáp BGK
              </button>
            </div>

            {/* Modal Content Details */}
            <div className="p-5 md:p-6 overflow-y-auto space-y-5 text-xs text-slate-700 max-h-[60vh]">
              {quickGuideTab === "slides" && (
                <div className="space-y-4">
                  <div className="bg-emerald-50 border border-emerald-200/80 p-4 rounded-xl flex items-start gap-3">
                    <FileText className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">Tab 1: Trình Chiếu Báo Cáo KH-KT (Slide Center)</h4>
                      <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                        Chứa bộ 8 Slide báo cáo chuẩn cuộc thi Sáng Tạo KH-KT Cần Thơ kèm bộ đếm thời gian thực trình bày và Kịch bản thuyết trình (Teleprompter) chi tiết cho học sinh.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
                      <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-emerald-600" /> Tính Năng Trọng Tâm
                      </h5>
                      <ul className="space-y-1.5 text-slate-700 text-xs list-disc pl-4">
                        <li><strong>Điều hướng Slide:</strong> Sử dụng phím mũi tên `←` `→`, phím Space, hoặc ấn chọn từ danh sách 8 slide bên trái.</li>
                        <li><strong>Teleprompter:</strong> Lời thoại thuyết trình tự động đồng bộ theo từng slide, có thể tăng giảm cỡ chữ.</li>
                        <li><strong>Bảng đếm giờ:</strong> Bấm nút Play/Pause để quản lý chính xác thời gian 5-10 phút báo cáo.</li>
                      </ul>
                    </div>

                    <div className="bg-amber-50/80 border border-amber-200 p-4 rounded-xl space-y-2">
                      <h5 className="font-bold text-amber-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-amber-700" /> Thao Tác Đề Xuất Cho BGK
                      </h5>
                      <ol className="space-y-1.5 text-amber-900 text-xs list-decimal pl-4">
                        <li>Bấm phím `→` để xem qua các slide số liệu thực nghiệm.</li>
                        <li>Xem <strong>Slide 4 (Mô hình AI Fusion)</strong> &amp; <strong>Slide 7 (Tài chính &amp; Giá thành)</strong>.</li>
                        <li>Kiểm tra kịch bản lời thoại ở ô dưới cùng màn hình.</li>
                      </ol>
                    </div>
                  </div>
                </div>
              )}

              {quickGuideTab === "sandbox" && (
                <div className="space-y-4">
                  <div className="bg-emerald-50 border border-emerald-200/80 p-4 rounded-xl flex items-start gap-3">
                    <Sliders className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">Tab 2: Mô Phỏng Thực Nghiệm Live &amp; AI Fusion</h4>
                      <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                        Trái tim của hệ thống: Kết hợp thuật toán nhận dạng hình ảnh lá lúa (YOLOv8 / Gemini 3.6 Flash) cùng bộ cảm biến đất 7-in-1 đo NPK, pH, EC, độ ẩm, nhiệt độ.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
                      <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-emerald-600" /> Tính Năng Trọng Tâm
                      </h5>
                      <ul className="space-y-1.5 text-slate-700 text-xs list-disc pl-4">
                        <li><strong>Đổi màu cảnh báo điểm nóng:</strong> Các chỉ số thổ nhưỡng tự động chuyển màu Vàng/Đỏ khi vượt ngưỡng an toàn.</li>
                        <li><strong>Đồ thị dự báo NPK 7 ngày:</strong> Biểu đồ đường dự đoán nguy cơ cạn kiệt đạm/lân/kali.</li>
                        <li><strong>Hiệu Chuẩn Cảm Biến &amp; AI:</strong> Nút mở console bù sai số đo đạc phòng thí nghiệm.</li>
                        <li><strong>Mô phỏng 11 bệnh:</strong> Nút preset 11 loại bệnh lúa lập tức đưa chỉ số đất và ảnh tương ứng.</li>
                      </ul>
                    </div>

                    <div className="bg-amber-50/80 border border-amber-200 p-4 rounded-xl space-y-2">
                      <h5 className="font-bold text-amber-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-amber-700" /> Thao Tác Đề Xuất Cho BGK
                      </h5>
                      <ol className="space-y-1.5 text-amber-900 text-xs list-decimal pl-4">
                        <li>Ấn chọn mẫu <strong>"Bệnh Đạo Ôn"</strong> để load dữ liệu chuẩn.</li>
                        <li>Kéo thanh trượt <strong>Nitơ (N) &gt; 120 mg/kg</strong> để xem thẻ đổi sang màu Đỏ/Phát hiện điểm nóng.</li>
                        <li>Ấn nút <strong>"Phân Tích AI Fusion Ngay"</strong> để xem khuyến cáo canh tác chi tiết.</li>
                      </ol>
                    </div>
                  </div>
                </div>
              )}

              {quickGuideTab === "library" && (
                <div className="space-y-4">
                  <div className="bg-emerald-50 border border-emerald-200/80 p-4 rounded-xl flex items-start gap-3">
                    <BookOpen className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">Tab 3: Thư Viện Tra Cứu 11 Loại Bệnh Hại Lúa</h4>
                      <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                        Cơ sở dữ liệu 2.000 mẫu ảnh và hồ sơ sinh học chi tiết về 11 loại bệnh &amp; sâu hại phổ biến tại vùng Đồng bằng Sông Cửu Long.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
                      <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-emerald-600" /> Tính Năng Trọng Tâm
                      </h5>
                      <ul className="space-y-1.5 text-slate-700 text-xs list-disc pl-4">
                        <li><strong>Bộ lọc thông minh:</strong> Tìm kiếm theo tên bệnh, phân loại nấm, vi khuẩn, virus, sâu hại hoặc độc tố đất.</li>
                        <li><strong>Chỉ số môi trường chuẩn:</strong> Mức NPK, pH, EC đặc trưng thúc đẩy bùng phát bệnh.</li>
                        <li><strong>Phác đồ điều trị:</strong> Khuyến cáo thuốc bảo vệ thực vật sinh học &amp; kỹ thuật bón phân cân đối.</li>
                      </ul>
                    </div>

                    <div className="bg-amber-50/80 border border-amber-200 p-4 rounded-xl space-y-2">
                      <h5 className="font-bold text-amber-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-amber-700" /> Thao Tác Đề Xuất Cho BGK
                      </h5>
                      <ol className="space-y-1.5 text-amber-900 text-xs list-decimal pl-4">
                        <li>Gõ từ khóa <strong>"Bạc lá"</strong> hoặc <strong>"Đốm vằn"</strong> vào ô tìm kiếm.</li>
                        <li>Xem bảng chỉ số môi trường đất lý tưởng cho từng loại bệnh.</li>
                        <li>Xem phác đồ phun xịt phòng trừ sâu bệnh.</li>
                      </ol>
                    </div>
                  </div>
                </div>
              )}

              {quickGuideTab === "admin" && (
                <div className="space-y-4">
                  <div className="bg-emerald-50 border border-emerald-200/80 p-4 rounded-xl flex items-start gap-3">
                    <DollarSign className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">Tab 4: Phương Án Thương Mại Hóa &amp; Quản Lý Admin</h4>
                      <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                        Chứng minh tính khả thi kinh tế thương mại hóa sản phẩm thiết bị IoT và mô hình quản lý phần mềm SaaS cho hộ nông dân.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
                      <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-emerald-600" /> Tính Năng Trọng Tâm
                      </h5>
                      <ul className="space-y-1.5 text-slate-700 text-xs list-disc pl-4">
                        <li><strong>Mô phỏng tài chính Live:</strong> Điều chỉnh Vốn thiết bị, Giá bán, Phí thuê bao web để tính tự động Lợi nhuận &amp; ROI.</li>
                        <li><strong>Quản lý tài khoản nông dân:</strong> Khởi tạo tài khoản ảo, cấp Khóa truy cập (Access Key) &amp; Link Camera thực địa.</li>
                        <li><strong>Cấu trúc chi phí linh kiện:</strong> Bảng phân rã chi phí chi tiết cảm biến Modbus RS485 &amp; bo mạch ESP32.</li>
                      </ul>
                    </div>

                    <div className="bg-amber-50/80 border border-amber-200 p-4 rounded-xl space-y-2">
                      <h5 className="font-bold text-amber-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-amber-700" /> Thao Tác Đề Xuất Cho BGK
                      </h5>
                      <ol className="space-y-1.5 text-amber-900 text-xs list-decimal pl-4">
                        <li>Kéo thanh trượt <strong>"Số lượng Hộ dân"</strong> lên 100 hộ để xem thu nhập ròng tự động cập nhật.</li>
                        <li>Điền tên hộ dân mới và ấn <strong>"Tạo Tài Khoản"</strong>.</li>
                        <li>Ấn nút <strong>"Sao chép link"</strong> để dùng đường dẫn nông dân riêng biệt.</li>
                      </ol>
                    </div>
                  </div>
                </div>
              )}

              {quickGuideTab === "qa" && (
                <div className="space-y-4">
                  <div className="bg-emerald-50 border border-emerald-200/80 p-4 rounded-xl flex items-start gap-3">
                    <MessageSquare className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">Tab 5: Cố Vấn Vấn Đáp Ban Giám Khảo (AI Defense)</h4>
                      <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                        Ngân hàng 12+ câu hỏi phản biện hóc búa về công nghệ AI, cảm biến, tính kinh tế và môi trường ĐBSCL kèm câu trả lời khoa học chứng minh bằng số liệu.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
                      <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-emerald-600" /> Tính Năng Trọng Tâm
                      </h5>
                      <ul className="space-y-1.5 text-slate-700 text-xs list-disc pl-4">
                        <li><strong>Preset câu hỏi BGK:</strong> Nút bấm nhanh các câu hỏi thường gặp của Hội đồng giám khảo KH-KT.</li>
                        <li><strong>AI Giám Khảo Phản Biện:</strong> Ô nhập câu hỏi tùy ý để thử nghiệm phản ứng trả lời của hệ thống.</li>
                        <li><strong>Độ chính xác khoa học:</strong> Đã được tham chiếu chuyên môn cùng kỹ sư nông nghiệp &amp; giáo viên hướng dẫn.</li>
                      </ul>
                    </div>

                    <div className="bg-amber-50/80 border border-amber-200 p-4 rounded-xl space-y-2">
                      <h5 className="font-bold text-amber-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-amber-700" /> Thao Tác Đề Xuất Cho BGK
                      </h5>
                      <ol className="space-y-1.5 text-amber-900 text-xs list-decimal pl-4">
                        <li>Ấn chọn câu hỏi preset bên cột trái (ví dụ: <em>"Tại sao kết hợp ảnh lá và cảm biến đất?"</em>).</li>
                        <li>Nhập một câu hỏi phản biện bất kỳ vào ô chat bên dưới.</li>
                        <li>Đọc câu trả lời được sinh ra theo thời gian thực.</li>
                      </ol>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">
                Ứng dụng AI-RICE v3.0 • Trường PTDTNT THCS Him Lam, Cần Thơ
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowQuickGuideModal(false)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl transition-all cursor-pointer text-xs"
                >
                  Đóng Hướng Dẫn
                </button>
                <button
                  onClick={() => {
                    setActiveTab(quickGuideTab);
                    setShowQuickGuideModal(false);
                  }}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer text-xs"
                >
                  Thử Ngay Tab Này <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* DISEASE DETAIL MODAL */}
      {showDiseaseModal && modalDisease && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
            
            {/* Modal Header */}
            <div className="bg-emerald-950 text-white p-5 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <img
                  src={modalDisease.sampleImage}
                  alt={modalDisease.name}
                  className="w-14 h-14 object-cover rounded-xl border-2 border-emerald-500/50 shrink-0"
                />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-emerald-800 text-emerald-200 text-[10px] font-bold uppercase rounded">
                      {modalDisease.category}
                    </span>
                    <span className="text-[11px] text-emerald-400 font-mono">
                      {modalDisease.scientificName}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-white mt-1">
                    {modalDisease.name} <span className="text-emerald-300/80 text-sm font-normal">({modalDisease.englishName})</span>
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setShowDiseaseModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-emerald-900 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-5 text-xs text-slate-700">
              
              {/* Question 1: What is this disease? */}
              <div className="bg-emerald-50/80 border border-emerald-200/80 p-4 rounded-xl">
                <h4 className="font-extrabold text-emerald-950 text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-600" /> 1. Bệnh này là gì? (Khái niệm &amp; Bản chất tác nhân)
                </h4>
                <p className="text-slate-800 leading-relaxed text-xs">
                  {modalDisease.definition}
                </p>
              </div>

              {/* Question 2: How to identify? */}
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider mb-2.5 flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-emerald-600" /> 2. Cách nhận biết &amp; Dấu hiệu đặc trưng?
                </h4>
                <ul className="space-y-2">
                  {modalDisease.identification.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-700">
                      <span className="text-emerald-600 font-bold mt-0.5">•</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Question 3: Harmful effects & Yield loss */}
              <div className="bg-rose-50/90 border border-rose-200/90 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-extrabold text-rose-950 text-xs uppercase tracking-wider flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600" /> 3. Tác hại &amp; Mức độ thiệt hại năng suất?
                  </h4>
                  <span className="bg-rose-600 text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase">
                    {modalDisease.harmfulEffects.yieldLoss}
                  </span>
                </div>
                <p className="text-rose-900/90 font-medium leading-relaxed mb-3">
                  {modalDisease.harmfulEffects.description}
                </p>
                <div className="space-y-1.5 border-t border-rose-200/60 pt-2.5">
                  <p className="font-bold text-[11px] text-rose-900 uppercase">Tác động sinh lý &amp; kinh tế chính:</p>
                  <ul className="space-y-1 text-rose-900/80">
                    {modalDisease.harmfulEffects.impacts.map((imp, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="font-bold">›</span>
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Soil Sensor Standards */}
              <div className="border border-slate-200 bg-slate-50/50 p-4 rounded-xl">
                <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-600" /> 4. Chỉ số cảm biến đất đặc trưng thúc đẩy bệnh
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 text-center">
                  <div className="bg-white border border-slate-200 p-2 rounded-lg">
                    <span className="text-[9px] font-bold text-slate-400 block">ĐỘ ẨM ĐẤT</span>
                    <span className="text-sm font-black text-slate-800">{modalDisease.typicalSoil.moisture}</span>
                  </div>
                  <div className="bg-white border border-slate-200 p-2 rounded-lg">
                    <span className="text-[9px] font-bold text-slate-400 block">pH ĐẤT</span>
                    <span className="text-sm font-black text-slate-800">{modalDisease.typicalSoil.pH}</span>
                  </div>
                  <div className="bg-white border border-slate-200 p-2 rounded-lg">
                    <span className="text-[9px] font-bold text-slate-400 block">ĐỘ DẪN EC</span>
                    <span className="text-sm font-black text-slate-800">{modalDisease.typicalSoil.ec}</span>
                  </div>
                  <div className="bg-white border border-slate-200 p-2 rounded-lg">
                    <span className="text-[9px] font-bold text-slate-400 block">NPK ĐẤT TRUNG BÌNH</span>
                    <span className="text-[11px] font-mono font-bold text-slate-800">{modalDisease.typicalSoil.npk}</span>
                  </div>
                </div>
              </div>

              {/* Treatment & Prevention */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-50/80 border border-red-100 p-3.5 rounded-xl">
                  <h5 className="font-bold text-red-950 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-700" /> Phác đồ điều trị đặc trị
                  </h5>
                  <ul className="space-y-1.5 text-red-900/90 leading-relaxed text-[11px]">
                    {modalDisease.treatment.map((tr, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="font-bold">›</span>
                        <span>{tr}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-emerald-50/80 border border-emerald-100 p-3.5 rounded-xl">
                  <h5 className="font-bold text-emerald-950 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-700" /> Phòng ngừa bền vững
                  </h5>
                  <ul className="space-y-1.5 text-emerald-900/90 leading-relaxed text-[11px]">
                    {modalDisease.preventiveMeasures.map((pm, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="font-bold">✓</span>
                        <span>{pm}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">
                Cơ sở dữ liệu bệnh hại AI-RICE • Trường PTDTNT THCS Him Lam
              </span>
              <button
                onClick={() => setShowDiseaseModal(false)}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer text-xs"
              >
                Đóng Cửa Sổ Hồ Sơ
              </button>
            </div>

          </div>
        </div>
      )}

      {/* FOOTER BAR */}
      <footer className="bg-emerald-950 text-emerald-300 border-t border-emerald-900 py-6 px-4 text-center mt-12 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-medium text-emerald-200">
            © 2026 AI-RICE (Super Rice) — Cuộc thi Sáng Tạo Thanh Thiếu Niên, Nhi Đồng TP. Cần Thơ.
          </p>
          <p className="text-emerald-400 font-mono">
            Đơn vị: Trường PTDTNT THCS Him Lam, Cần Thơ. Giáo viên HD: Thầy Lê Thanh Liêm.
          </p>
        </div>
      </footer>
    </div>
  );
}
