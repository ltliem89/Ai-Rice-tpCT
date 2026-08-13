import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { MapPin, Database, HelpCircle, Compass, RefreshCw, Layers, Droplet, Sprout, Star } from "lucide-react";

// Types
interface CollectionLocation {
  id: string;
  name: string;
  district: string;
  coordinates: [number, number];
  sampleCount: number;
  soilType: string;
  riceVarieties: string[];
  commonDiseases: string[];
  description: string;
}

const CAN_THO_LOCATIONS: CollectionLocation[] = [
  {
    id: "ninh_kieu",
    name: "Cánh đồng Thực nghiệm Ninh Kiều",
    district: "Quận Ninh Kiều",
    coordinates: [10.0333, 105.7833],
    sampleCount: 210,
    soilType: "Đất phù sa ngọt (không bị phèn)",
    riceVarieties: ["OM 5451", "Jasmine 85"],
    commonDiseases: ["Sâu cuốn lá", "Đạo ôn lá"],
    description: "Khu vực trung tâm đô thị, đất đai trù phú, chủ yếu phục vụ nghiên cứu thực nghiệm quy mô gia đình."
  },
  {
    id: "cai_rang",
    name: "Vùng lúa Thâm canh Cái Răng",
    district: "Quận Cái Răng",
    coordinates: [10.0028, 105.7486],
    sampleCount: 185,
    soilType: "Đất phù sa trung tính",
    riceVarieties: ["OM 18", "Đài Thơm 8"],
    commonDiseases: ["Đốm vằn (Khô vằn)", "Sâu cuốn lá"],
    description: "Nông dân áp dụng kỹ thuật thâm canh cao, mật độ sạ trung bình 90kg/ha."
  },
  {
    id: "binh_thuy",
    name: "Hợp tác xã Lúa sạch Bình Thủy",
    district: "Quận Bình Thủy",
    coordinates: [10.0761, 105.7275],
    sampleCount: 150,
    soilType: "Đất phù sa có bồi đắp hàng năm",
    riceVarieties: ["Jasmine 85", "IR 50404"],
    commonDiseases: ["Bạc lá (Cháy bìa lá)", "Rầy nâu"],
    description: "Vùng trũng thấp ven sông, đất có độ phì nhiêu tốt nhưng ẩm độ cao dế bùng dịch."
  },
  {
    id: "o_mon",
    name: "Cánh đồng Viện Lúa ĐBSCL - Ô Môn",
    district: "Quận Ô Môn",
    coordinates: [10.1264, 105.6264],
    sampleCount: 220,
    soilType: "Đất phù sa điển hình",
    riceVarieties: ["OM 5451", "OM 18", "OM 380"],
    commonDiseases: ["Tungro", "Sâu đục thân"],
    description: "Khu vực hợp tác thu thập ảnh gần Viện lúa ĐBSCL, giống lúa thuần chủng chất lượng cao."
  },
  {
    id: "thot_not",
    name: "Khu vực Chuyên canh Thốt Nốt",
    district: "Quận Thốt Nốt",
    coordinates: [10.2741, 105.5263],
    sampleCount: 250,
    soilType: "Đất phù sa cổ giàu mùn",
    riceVarieties: ["Đài Thơm 8", "OM 5451"],
    commonDiseases: ["Đạo ôn cổ bông", "Sọc vi khuẩn"],
    description: "Vùng lúa thương phẩm lớn nhất, tập trung nhiều lò sấy và nhà máy xay xát hạt lúa."
  },
  {
    id: "phong_dien",
    name: "Mô hình Xen canh Phong Điền",
    district: "Huyện Phong Điền",
    coordinates: [9.9934, 105.6669],
    sampleCount: 190,
    soilType: "Đất vườn phù sa pha cát nhẹ",
    riceVarieties: ["Jasmine 85", "OM 18"],
    commonDiseases: ["Châu chấu hại lúa", "Ngộ độc hữu cơ"],
    description: "Khu vực canh tác sinh thái kết hợp du lịch vườn cây ăn trái, lúa thơm hữu cơ sạch."
  },
  {
    id: "thoi_lai",
    name: "Ruộng trình diễn công nghệ Thới Lai",
    district: "Huyện Thới Lai",
    coordinates: [10.1111, 105.5397],
    sampleCount: 215,
    soilType: "Đất sét phù sa nặng",
    riceVarieties: ["OM 5451", "IR 50404"],
    commonDiseases: ["Khô vằn", "Sâu đục thân"],
    description: "Đất thịt nặng giữ nước tốt, thích nghi các dòng lúa chịu thâm canh phân bón trung bình."
  },
  {
    id: "co_do",
    name: "Nông trường Cơ giới hóa Cờ Đỏ",
    district: "Huyện Cờ Đỏ",
    coordinates: [10.1344, 105.4281],
    sampleCount: 240,
    soilType: "Đất phù sa sông lớn",
    riceVarieties: ["Đài Thơm 8", "OM 18", "OM 5451"],
    commonDiseases: ["Rầy nâu hại lúa", "Đạo ôn lá"],
    description: "Cánh đồng mẫu lớn áp dụng sạ hàng, bón phân thông minh bằng thiết bị bay không người lái."
  },
  {
    id: "vinh_thanh",
    name: "Cánh đồng Đất phèn Vĩnh Thạnh",
    district: "Huyện Vĩnh Thạnh",
    coordinates: [10.2223, 105.3719],
    sampleCount: 170,
    soilType: "Đất phèn nhẹ (pH 4.8 - 5.2)",
    riceVarieties: ["OM 18", "OM 380 (chịu phèn)"],
    commonDiseases: ["Ngộ độc hữu cơ", "Bạc lá"],
    description: "Đất nhiễm phèn đặc trưng, hệ thống đo chất đất đóng vai trò cốt lõi để cảnh báo hạ phèn kịp thời."
  },
  {
    id: "thanh_xuan",
    name: "Trạm thực địa Thạnh Xuân - Phong Điền",
    district: "Huyện Phong Điền",
    coordinates: [10.0150, 105.6350],
    sampleCount: 180,
    soilType: "Đất phù sa pha phèn",
    riceVarieties: ["OM 5451", "Jasmine 85"],
    commonDiseases: ["Ngộ độc hữu cơ", "Đốm vằn"],
    description: "Nơi thực địa của Chú Vinh, địa bàn chạy thử nghiệm thành công bộ cảm biến đất kết hợp AI Fusion đầu tiên."
  },
  {
    id: "chau_thanh",
    name: "Ruộng thực địa Him Lam - Châu Thành",
    district: "Huyện Châu Thành (Giáp ranh)",
    coordinates: [9.9450, 105.7320],
    sampleCount: 111,
    soilType: "Đất phù sa trung bình",
    riceVarieties: ["OM 18", "Đài Thơm 8"],
    commonDiseases: ["Sâu cuốn lá", "Đạo ôn cổ bông"],
    description: "Các hộ nông dân liên kết xung quanh trường PTDTNT Him Lam, là nơi học sinh lấy mẫu thuận tiện nhất."
  }
];

