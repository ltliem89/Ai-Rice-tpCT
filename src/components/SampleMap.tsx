import React, { useEffect, useRef, useState, useMemo } from "react";
import L from "leaflet";
import { 
  MapPin, 
  Database, 
  Compass, 
  RefreshCw, 
  Layers, 
  Droplet, 
  Sprout, 
  Star, 
  Search, 
  Building2, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  Radio, 
  Tag, 
  Filter,
  Info
} from "lucide-react";

// Types for New Administrative Boundary Structure
export interface AdministrativeLocation {
  id: string;
  name: string;
  district: string; // District/County
  newWardName: string; // New merged ward/commune name
  formerWards: string[]; // Merged former wards
  resolutionNote: string; // Official resolution
  pucCode: string; // Plant Unit Code (Mã số vùng trồng)
  coordinates: [number, number];
  sampleCount: number;
  activeSensorsCount: number;
  soilType: string;
  riceVarieties: string[];
  commonDiseases: string[];
  areaKm2: number;
  isNewlyMerged: boolean;
  description: string;
  boundaryRadiusMeter: number; // For map boundary visual circle
}

const NEW_ADMIN_LOCATIONS: AdministrativeLocation[] = [
  {
    id: "thoi_binh_moi",
    name: "Trạm Giám sát Nông nghiệp Phường Thới Bình",
    district: "Quận Ninh Kiều",
    newWardName: "Phường Thới Bình (Sáp nhập mới)",
    formerWards: ["An Cư", "An Nghiệp", "An Phú", "Thới Bình (cũ)"],
    resolutionNote: "NQ 1192/NQ-UBTVQH15 - Sắp xếp ĐVHC cấp xã TP Cần Thơ",
    pucCode: "VN-CTO-NK-001",
    coordinates: [10.0385, 105.7812],
    sampleCount: 245,
    activeSensorsCount: 4,
    soilType: "Đất phù sa ngọt trung tâm đô thị",
    riceVarieties: ["OM 5451", "Jasmine 85"],
    commonDiseases: ["Sâu cuốn lá nhỏ", "Đạo ôn lá"],
    areaKm2: 1.98,
    isNewlyMerged: true,
    description: "Khu vực sáp nhập 4 phường trung tâm Ninh Kiều thành Phường Thới Bình mới. Tập trung mô hình nông nghiệp đô thị & trạm nghiên cứu thực nghiệm học sinh.",
    boundaryRadiusMeter: 1200
  },
  {
    id: "tan_an_moi",
    name: "Cánh đồng Thực nghiệm Phường Tân An",
    district: "Quận Ninh Kiều",
    newWardName: "Phường Tân An (Sáp nhập mới)",
    formerWards: ["An Hòa", "An Lạc", "Tân An (cũ)"],
    resolutionNote: "NQ 1192/NQ-UBTVQH15 - Sắp xếp ĐVHC TP Cần Thơ",
    pucCode: "VN-CTO-NK-002",
    coordinates: [10.0312, 105.7865],
    sampleCount: 198,
    activeSensorsCount: 3,
    soilType: "Đất phù sa ven sông Hậu",
    riceVarieties: ["ST25", "Đài Thơm 8"],
    commonDiseases: ["Đốm vằn", "Sâu đục thân"],
    areaKm2: 1.56,
    isNewlyMerged: true,
    description: "Địa giới hành chính mới quy hoạch khu nông nghiệp công nghệ cao kết hợp du lịch sinh thái ven bờ sông Cần Thơ.",
    boundaryRadiusMeter: 1100
  },
  {
    id: "binh_thuy_moi",
    name: "Hợp tác xã Lúa sạch Bình Thủy",
    district: "Quận Bình Thủy",
    newWardName: "Phường Bình Thủy (Mới)",
    formerWards: ["Bình Thủy", "Bồi đắp ven Sông Hậu"],
    resolutionNote: "Quy hoạch ĐVHC nông nghiệp đô thị Bình Thủy 2024-2030",
    pucCode: "VN-CTO-BT-005",
    coordinates: [10.0761, 105.7275],
    sampleCount: 185,
    activeSensorsCount: 5,
    soilType: "Đất phù sa bồi hàng năm (độ phì cao)",
    riceVarieties: ["Jasmine 85", "IR 50404"],
    commonDiseases: ["Cháy bìa lá (Bạc lá)", "Rầy nâu"],
    areaKm2: 4.12,
    isNewlyMerged: false,
    description: "Vùng trũng thấp phù sa màu mỡ ven sông Hậu. Đã trang bị hệ thống trạm quan trắc mực nước & cảm biến phèn tự động.",
    boundaryRadiusMeter: 1800
  },
  {
    id: "ba_lang_cai_rang",
    name: "Vùng lúa Thâm canh Phường Ba Láng",
    district: "Quận Cái Răng",
    newWardName: "Phường Ba Láng (Địa giới mới)",
    formerWards: ["Ba Láng", "Thường Thạnh"],
    resolutionNote: "Sắp xếp mở rộng không gian canh tác lúa thông minh Cái Răng",
    pucCode: "VN-CTO-CR-008",
    coordinates: [10.0028, 105.7486],
    sampleCount: 210,
    activeSensorsCount: 6,
    soilType: "Đất phù sa trung tính pH 6.0",
    riceVarieties: ["OM 18", "Đài Thơm 8"],
    commonDiseases: ["Đốm vằn (Khô vằn)", "Sâu cuốn lá"],
    areaKm2: 5.80,
    isNewlyMerged: true,
    description: "Vùng nông nghiệp công nghệ cao trọng điểm Quận Cái Răng, đạt tiêu chuẩn VietGAP xuất khẩu sang Châu Âu.",
    boundaryRadiusMeter: 2000
  },
  {
    id: "phuoc_thoi_o_mon",
    name: "Cánh đồng Viện Lúa ĐBSCL - Phường Phước Thới",
    district: "Quận Ô Môn",
    newWardName: "Phường Phước Thới",
    formerWards: ["Phước Thới", "Khu Viện Lúa"],
    resolutionNote: "Quy hoạch ĐVHC trung tâm nghiên cứu giống lúa Quốc gia",
    pucCode: "VN-CTO-OM-001",
    coordinates: [10.1264, 105.6264],
    sampleCount: 320,
    activeSensorsCount: 8,
    soilType: "Đất phù sa điển hình đồng bằng",
    riceVarieties: ["OM 5451", "OM 18", "OM 380", "OM 4900"],
    commonDiseases: ["Bệnh Tungro", "Đạo ôn cổ bông", "Sâu đục thân"],
    areaKm2: 8.45,
    isNewlyMerged: false,
    description: "Cánh đồng thực nghiệm quy mô lớn nhất kết nối Viện Lúa ĐBSCL. Nơi thu thập tập dữ liệu mẫu bệnh lúa phong phú nhất miền Tây.",
    boundaryRadiusMeter: 2500
  },
  {
    id: "tan_loc_thot_not",
    name: "Vùng Chuyên canh Cù lao Tân Lộc",
    district: "Quận Thốt Nốt",
    newWardName: "Phường Tân Lộc (Đảo Sông Hậu)",
    formerWards: ["Tân Lộc"],
    resolutionNote: "Đơn vị hành chính sinh thái sông Hậu Thốt Nốt",
    pucCode: "VN-CTO-TN-012",
    coordinates: [10.2741, 105.5263],
    sampleCount: 275,
    activeSensorsCount: 5,
    soilType: "Đất phù sa cổ giàu mùn hữu cơ",
    riceVarieties: ["Đài Thơm 8", "OM 5451"],
    commonDiseases: ["Đạo ôn lá", "Sọc vi khuẩn"],
    areaKm2: 12.30,
    isNewlyMerged: false,
    description: "Cù lao ngọt quanh năm trên sông Hậu. Vùng lúa thương phẩm nổi tiếng với hơn 15 lò sấy và nhà máy chế biến lúa gạo hiện đại.",
    boundaryRadiusMeter: 2800
  },
  {
    id: "thanh_xuan_phong_dien",
    name: "Trạm Thực địa Thạnh Xuân (Phong Điền)",
    district: "Huyện Phong Điền",
    newWardName: "Xã Thạnh Xuân (Sáp nhập mới)",
    formerWards: ["Thạnh Xuân", "Nhơn Nghĩa"],
    resolutionNote: "NQ 1192/NQ-UBTVQH15 - Sắp xếp xã nông thôn mới Phong Điền",
    pucCode: "VN-CTO-PD-003",
    coordinates: [10.0150, 105.6350],
    sampleCount: 230,
    activeSensorsCount: 7,
    soilType: "Đất phù sa pha phèn nhẹ (pH 5.2)",
    riceVarieties: ["OM 5451", "Jasmine 85"],
    commonDiseases: ["Ngộ độc hữu cơ", "Đốm vằn"],
    areaKm2: 6.90,
    isNewlyMerged: true,
    description: "Địa bàn chạy thử nghiệm thành công bộ cảm biến đất 7-trong-1 kết hợp AI Fusion đầu tiên cùng hộ nông dân Chú Vinh.",
    boundaryRadiusMeter: 2200
  },
  {
    id: "thoi_hung_co_do",
    name: "Nông trường Cơ giới hóa Cờ Đỏ",
    district: "Huyện Cờ Đỏ",
    newWardName: "Xã Thới Hưng (Cánh đồng Mẫu lớn)",
    formerWards: ["Thới Hưng", "Nông trường Cờ Đỏ"],
    resolutionNote: "Đơn vị hành chính nông nghiệp công nghệ cao Cờ Đỏ",
    pucCode: "VN-CTO-CD-009",
    coordinates: [10.1344, 105.4281],
    sampleCount: 290,
    activeSensorsCount: 10,
    soilType: "Đất phù sa bãi bồi sông Cần Thơ",
    riceVarieties: ["Đài Thơm 8", "OM 18", "ST25"],
    commonDiseases: ["Rầy nâu hại lúa", "Đạo ôn lá"],
    areaKm2: 15.60,
    isNewlyMerged: false,
    description: "Cánh đồng mẫu lớn 1.000 ha ứng dụng máy bay không người lái (Drone) sạ hàng & rải phân thông minh.",
    boundaryRadiusMeter: 3200
  },
  {
    id: "dinh_mon_thoi_lai",
    name: "Ruộng Mô hình Công nghệ Thới Lai",
    district: "Huyện Thới Lai",
    newWardName: "Xã Định Môn (Cải tạo ĐVHC mới)",
    formerWards: ["Định Môn", "Trường Thành"],
    resolutionNote: "Sắp xếp không gian phát triển nông nghiệp Thới Lai",
    pucCode: "VN-CTO-TL-004",
    coordinates: [10.1111, 105.5397],
    sampleCount: 215,
    activeSensorsCount: 4,
    soilType: "Đất sét phù sa nặng giữ nước tốt",
    riceVarieties: ["OM 5451", "IR 50404"],
    commonDiseases: ["Khô vằn", "Sâu đục thân"],
    areaKm2: 7.20,
    isNewlyMerged: true,
    description: "Đất thịt nặng phì nhiêu. Nông dân áp dụng bộ công cụ AI-RICE dự đoán thiếu hụt NPK qua cảm biến đất.",
    boundaryRadiusMeter: 2100
  },
  {
    id: "thanh_loc_vinh_thanh",
    name: "Cánh đồng Cải tạo Phèn Vĩnh Thạnh",
    district: "Huyện Vĩnh Thạnh",
    newWardName: "Xã Thạnh Lộc (Mới)",
    formerWards: ["Thạnh Lộc", "Thị trấn Vĩnh Thạnh"],
    resolutionNote: "NQ 1192/NQ-UBTVQH15 - Quy hoạch vùng chống phèn mặn Vĩnh Thạnh",
    pucCode: "VN-CTO-VT-007",
    coordinates: [10.2223, 105.3719],
    sampleCount: 180,
    activeSensorsCount: 6,
    soilType: "Đất phèn hoạt tính (pH 4.5 - 5.0)",
    riceVarieties: ["OM 18", "OM 380 (Chịu phèn)"],
    commonDiseases: ["Ngộ độc phèn/hữu cơ", "Bạc lá"],
    areaKm2: 11.40,
    isNewlyMerged: true,
    description: "Đất nhiễm phèn đặc trưng vùng Tây Bắc Cần Thơ. Cảm biến pH & EC giúp cảnh báo tháo chua rửa phèn kịp thời.",
    boundaryRadiusMeter: 2600
  },
  {
    id: "him_lam_chau_thanh",
    name: "Địa bàn Liên kết PTDTNT Him Lam",
    district: "Huyện Châu Thành (Giáp ranh)",
    newWardName: "Xã Đông Phước (Giáp ranh Cần Thơ)",
    formerWards: ["Đông Phước", "Khu vực Trường Him Lam"],
    resolutionNote: "Đơn vị liên kết vùng nông nghiệp học đường Him Lam",
    pucCode: "VN-CTO-HL-010",
    coordinates: [9.9450, 105.7320],
    sampleCount: 160,
    activeSensorsCount: 4,
    soilType: "Đất phù sa phù hợp canh tác lúa-màu",
    riceVarieties: ["OM 18", "Đài Thơm 8"],
    commonDiseases: ["Sâu cuốn lá", "Đạo ôn cổ bông"],
    areaKm2: 4.80,
    isNewlyMerged: false,
    description: "Cánh đồng thực địa xung quanh Trường PTDTNT THCS Him Lam, nơi nhóm học sinh trực tiếp thu thập dữ liệu & hỗ trợ bà con.",
    boundaryRadiusMeter: 1700
  }
];

