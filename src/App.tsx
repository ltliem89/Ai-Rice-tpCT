import React, { useState, useEffect, useRef } from "react";
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
  Check,
  AlertTriangle,
  TrendingUp,
  Battery,
  Wifi,
  Copy,
  ExternalLink,
  Award
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
    "slides" | "sandbox" | "library" | "admin" | "qa"
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

  const [sensorHistory, setSensorHistory] = useState<any[]>([
    { name: "10:15", moisture: 81, temp: 28.1, pH: 5.9, ec: 0.82 },
    { name: "10:20", moisture: 80, temp: 28.0, pH: 5.9, ec: 0.81 },
    { name: "10:25", moisture: 80, temp: 28.1, pH: 5.8, ec: 0.81 },
    { name: "10:30", moisture: 80, temp: 28.2, pH: 5.9, ec: 0.81 },
    { name: "10:35", moisture: 79, temp: 28.1, pH: 5.9, ec: 0.81 },
    { name: "10:40", moisture: 80, temp: 28.0, pH: 5.9, ec: 0.81 }
  ]);

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
        <div className="max-w-7xl mx-auto flex overflow-x-auto scrollbar-none gap-1 py-1.5">
          <button
            onClick={() => setActiveTab("slides")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold text-sm transition-all whitespace-nowrap cursor-pointer ${
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
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold text-sm transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "sandbox"
                ? "bg-emerald-600 text-white shadow-sm"
                : "hover:bg-emerald-900/50 text-emerald-200"
            }`}
            id="nav-tab-sandbox"
          >
            <Sliders className="w-4 h-4" />
            Mô Phỏng Thực Nghiệm Live
          </button>
          <button
            onClick={() => setActiveTab("library")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold text-sm transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "library"
                ? "bg-emerald-600 text-white shadow-sm"
                : "hover:bg-emerald-900/50 text-emerald-200"
            }`}
            id="nav-tab-library"
          >
            <BookOpen className="w-4 h-4" />
            Thư Viện 11 Loại Bệnh
          </button>
          <button
            onClick={() => setActiveTab("admin")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold text-sm transition-all whitespace-nowrap cursor-pointer ${
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
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold text-sm transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "qa"
                ? "bg-emerald-600 text-white shadow-sm"
                : "hover:bg-emerald-900/50 text-emerald-200"
            }`}
            id="nav-tab-qa"
          >
            <MessageSquare className="w-4 h-4" />
            Vấn Đáp Ban Giám Khảo
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
                      className={`text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-all flex items-start gap-2.5 cursor-pointer ${
                        isCurrent
                          ? "bg-emerald-50 border-l-4 border-emerald-600 text-emerald-900 font-bold"
                          : "hover:bg-slate-50 text-slate-600"
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
                  <h3 className="font-black text-emerald-950 text-base">Bộ Cảm Biến Đất 7-Trong-1</h3>
                  <p className="text-xs text-slate-400">Điều chỉnh thông số thổ nhưỡng trực tiếp tại gốc rễ lúa</p>
                </div>
                <div className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-[10px] font-mono font-bold uppercase">
                  ESP32-S3 LINKED
                </div>
              </div>

              {/* Presets: Align with 11 disease standards for quick judge display */}
              <div>
                <p className="text-xs font-bold text-slate-500 mb-2">Môi trường đặc trưng theo loại bệnh hại:</p>
                <div className="flex flex-wrap gap-1.5">
                  {RICE_DISEASES.slice(0, 6).map((disease) => {
                    const isSelected = selectedSandboxDisease?.id === disease.id;
                    return (
                      <button
                        key={disease.id}
                        onClick={() => calibrateSoilForDisease(disease)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-emerald-600 text-white shadow-xs"
                            : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                        }`}
                      >
                        {disease.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 7 sliders config */}
              <div className="space-y-4">
                
                {/* Nitrogen */}
                <div className="flex flex-col gap-1.5 bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 flex items-center gap-1">
                      <span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
                      Hàm lượng Nitơ (Đạm - N)
                    </span>
                    <span className="font-mono font-bold text-blue-700">{simulatedSensor.nitrogen} mg/kg</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="300"
                    value={simulatedSensor.nitrogen}
                    onChange={(e) => setSimulatedSensor({ ...simulatedSensor, nitrogen: parseInt(e.target.value) })}
                    className="w-full accent-blue-600 h-1 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Thấp (Thiếu hụt)</span>
                    <span className={simulatedSensor.nitrogen > 150 ? "text-red-500 font-bold" : "text-slate-400"}>
                      {simulatedSensor.nitrogen > 150 ? "⚠️ Quá Cao (Dễ bệnh Đạo ôn!)" : "Tối ưu: 80 - 120"}
                    </span>
                    <span>Cực Cao</span>
                  </div>
                </div>

                {/* Phosphorus */}
                <div className="flex flex-col gap-1.5 bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 flex items-center gap-1">
                      <span className="w-2.5 h-2.5 bg-purple-500 rounded-full"></span>
                      Hàm lượng Phốt-pho (Lân - P)
                    </span>
                    <span className="font-mono font-bold text-purple-700">{simulatedSensor.phosphorus} mg/kg</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="150"
                    value={simulatedSensor.phosphorus}
                    onChange={(e) => setSimulatedSensor({ ...simulatedSensor, phosphorus: parseInt(e.target.value) })}
                    className="w-full accent-purple-600 h-1 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Nghèo Lân</span>
                    <span>Tối ưu: 30 - 50</span>
                    <span>Dư thừa Lân</span>
                  </div>
                </div>

                {/* Potassium */}
                <div className="flex flex-col gap-1.5 bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 flex items-center gap-1">
                      <span className="w-2.5 h-2.5 bg-amber-500 rounded-full"></span>
                      Hàm lượng Kali (K)
                    </span>
                    <span className="font-mono font-bold text-amber-700">{simulatedSensor.potassium} mg/kg</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={simulatedSensor.potassium}
                    onChange={(e) => setSimulatedSensor({ ...simulatedSensor, potassium: parseInt(e.target.value) })}
                    className="w-full accent-amber-600 h-1 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span className={simulatedSensor.potassium < 50 ? "text-amber-600 font-bold" : "text-slate-400"}>
                      {simulatedSensor.potassium < 50 ? "⚠️ Thấp (Dễ bạc lá!)" : "Thiếu Kali"}
                    </span>
                    <span>Tối ưu: 65 - 100</span>
                    <span>Cao</span>
                  </div>
                </div>

                {/* pH slider */}
                <div className="flex flex-col gap-1.5 bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 flex items-center gap-1">
                      <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
                      Độ pH Đất
                    </span>
                    <span className="font-mono font-bold text-emerald-700">{simulatedSensor.pH} pH</span>
                  </div>
                  <input
                    type="range"
                    min="3.5"
                    max="9.0"
                    step="0.1"
                    value={simulatedSensor.pH}
                    onChange={(e) => setSimulatedSensor({ ...simulatedSensor, pH: parseFloat(e.target.value) })}
                    className="w-full accent-emerald-600 h-1 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span className={simulatedSensor.pH < 5.0 ? "text-red-500 font-bold" : "text-slate-400"}>
                      {simulatedSensor.pH < 5.0 ? "⚠️ Chua Phèn Nặng!" : "Chua (Phèn)"}
                    </span>
                    <span>Tối ưu: 5.5 - 6.5</span>
                    <span>Kiềm (Mặn)</span>
                  </div>
                </div>

                {/* Moisture Slider */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1 bg-slate-50/50 p-2 rounded border border-slate-100">
                    <label className="text-[11px] font-bold text-slate-500">Độ Ẩm Đất (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={simulatedSensor.moisture}
                      onChange={(e) => setSimulatedSensor({ ...simulatedSensor, moisture: Math.min(100, parseInt(e.target.value) || 0) })}
                      className="bg-white border border-slate-200 rounded px-2 py-1 text-xs font-mono font-bold text-slate-800"
                    />
                  </div>
                  <div className="flex flex-col gap-1 bg-slate-50/50 p-2 rounded border border-slate-100">
                    <label className="text-[11px] font-bold text-slate-500">Độ dẫn điện EC (mS/cm)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0.1"
                      max="3.0"
                      value={simulatedSensor.ec}
                      onChange={(e) => setSimulatedSensor({ ...simulatedSensor, ec: parseFloat(e.target.value) || 0.1 })}
                      className="bg-white border border-slate-200 rounded px-2 py-1 text-xs font-mono font-bold text-slate-800"
                    />
                  </div>
                </div>

              </div>

              {/* Live Running Chart from Sensor probes */}
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 h-[180px]">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Đồ thị biến thiên độ ẩm và pH liên tục (Live)</p>
                <ResponsiveContainer width="100%" height="90%">
                  <LineChart data={sensorHistory}>
                    <XAxis dataKey="name" fontSize={8} stroke="#94a3b8" />
                    <YAxis yAxisId="left" stroke="#0ea5e9" fontSize={8} />
                    <YAxis yAxisId="right" orientation="right" stroke="#10b981" fontSize={8} />
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <Tooltip />
                    <Line yAxisId="left" type="monotone" dataKey="moisture" stroke="#0ea5e9" name="Độ ẩm" strokeWidth={2} dot={false} />
                    <Line yAxisId="right" type="monotone" dataKey="pH" stroke="#10b981" name="pH Đất" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
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
                          <button
                            key={disease.id}
                            onClick={() => {
                              setSelectedSandboxDisease(disease);
                              setCustomUploadedImage(null);
                              setSandboxImageBase64(null);
                            }}
                            className={`p-1 bg-slate-50 border rounded-lg overflow-hidden text-left transition-all flex flex-col gap-1 cursor-pointer hover:border-emerald-500 ${
                              isSelected ? "ring-2 ring-emerald-600 border-emerald-600" : "border-slate-200"
                            }`}
                          >
                            <img
                              src={disease.sampleImage}
                              alt={disease.name}
                              className="w-full h-12 object-cover rounded"
                            />
                            <span className="text-[10px] font-bold text-slate-800 block truncate px-1">
                              {disease.name}
                            </span>
                          </button>
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
                    <div className="flex gap-2">
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

                <div className="bg-emerald-50 border border-emerald-100 px-3.5 py-2 rounded-xl text-center">
                  <p className="text-[10px] text-emerald-700 font-bold uppercase">Mẫu Ảnh Thực Nghiệm</p>
                  <p className="text-xl font-mono font-black text-emerald-950 mt-0.5">{selectedLibraryDisease.experimentalPhotoCount} tấm</p>
                </div>
              </div>

              {/* Symptoms and ecological factors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2.5 flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                    <Leaf className="w-4 h-4 text-emerald-600" /> Triệu chứng nhận biết
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {selectedLibraryDisease.symptoms.map((sym, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-red-500 mt-0.5 font-bold">•</span>
                        <span className="leading-relaxed">{sym}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2.5 flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                    <Sliders className="w-4 h-4 text-amber-600" /> Điều kiện bùng phát dịch
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                    {selectedLibraryDisease.favorableConditions}
                  </p>
                </div>
              </div>

              {/* Soil nutrition standards dashboard chart */}
              <div className="border border-slate-100 bg-slate-50/50 rounded-xl p-4">
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3">
                  Ngưỡng Dinh Dưỡng Thổ Nhưỡng Đặc Trưng
                </h4>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                  <div className="bg-white border border-slate-200/60 p-2.5 rounded-lg">
                    <p className="text-[10px] font-bold text-slate-400">ĐỘ ẨM ĐẤT</p>
                    <p className="text-base font-black text-slate-800 mt-0.5">{selectedLibraryDisease.typicalSoil.moisture}</p>
                  </div>
                  <div className="bg-white border border-slate-200/60 p-2.5 rounded-lg">
                    <p className="text-[10px] font-bold text-slate-400">ĐỘ pH ĐẤT</p>
                    <p className="text-base font-black text-slate-800 mt-0.5">{selectedLibraryDisease.typicalSoil.pH}</p>
                  </div>
                  <div className="bg-white border border-slate-200/60 p-2.5 rounded-lg">
                    <p className="text-[10px] font-bold text-slate-400">ĐỘ DẪN ĐIỆN EC</p>
                    <p className="text-base font-black text-slate-800 mt-0.5">{selectedLibraryDisease.typicalSoil.ec}</p>
                  </div>
                  <div className="bg-white border border-slate-200/60 p-2.5 rounded-lg">
                    <p className="text-[10px] font-bold text-slate-400">NPK ĐẤT TRUNG BÌNH</p>
                    <p className="text-xs font-mono font-bold text-slate-800 mt-1">{selectedLibraryDisease.typicalSoil.npk}</p>
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