export const SampleMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const [selectedLocation, setSelectedLocation] = useState<CollectionLocation>(CAN_THO_LOCATIONS[0]);
  const [mapLoaded, setMapLoaded] = useState(false);

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
      const canThoCenter: [number, number] = [10.08, 105.65]; // Best center to view Cần Thơ city scale
      const map = L.map(mapContainerRef.current, {
        center: canThoCenter,
        zoom: 10,
        scrollWheelZoom: true,
        zoomControl: true
      });

      // OpenStreetMap Tiles (DeLorme/Slick emerald friendly or standard)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      mapRef.current = map;
      setMapLoaded(true);

      // Add markers
      CAN_THO_LOCATIONS.forEach((loc) => {
        const markerIcon = L.divIcon({
          className: "custom-div-icon",
          html: `<div class="w-8 h-8 rounded-full bg-emerald-600 border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-[10px] transform hover:scale-110 transition-transform">
                  ${loc.sampleCount}
                 </div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        const marker = L.marker(loc.coordinates, { icon: markerIcon })
          .addTo(map)
          .on("click", () => {
            setSelectedLocation(loc);
          });

        const popupContent = `
          <div style="font-family: sans-serif; padding: 4px;">
            <strong style="color: #064e3b; font-size: 13px;">${loc.name}</strong><br/>
            <span style="color: #475569; font-size: 11px;">${loc.district}</span><br/>
            <div style="margin-top: 6px; font-weight: bold; font-size: 11px; color: #16a34a;">
              📸 Số lượng mẫu: ${loc.sampleCount} ảnh thực tế
            </div>
            <div style="font-size: 10px; color: #64748b; margin-top: 4px;">
              🌾 Giống chủ yếu: ${loc.riceVarieties.join(", ")}
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

  // Handle flying/centering to selected location
  const handleSelectLocation = (loc: CollectionLocation) => {
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

  const totalSamples = CAN_THO_LOCATIONS.reduce((sum, item) => sum + item.sampleCount, 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden grid grid-cols-1 lg:grid-cols-12" id="panel-sample-map">
      
      {/* LEFT COLUMN: Sidebar & Stats */}
      <div className="lg:col-span-4 border-r border-slate-100 flex flex-col justify-between max-h-[600px]">
        <div className="p-4 border-b border-slate-100 bg-emerald-950 text-white">
          <div className="flex items-center gap-2 mb-1">
            <Compass className="w-5 h-5 text-emerald-400 shrink-0" />
            <h3 className="font-black text-sm uppercase tracking-wider">Hệ thống Thực địa Cần Thơ</h3>
          </div>
          <p className="text-xs text-emerald-200/80 leading-relaxed">
            Phân bố địa lý của tập dữ liệu thực nghiệm phục vụ huấn luyện AI nhận dạng bệnh lúa.
          </p>

          {/* Stats Badges */}
          <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
            <div className="bg-emerald-900/60 p-2 rounded-xl border border-emerald-800 flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="block font-black text-base text-white">{totalSamples}</span>
                <span className="text-[9px] text-emerald-300">Tổng Mẫu Ảnh</span>
              </div>
            </div>
            <div className="bg-emerald-900/60 p-2 rounded-xl border border-emerald-800 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="block font-black text-base text-white">{CAN_THO_LOCATIONS.length}</span>
                <span className="text-[9px] text-emerald-300">Vùng Thực Địa</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable list of locations */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 bg-slate-50/50">
          <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2 py-1">Danh Sách Quận / Huyện</span>
          {CAN_THO_LOCATIONS.map((loc) => {
            const isSelected = selectedLocation.id === loc.id;
            return (
              <button
                key={loc.id}
                onClick={() => handleSelectLocation(loc)}
                className={`w-full text-left p-2.5 rounded-xl transition-all cursor-pointer border flex items-start gap-2.5 ${
                  isSelected
                    ? "bg-white border-emerald-500 shadow-sm ring-1 ring-emerald-500/20"
                    : "bg-transparent border-transparent hover:bg-slate-200/50"
                }`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  isSelected ? "bg-emerald-600 text-white" : "bg-slate-200/80 text-slate-600"
                }`}>
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-1">
                    <h4 className={`text-xs font-bold truncate ${isSelected ? "text-emerald-950" : "text-slate-700"}`}>
                      {loc.district}
                    </h4>
                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full shrink-0 ${
                      isSelected ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-600"
                    }`}>
                      {loc.sampleCount} mẫu
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">{loc.name}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* RIGHT COLUMN: The Map view & Selected Location card details */}
      <div className="lg:col-span-8 flex flex-col justify-between bg-slate-50 relative min-h-[400px] lg:min-h-[550px]">
        
        {/* Leaflet Map Div */}
        <div className="flex-1 relative overflow-hidden" style={{ minHeight: "350px" }}>
          <div ref={mapContainerRef} className="absolute inset-0 z-10 w-full h-full" />
          
          {!mapLoaded && (
            <div className="absolute inset-0 bg-slate-100 z-20 flex flex-col items-center justify-center gap-3">
              <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin" />
              <span className="text-xs font-bold text-slate-500">Đang tải Bản đồ Địa lý Cần Thơ...</span>
            </div>
          )}
        </div>

        {/* Selected Point Details Panel overlayed or pinned at the bottom */}
        <div className="bg-white border-t border-slate-200/80 p-4 z-20 relative">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-slate-100 pb-2 mb-2">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {selectedLocation.district}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  [{selectedLocation.coordinates[0].toFixed(4)}, {selectedLocation.coordinates[1].toFixed(4)}]
                </span>
              </div>
              <h4 className="font-black text-sm text-slate-800 mt-1">{selectedLocation.name}</h4>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-slate-500">Đóng góp dữ liệu:</span>
              <strong className="text-sm text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg">
                {selectedLocation.sampleCount} Mẫu Ảnh thực tế
              </strong>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-500 mb-1 font-semibold">
                <Droplet className="w-3.5 h-3.5 text-blue-500" /> Thổ nhưỡng đặc trưng
              </div>
              <p className="font-bold text-slate-700">{selectedLocation.soilType}</p>
            </div>
            
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-500 mb-1 font-semibold">
                <Sprout className="w-3.5 h-3.5 text-emerald-500" /> Giống lúa gieo trồng chính
              </div>
              <div className="flex flex-wrap gap-1">
                {selectedLocation.riceVarieties.map((v, i) => (
                  <span key={i} className="bg-emerald-100/60 text-emerald-800 text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                    {v}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-500 mb-1 font-semibold">
                <Star className="w-3.5 h-3.5 text-amber-500" /> Bệnh hại thường gặp nhất
              </div>
              <div className="flex flex-wrap gap-1">
                {selectedLocation.commonDiseases.map((d, i) => (
                  <span key={i} className="bg-amber-100/70 text-amber-800 text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 mt-2 leading-relaxed bg-slate-50 p-2 rounded-lg border border-slate-100 italic">
            &ldquo;{selectedLocation.description}&rdquo;
          </p>
        </div>

      </div>

    </div>
  );
};