type MapViewMode = "admin" | "puc" | "iot";

export const SampleMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const circlesRef = useRef<{ [key: string]: L.Circle }>({});

  const [selectedLocation, setSelectedLocation] = useState<AdministrativeLocation>(NEW_ADMIN_LOCATIONS[0]);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistrictFilter, setSelectedDistrictFilter] = useState<string>("all");
  const [onlyNewlyMerged, setOnlyNewlyMerged] = useState<boolean>(false);
  const [mapViewMode, setMapViewMode] = useState<MapViewMode>("admin");

  // Get unique districts for filter dropdown/chips
  const districtsList = useMemo(() => {
    const list = Array.from(new Set(NEW_ADMIN_LOCATIONS.map(loc => loc.district)));
    return ["all", ...list];
  }, []);

  // Filtered Locations
  const filteredLocations = useMemo(() => {
    return NEW_ADMIN_LOCATIONS.filter(loc => {
      const matchesSearch = 
        loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.newWardName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.pucCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.formerWards.some(w => w.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDistrict = selectedDistrictFilter === "all" || loc.district === selectedDistrictFilter;
      const matchesMerged = !onlyNewlyMerged || loc.isNewlyMerged;

      return matchesSearch && matchesDistrict && matchesMerged;
    });
  }, [searchQuery, selectedDistrictFilter, onlyNewlyMerged]);

  // Dynamically load Leaflet stylesheet if not present
  useEffect(() => {
    const stylesheetId = "leaflet-css-cdn";
    if (!document.getElementById(stylesheetId)) {
      const link = document.createElement("link");
      link.id = stylesheetId;
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }
  }, []);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Standard Leaflet marker shadow/icon fix
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
    });

    // Create Map
    if (!mapRef.current) {
      const canThoCenter: [number, number] = [10.10, 105.60]; // Best center to view full Cần Thơ administrative boundaries
      const map = L.map(mapContainerRef.current, {
        center: canThoCenter,
        zoom: 10,
        scrollWheelZoom: true,
        zoomControl: true
      });

      // OpenStreetMap Tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &bull; Địa giới Cần Thơ NQ 1192'
      }).addTo(map);

      mapRef.current = map;
      setMapLoaded(true);

      // Add boundary circles & markers
      NEW_ADMIN_LOCATIONS.forEach((loc) => {
        // Boundary circle overlay representing administrative boundary radius
        const circle = L.circle(loc.coordinates, {
          color: loc.isNewlyMerged ? "#059669" : "#2563eb",
          fillColor: loc.isNewlyMerged ? "#10b981" : "#3b82f6",
          fillOpacity: 0.12,
          weight: loc.isNewlyMerged ? 2 : 1.5,
          dashArray: loc.isNewlyMerged ? "4, 6" : undefined,
          radius: loc.boundaryRadiusMeter
        }).addTo(map);

        circlesRef.current[loc.id] = circle;

        // Custom div icon with dynamic view mode badge
        const isMerged = loc.isNewlyMerged;
        const markerIcon = L.divIcon({
          className: "custom-admin-icon",
          html: `
            <div class="relative flex items-center justify-center">
              ${isMerged ? '<span class="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full animate-ping"></span>' : ''}
              <div class="px-2 py-1 rounded-lg ${isMerged ? 'bg-emerald-900 border-2 border-emerald-400 text-emerald-200' : 'bg-slate-900 border-2 border-slate-300 text-white'} shadow-xl flex items-center gap-1 font-bold text-[10px] transform hover:scale-115 transition-transform">
                <span>${isMerged ? '✨' : '📍'}</span>
                <span>${loc.district.replace('Quận ', 'Q.').replace('Huyện ', 'H.')}</span>
              </div>
            </div>
          `,
          iconSize: [80, 28],
          iconAnchor: [40, 14]
        });

        const marker = L.marker(loc.coordinates, { icon: markerIcon })
          .addTo(map)
          .on("click", () => {
            setSelectedLocation(loc);
          });

        const popupContent = `
          <div style="font-family: sans-serif; padding: 6px; max-width: 230px;">
            <div style="display: inline-block; background-color: ${isMerged ? '#ecfdf5' : '#f1f5f9'}; border: 1px solid ${isMerged ? '#a7f3d0' : '#cbd5e1'}; color: ${isMerged ? '#047857' : '#334155'}; font-size: 9px; font-weight: bold; padding: 2px 6px; border-radius: 4px; text-transform: uppercase;">
              ${loc.newWardName}
            </div>
            <strong style="display: block; color: #0f172a; font-size: 13px; margin-top: 4px;">${loc.name}</strong>
            <div style="font-size: 10px; color: #64748b; margin-top: 2px;">
              📜 ${loc.resolutionNote}
            </div>
            <div style="margin-top: 6px; font-weight: bold; font-size: 11px; color: #059669; display: flex; justify-between: space-between;">
              <span>🏷️ Mã PUC: ${loc.pucCode}</span>
            </div>
            <div style="font-size: 10px; color: #334155; margin-top: 4px; background-color: #f8fafc; padding: 4px; border-radius: 4px;">
              📸 <strong>${loc.sampleCount}</strong> Mẫu ảnh bệnh &bull; 📡 <strong>${loc.activeSensorsCount}</strong> Trạm IoT
            </div>
          </div>
        `;
        marker.bindPopup(popupContent);
        markersRef.current[loc.id] = marker;
      });
    }

    // Unmount cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update Map layers or circle styling when mapViewMode changes
  useEffect(() => {
    if (!mapRef.current) return;
    
    NEW_ADMIN_LOCATIONS.forEach((loc) => {
      const circle = circlesRef.current[loc.id];
      if (circle) {
        if (mapViewMode === "admin") {
          circle.setStyle({
            color: loc.isNewlyMerged ? "#059669" : "#2563eb",
            fillColor: loc.isNewlyMerged ? "#10b981" : "#3b82f6",
            fillOpacity: 0.12
          });
        } else if (mapViewMode === "puc") {
          circle.setStyle({
            color: "#d97706",
            fillColor: "#f59e0b",
            fillOpacity: 0.16
          });
        } else if (mapViewMode === "iot") {
          circle.setStyle({
            color: "#9333ea",
            fillColor: "#a855f7",
            fillOpacity: 0.15
          });
        }
      }
    });
  }, [mapViewMode]);

  // Handle flying/centering to selected location
  const handleSelectLocation = (loc: AdministrativeLocation) => {
    setSelectedLocation(loc);
    if (mapRef.current) {
      mapRef.current.flyTo(loc.coordinates, 12, {
        animate: true,
        duration: 1.2
      });

      const marker = markersRef.current[loc.id];
      if (marker) {
        setTimeout(() => {
          marker.openPopup();
        }, 1200);
      }
    }
  };

  const totalSamples = NEW_ADMIN_LOCATIONS.reduce((sum, item) => sum + item.sampleCount, 0);
  const totalSensors = NEW_ADMIN_LOCATIONS.reduce((sum, item) => sum + item.activeSensorsCount, 0);
  const mergedCount = NEW_ADMIN_LOCATIONS.filter(item => item.isNewlyMerged).length;
  const totalAreaKm2 = NEW_ADMIN_LOCATIONS.reduce((sum, item) => sum + item.areaKm2, 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col" id="panel-sample-map">
      
      {/* HEADER BAR: Official Administrative Boundary Banner */}
      <div className="p-4 bg-emerald-950 text-white border-b border-emerald-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <Compass className="w-5 h-5 text-emerald-400 shrink-0" />
            <h2 className="font-black text-base uppercase tracking-wider text-white">
              Bản Đồ Địa Giới Hành Chính Mới Cần Thơ &amp; Vùng Phù Sa ĐBSCL
            </h2>
            <span className="bg-emerald-800/90 text-emerald-200 border border-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Building2 className="w-3 h-3 text-emerald-400" />
              NQ 1192/NQ-UBTVQH15
            </span>
          </div>
          <p className="text-xs text-emerald-200/80 leading-relaxed">
            Hệ thống phân định địa giới các Phường/Xã mới sáp nhập, tích hợp mã số vùng trồng (PUC) và thống kê diện tích nông nghiệp quy hoạch.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-emerald-900/80 border border-emerald-800 p-1 rounded-xl text-xs font-bold gap-1 shrink-0 shadow-inner">
          <button
            onClick={() => setMapViewMode("admin")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              mapViewMode === "admin"
                ? "bg-emerald-500 text-white shadow-sm"
                : "text-emerald-200 hover:text-white"
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Địa Giới Mới</span>
          </button>

          <button
            onClick={() => setMapViewMode("puc")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              mapViewMode === "puc"
                ? "bg-amber-500 text-white shadow-sm"
                : "text-emerald-200 hover:text-white"
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Mã Vùng Trồng (PUC)</span>
          </button>

          <button
            onClick={() => setMapViewMode("iot")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              mapViewMode === "iot"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-emerald-200 hover:text-white"
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Trạm Cảm Biến IoT</span>
          </button>
        </div>
      </div>

      {/* STATS OVERVIEW BAR WITH KM2 AGRICULTURAL AREA */}
      <div className="bg-slate-900 text-slate-200 px-4 py-2.5 border-b border-slate-800 grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Sprout className="w-4 h-4 text-emerald-400 shrink-0" />
          <div>
            <span className="text-[10px] text-emerald-400 font-bold block">Tổng Diện Tích Nông Nghiệp</span>
            <strong className="text-white font-mono text-sm">{totalAreaKm2.toFixed(2)} km²</strong>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-emerald-400 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-400 block">Tổng Mẫu Bệnh AI</span>
            <strong className="text-white font-mono">{totalSamples} ảnh thực địa</strong>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-purple-400 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-400 block">Trạm IoT Hoạt Động</span>
            <strong className="text-white font-mono">{totalSensors} trạm đo 7-in-1</strong>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-amber-400 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-400 block">ĐVHC Sáp Nhập Mới</span>
            <strong className="text-amber-300 font-mono">{mergedCount} / {NEW_ADMIN_LOCATIONS.length} phường/xã</strong>
          </div>
        </div>

        <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
          <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-400 block">Chuẩn Xuất Khẩu</span>
            <strong className="text-blue-300 font-mono">100% cấp mã PUC</strong>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT GRID: Left Sidebar + Map Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
        
        {/* LEFT COLUMN: Sidebar & Search Filters */}
        <div className="lg:col-span-4 border-r border-slate-200/80 flex flex-col max-h-[620px] bg-slate-50/50">
          
          {/* Search & Filter Bar */}
          <div className="p-3 border-b border-slate-200/80 space-y-2 bg-white">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Tìm phường/xã mới, quận/huyện, mã PUC..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
              />
            </div>

            {/* Filter Chips for Districts */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-[11px]">
              {districtsList.map((dist) => {
                const isActive = selectedDistrictFilter === dist;
                const label = dist === "all" ? "Tất cả địa bàn" : dist.replace("Quận ", "Q.").replace("Huyện ", "H.");
                return (
                  <button
                    key={dist}
                    onClick={() => setSelectedDistrictFilter(dist)}
                    className={`px-2 py-0.5 rounded-lg font-bold shrink-0 transition-all cursor-pointer border ${
                      isActive
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-3xs"
                        : "bg-slate-100 hover:bg-slate-200/70 text-slate-600 border-slate-200"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Checkbox for Newly Merged filter */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-1.5 text-xs text-slate-600 font-medium cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyNewlyMerged}
                  onChange={(e) => setOnlyNewlyMerged(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5 cursor-pointer"
                />
                <span>Chỉ hiện đơn vị sáp nhập mới (NQ 1192)</span>
              </label>

              <span className="text-[10px] font-bold text-slate-400">
                {filteredLocations.length} địa bàn
              </span>
            </div>

          </div>

          {/* Scrollable list of administrative locations */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
            {filteredLocations.length === 0 ? (
              <div className="p-6 text-center text-slate-400 text-xs">
                Không tìm thấy địa giới hành chính khớp với từ khóa tìm kiếm.
              </div>
            ) : (
              filteredLocations.map((loc) => {
                const isSelected = selectedLocation.id === loc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => handleSelectLocation(loc)}
                    className={`w-full text-left p-2.5 rounded-xl transition-all cursor-pointer border flex items-start gap-2.5 ${
                      isSelected
                        ? "bg-white border-emerald-500 shadow-sm ring-2 ring-emerald-500/20"
                        : "bg-white/80 hover:bg-white border-slate-200/80 hover:border-slate-300"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${
                      isSelected 
                        ? "bg-emerald-600 text-white" 
                        : loc.isNewlyMerged 
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300" 
                          : "bg-slate-100 text-slate-700"
                    }`}>
                      {loc.isNewlyMerged ? "✨" : "📍"}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-1">
                        <h4 className={`text-xs font-bold truncate ${isSelected ? "text-emerald-950" : "text-slate-800"}`}>
                          {loc.newWardName}
                        </h4>
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0">
                          {loc.district}
                        </span>
                      </div>

                      <p className="text-[10px] text-slate-500 truncate mt-0.5 font-medium">
                        {loc.name}
                      </p>

                      <div className="flex items-center gap-1.5 mt-1 text-[9px] flex-wrap">
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200/60">
                          Mã PUC: {loc.pucCode}
                        </span>
                        <span className="text-blue-700 font-bold bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200/60 flex items-center gap-0.5">
                          <Sprout className="w-2.5 h-2.5" />
                          {loc.areaKm2} km²
                        </span>
                        <span className="text-slate-400">
                          {loc.sampleCount} mẫu
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Leaflet Map & Detailed Administrative Info Card */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-slate-50 relative min-h-[420px] lg:min-h-[620px]">
          
          {/* Leaflet Map Div */}
          <div className="flex-1 relative overflow-hidden" style={{ minHeight: "380px" }}>
            <div ref={mapContainerRef} className="absolute inset-0 z-10 w-full h-full" />
            
            {!mapLoaded && (
              <div className="absolute inset-0 bg-slate-100 z-20 flex flex-col items-center justify-center gap-3">
                <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin" />
                <span className="text-xs font-bold text-slate-500">
                  Đang tải Bản đồ Địa giới Hành chính mới TP Cần Thơ...
                </span>
              </div>
            )}

            {/* Map Legend Overlay */}
            <div className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-md border border-slate-200 p-2.5 rounded-xl shadow-md text-[10px] space-y-1">
              <div className="font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Info className="w-3 h-3 text-emerald-600" /> Chú giải bản đồ
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-emerald-700"></span>
                <span>Đơn vị sáp nhập mới (NQ 1192)</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 border border-blue-700"></span>
                <span>Đơn vị hành chính nguyên trạng</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <span className="w-3 h-0.5 bg-emerald-500 border-b border-dashed border-emerald-600"></span>
                <span>Bán kính địa giới tự nhiên</span>
              </div>
            </div>
          </div>

          {/* SELECTED LOCATION DETAIL CARD */}
          <div className="bg-white border-t border-slate-200/80 p-4 z-20 relative shadow-lg">
            
            {/* Top Bar of Card */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-slate-100 pb-2 mb-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] uppercase font-black text-emerald-800 bg-emerald-100/80 border border-emerald-200 px-2 py-0.5 rounded-md">
                    {selectedLocation.district} &bull; {selectedLocation.newWardName}
                  </span>
                  
                  {selectedLocation.isNewlyMerged ? (
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-md flex items-center gap-1">
                      ✨ Đã hoàn tất Sáp nhập Administrative Unit
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                      Địa giới nguyên trạng
                    </span>
                  )}

                  <span className="text-[10px] font-mono text-slate-400">
                    [{selectedLocation.coordinates[0].toFixed(4)}, {selectedLocation.coordinates[1].toFixed(4)}]
                  </span>
                </div>

                <h3 className="font-black text-base text-slate-900 mt-1 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                  {selectedLocation.name}
                </h3>
              </div>

              {/* Plant Unit Code (PUC) Stamp */}
              <div className="flex items-center gap-2 shrink-0 bg-slate-50 p-2 rounded-xl border border-slate-200/80">
                <Tag className="w-4 h-4 text-amber-600" />
                <div>
                  <span className="text-[9px] text-slate-400 font-bold block uppercase">Mã Vùng Trồng Xuất Khẩu (PUC)</span>
                  <strong className="text-xs font-mono font-black text-slate-800">{selectedLocation.pucCode}</strong>
                </div>
              </div>
            </div>

            {/* Former Wards Merged Row */}
            <div className="mb-3 bg-slate-50 p-2 rounded-xl border border-slate-200/60 flex items-center gap-2 text-xs">
              <FileText className="w-4 h-4 text-slate-500 shrink-0" />
              <div className="flex-1 flex items-center gap-1.5 overflow-x-auto text-[11px]">
                <span className="font-bold text-slate-600 shrink-0">Các phường/xã sáp nhập thành địa giới mới:</span>
                <div className="flex items-center gap-1">
                  {selectedLocation.formerWards.map((fw, idx) => (
                    <span key={idx} className="bg-white border border-slate-200 px-2 py-0.5 rounded text-[10px] font-bold text-slate-700 shadow-3xs shrink-0">
                      {fw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              
              {/* Soil & Area */}
              <div className="bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-200/80">
                <div className="flex items-center justify-between text-slate-600 mb-1 font-bold">
                  <span className="flex items-center gap-1.5 text-emerald-800">
                    <Droplet className="w-3.5 h-3.5 text-emerald-600" /> Thổ Nhưỡng &amp; Quy Hoạch
                  </span>
                  <span className="bg-emerald-600 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                    🌾 {selectedLocation.areaKm2} km²
                  </span>
                </div>
                <p className="font-bold text-slate-800 text-[11px]">{selectedLocation.soilType}</p>
                <div className="mt-1.5 pt-1 border-t border-emerald-200/60 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Diện tích quy hoạch nông nghiệp:</span>
                  <strong className="text-emerald-900 font-mono font-bold">{selectedLocation.areaKm2} km² ({((selectedLocation.areaKm2 / totalAreaKm2) * 100).toFixed(1)}% toàn vùng)</strong>
                </div>
              </div>

              {/* Rice Varieties */}
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                <div className="flex items-center gap-1.5 text-slate-500 mb-1 font-bold">
                  <Sprout className="w-3.5 h-3.5 text-emerald-500" /> Giống lúa gieo trồng chính
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedLocation.riceVarieties.map((v, i) => (
                    <span key={i} className="bg-emerald-100/80 text-emerald-900 border border-emerald-200 text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                      {v}
                    </span>
                  ))}
                </div>
              </div>

              {/* Diseases & Sensors */}
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                <div className="flex items-center justify-between text-slate-500 mb-1 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-amber-500" /> Dịch hại &amp; Trạm IoT
                  </span>
                  <span className="text-[10px] text-purple-700 bg-purple-50 px-1.5 py-0.2 rounded font-mono font-bold">
                    {selectedLocation.activeSensorsCount} Trạm IoT
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedLocation.commonDiseases.map((d, i) => (
                    <span key={i} className="bg-amber-100/80 text-amber-900 border border-amber-200 text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Description & Resolution Footer */}
            <div className="mt-2 text-[11px] text-slate-600 bg-emerald-50/60 border border-emerald-100 p-2 rounded-xl flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="leading-relaxed text-slate-700">
                  {selectedLocation.description}
                </p>
                <span className="text-[9.5px] font-mono text-emerald-800 font-bold block mt-0.5">
                  Văn bản căn cứ: {selectedLocation.resolutionNote}
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
