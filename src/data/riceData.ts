import {
  DiseaseItem,
  ExperimentalRecord,
  PrototypeStage,
  PresentationSlide,
  BusinessCostItem,
  AdminUser
} from "../types";

export const RICE_DISEASES: DiseaseItem[] = [
  {
    id: "dao_on",
    name: "Bệnh Đạo Ôn",
    englishName: "Rice Blast",
    scientificName: "Pyricularia oryzae / Magnaporthe oryzae",
    category: "Bệnh do nấm",
    symptoms: [
      "Vết bệnh hình mắt én (hình thoi) có tâm màu xám trắng, viền sẫm màu.",
      "Xuất hiện các đốm nhỏ màu sẫm trên phiến lá, cổ bông, cuống hạt.",
      "Làm khô cháy phiến lá, gãy gục cổ bông làm bông lúa bị lép hạt."
    ],
    favorableConditions: "Sương mù nhiều, thời tiết mát (20-28°C), ẩm độ cao (>90%), bón dư thừa phân Đạm (N).",
    typicalSoil: {
      moisture: "93%",
      pH: "5.2 (Chua nhẹ)",
      npk: "N: 97 mg/kg | P: 39 mg/kg | K: 74 mg/kg",
      ec: "0.42 mS/cm"
    },
    treatment: [
      "Ngừng ngay việc bón phân đạm (N) và chất kích thích sinh trưởng.",
      "Phun thuốc đặc trị có hoạt chất Tricyclazole, Isoprothiolane hoặc Fenoxanil.",
      "Giữ mực nước nông trên ruộng để làm mát gốc và hạ bớt độc chất."
    ],
    preventiveMeasures: [
      "Bón phân cân đối N-P-K, hạn chế bón thừa Đạm giai đoạn lúa đẻ nhánh và làm đòng.",
      "Sử dụng giống lúa kháng bệnh đạo ôn phù hợp với địa phương."
    ],
    sampleImage: "https://images.unsplash.com/photo-1595131838595-3154b9f4450b?auto=format&fit=crop&w=600&q=80",
    experimentalPhotoCount: 370
  },
  {
    id: "dom_van",
    name: "Bệnh Đốm Vằn (Khô Vằn)",
    englishName: "Sheath Blight",
    scientificName: "Rhizoctonia solani",
    category: "Bệnh do nấm",
    symptoms: [
      "Vết bệnh dạng đốm vằn vèo như da hổ hoặc đốm mây màu xám xanh.",
      "Bắt đầu xuất hiện từ bẹ lá gần mặt nước rồi lan dần lên các lá phía trên.",
      "Làm khô bẹ lá, cây lúa dễ bị ngã rụi khi gặp gió lớn."
    ],
    favorableConditions: "Nhiệt độ ấm (28-32°C), độ ẩm cao (>85%), sạ dày, ruộng rậm rạp.",
    typicalSoil: {
      moisture: "87%",
      pH: "5.7",
      npk: "N: 85 mg/kg | P: 40 mg/kg | K: 77 mg/kg",
      ec: "0.55 mS/cm"
    },
    treatment: [
      "Rút bớt nước ruộng cho thông thoáng chân rạ.",
      "Phun thuốc chữa nấm chứa Hexaconazole, Validamycin hoặc Azoxystrobin + Difenoconazole.",
      "Dọn sạch tàn dư thực vật bị nhiễm bệnh."
    ],
    preventiveMeasures: [
      "Sạ hàng hoặc gieo thưa với mật độ chuẩn 80-100 kg/ha.",
      "Vệ sinh bờ ruộng, phát quang bụi rậm để giảm ẩm độ gầm lá."
    ],
    sampleImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80",
    experimentalPhotoCount: 274
  },
  {
    id: "bac_la",
    name: "Bệnh Bạc Lá (Cháy Bìa Lá)",
    englishName: "Bacterial Leaf Blight",
    scientificName: "Xanthomonas oryzae pv. oryzae",
    category: "Bệnh do vi khuẩn",
    symptoms: [
      "Vết bệnh xuất hiện từ chóp lá hoặc mép lá thành dải màu vàng cam rồi trắng xám.",
      "Ranh giới giữa mép lá bị bệnh và phần lành có đường lượn sóng.",
      "Buổi sáng sớm có những giọt dịch vi khuẩn màu vàng đục trên vết bệnh."
    ],
    favorableConditions: "Mưa bão, gió lớn gây rách lá, thời tiết nóng ẩm (28-34°C).",
    typicalSoil: {
      moisture: "88%",
      pH: "5.6",
      npk: "N: 82 mg/kg | P: 38 mg/kg | K: 71 mg/kg",
      ec: "0.58 mS/cm"
    },
    treatment: [
      "Tắt quạt/ngừng tưới tràn, ngưng hoàn toàn phân Đạm.",
      "Phun thuốc kháng sinh vi khuẩn gốc Bismerthiazol, Oxolinic acid hoặc Đồng hydroxide.",
      "Bón thêm Kali (K) để tăng độ dày vách tế bào lá."
    ],
    preventiveMeasures: [
      "Chủ động phòng trừ trước và sau các đợt bão hoặc mưa dầm.",
      "Không bón muộn đạm lai rai."
    ],
    sampleImage: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=600&q=80",
    experimentalPhotoCount: 284
  },
  {
    id: "sau_cuon_la",
    name: "Sâu Cuốn Lá",
    englishName: "Rice Leaf Folder",
    scientificName: "Cnaphalocrocis medinalis",
    category: "Sâu hại / Côn trùng",
    symptoms: [
      "Sâu nhả tơ cuốn 2 mép lá lại thành ống dẹp.",
      "Sâu nằm bên trong nhai ăn phần thịt lá màu xanh, để lại biểu bì màu trắng dọc lá.",
      "Làm giảm khả năng quang hợp nghiêm trọng của bộ lá đòng."
    ],
    favorableConditions: "Lúa thời kỳ đẻ nhánh rộ đến làm đòng, bón đạm nhiều làm lá lúa xanh mướt, mềm rủ.",
    typicalSoil: {
      moisture: "78%",
      pH: "5.8",
      npk: "N: 93 mg/kg | P: 45 mg/kg | K: 81 mg/kg",
      ec: "0.49 mS/cm"
    },
    treatment: [
      "Kiểm tra mật độ sâu (nếu >20 con/m2 giai đoạn đòng thì phun).",
      "Phun thuốc trừ sâu sinh học hoặc hóa học gốc Chlorantraniliprole, Emamectin benzoate, Indoxacarb.",
      "Phun lúc tuổi sâu còn nhỏ (tuổi 1-2, sâu mới nhả tơ)."
    ],
    preventiveMeasures: [
      "Nói không với phun ngừa tràn lan để bảo vệ thiên địch (nhện, bọ rùa).",
      "Bón phân NPK cân đối."
    ],
    sampleImage: "https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?auto=format&fit=crop&w=600&q=80",
    experimentalPhotoCount: 242
  },
  {
    id: "sau_an_la",
    name: "Sâu Ăn Lá (Sâu Gai / Sâu Khấu)",
    englishName: "Rice Armyworm / Leaf Caterpillar",
    scientificName: "Spodoptera litura / Dicladispa armigera",
    category: "Sâu hại / Côn trùng",
    symptoms: [
      "Mép lá lúa bị cắn khuyết nham nhở hoặc bị cắn đứt ngang phiến lá.",
      "Xuất hiện phân sâu màu đen rải rác dưới gốc lúa.",
      "Mật độ cao có thể ăn trụi cả cánh đồng lúa."
    ],
    favorableConditions: "Nắng mưa thất thường, thời tiết nóng (30-33°C).",
    typicalSoil: {
      moisture: "75%",
      pH: "5.9",
      npk: "N: 91 mg/kg | P: 44 mg/kg | K: 79 mg/kg",
      ec: "0.46 mS/cm"
    },
    treatment: [
      "Tháo nước ngâm dâng cao để ép sâu bò lên ngọn lúa rồi phun dòn.",
      "Sử dụng hoạt chất Bacillus thuringiensis (BT) hoặc Spinetoram, Lufenuron."
    ],
    preventiveMeasures: [
      "Bảo vệ bọ xít song gai và các loài kiến vương thiên địch."
    ],
    sampleImage: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80",
    experimentalPhotoCount: 174
  },
  {
    id: "ngo_doc_huu_co",
    name: "Ngộ Độc Hữu Cơ",
    englishName: "Organic Acid Toxicity / Root Rot",
    scientificName: "Abiotic Toxicity",
    category: "Sinh lý / Môi trường",
    symptoms: [
      "Lúa bị ngưng phát triển, lá chuyển màu vàng xám từ chóp xuống.",
      "Rễ lúa bị thối đen, có mùi hôi chua nồng, rễ không còn lông hút trắng.",
      "Cây lúa nhổ lên rất dễ rụng rễ, không đẻ nhánh."
    ],
    favorableConditions: "Vùi rơm rạ tươi vội vã rồi ngâm nước liền, đất thiếu khí, pH đất quá thấp (<5.0).",
    typicalSoil: {
      moisture: "91%",
      pH: "4.8 (Chua nặng)",
      npk: "N: 52 mg/kg | P: 28 mg/kg | K: 49 mg/kg",
      ec: "0.71 mS/cm"
    },
    treatment: [
      "Tháo cạn nước ruộng ngay lập tức để xả độc khí (H2S, CH4).",
      "Bón vôi bột (CaCO3) hoặc Phân bón lá giàu Canxi-Bo, Lân nung chảy.",
      "Phun thuốc kích rễ chứa Humic / Fulvic acid khi rễ bắt đầu nhú đầu trắng mới."
    ],
    preventiveMeasures: [
      "Sử dụng nấm Trichoderma phân hủy rơm rạ trước khi làm đất 10-15 ngày."
    ],
    sampleImage: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=600&q=80",
    experimentalPhotoCount: 148
  },
  {
    id: "lun_co",
    name: "Bệnh Lùn Cỏ",
    englishName: "Rice Grassy Stunt Virus",
    scientificName: "Rice Grassy Stunt Virus (RGSV)",
    category: "Bệnh do virus",
    symptoms: [
      "Cây lúa bị lùn nặng, đẻ rất nhiều nhánh nhỏ mọc xoè rộng như bụi cỏ.",
      "Lá lúa ngắn, hẹp, màu xanh vàng hoặc xám nhạt, có đốm nâu rải rác.",
      "Cây bị bệnh không trỗ bông được hoặc trỗ bông lép hoàn toàn."
    ],
    favorableConditions: "Có mật độ Rầy Nâu (Nilaparvata lugens) truyền bệnh cao trên đồng ruộng.",
    typicalSoil: {
      moisture: "82%",
      pH: "5.5",
      npk: "N: 75 mg/kg | P: 36 mg/kg | K: 65 mg/kg",
      ec: "0.52 mS/cm"
    },
    treatment: [
      "Không có thuốc trị virus. Cần nhổ bỏ và tiêu hủy bụi lúa bị bệnh.",
      "Tập trung phun trừ Rầy Nâu triệt để để chặn nguồn môi giới lây lan."
    ],
    preventiveMeasures: [
      "Thực hiện lịch gieo sạ né rầy theo khuyến cáo của Chi cục Trồng trọt & BVTV."
    ],
    sampleImage: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80",
    experimentalPhotoCount: 138
  },
  {
    id: "sau_duc_than",
    name: "Sâu Đục Thân",
    englishName: "Rice Stem Borer",
    scientificName: "Scirpophaga incertulas",
    category: "Sâu hại / Côn trùng",
    symptoms: [
      "Giai đoạn đẻ nhánh: sâu cắn đứt gốc mầm làm héo dọt lá non (dọt héo).",
      "Giai đoạn trỗ: sâu đục bẹ vào thân cắn đứt mạch dẫn làm bông lúa bị bạc trắng hoàn toàn (bông bạc).",
      "Thân lúa có lỗ đục nhỏ và dính phân sâu dạng mùn cưa."
    ],
    favorableConditions: "Bướm rộ ra đồng lứa 1 và lứa 2, lúa giai đoạn sắp trỗ.",
    typicalSoil: {
      moisture: "76%",
      pH: "5.8",
      npk: "N: 87 mg/kg | P: 42 mg/kg | K: 78 mg/kg",
      ec: "0.47 mS/cm"
    },
    treatment: [
      "Theo dõi ngắt ổ trứng bướm trên lá lúa.",
      "Phun thuốc rải gốc hoặc phun xịt bẹ lá chứa Cartap, Chlorantraniliprole, Fipronil khi bướm rộ 3-5 ngày."
    ],
    preventiveMeasures: [
      "Cày ải phơi dầm xới lật gốc rạ sau thu hoạch để tiêu diệt nhộng."
    ],
    sampleImage: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19657?auto=format&fit=crop&w=600&q=80",
    experimentalPhotoCount: 126
  },
  {
    id: "chau_chau",
    name: "Tổn Thương Do Châu Chấu",
    englishName: "Grasshopper Damage",
    scientificName: "Oxya chinensis",
    category: "Sâu hại / Côn trùng",
    symptoms: [
      "Lá lúa bị cắn thủng từng lỗ lớn rải rác hoặc khuyết mép hình dợn sóng.",
      "Quan sát thấy côn trùng nhảy rộn rã khi đi qua rãnh ruộng."
    ],
    favorableConditions: "Mùa khô, bờ cỏ ven ruộng dại rậm rạp.",
    typicalSoil: {
      moisture: "70%",
      pH: "5.8",
      npk: "N: 88 mg/kg | P: 41 mg/kg | K: 76 mg/kg",
      ec: "0.45 mS/cm"
    },
    treatment: [
      "Phát quang bờ dại ven ruộng.",
      "Phun xịt xua đuổi bằng tinh dầu neem hoặc thuốc trừ sâu tiếp xúc."
    ],
    preventiveMeasures: [
      "Vệ sinh cỏ bờ quanh vùng canh tác."
    ],
    sampleImage: "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=600&q=80",
    experimentalPhotoCount: 116
  },
  {
    id: "soc_vi_khuan",
    name: "Sọc Vi Khuẩn Trên Lá",
    englishName: "Bacterial Leaf Streak",
    scientificName: "Xanthomonas oryzae pv. oryzicola",
    category: "Bệnh do vi khuẩn",
    symptoms: [
      "Các dải sọc ngắn hẹp màu nâu ngả vàng chạy dọc giữa các gân lá.",
      "Khi soi trước ánh sáng thấy vệt bệnh mờ trong suốt hẹp theo gân lá.",
      "Lá lúa bị cháy khô từng mảng lớn màu nâu xám."
    ],
    favorableConditions: "Thời tiết giông bão, gió giật ma sát làm tổn thương lá lúa.",
    typicalSoil: {
      moisture: "85%",
      pH: "5.6",
      npk: "N: 80 mg/kg | P: 37 mg/kg | K: 69 mg/kg",
      ec: "0.59 mS/cm"
    },
    treatment: [
      "Phun thuốc trị vi khuẩn gốc Kasugamycin, Bronopol hoặc Streptomycin.",
      "Không tưới tràn từ ruộng bị bệnh sang ruộng lành."
    ],
    preventiveMeasures: [
      "Thoát nước kịp thời sau mưa bão."
    ],
    sampleImage: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80",
    experimentalPhotoCount: 98
  },
  {
    id: "tungro",
    name: "Bệnh Tungro",
    englishName: "Rice Tungro Virus",
    scientificName: "Rice Tungro Bacilliform Virus (RTBV)",
    category: "Bệnh do virus",
    symptoms: [
      "Lá lúa biến đổi màu từ xanh sang vàng cam hay da cam từ chóp lá lan xuống.",
      "Cây lúa bị lùn nhẹ, đẻ nhánh kém, rễ còi cọc.",
      "Bông lúa nhỏ, trỗ không thoát và hạt lép có đốm nâu."
    ],
    favorableConditions: "Rầy xanh đuôi đen (Nephotettix virescens) phát triển mạnh.",
    typicalSoil: {
      moisture: "80%",
      pH: "5.4",
      npk: "N: 71 mg/kg | P: 34 mg/kg | K: 63 mg/kg",
      ec: "0.50 mS/cm"
    },
    treatment: [
      "Tập trung nhổ bỏ cây bệnh nặng.",
      "Phun thuốc diệt rầy xanh môi giới lây lan."
    ],
    preventiveMeasures: [
      "Sử dụng giống lúa kháng rầy xanh."
    ],
    sampleImage: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=600&q=80",
    experimentalPhotoCount: 30
  }
];

export const EXPERIMENTAL_DATA: ExperimentalRecord[] = RICE_DISEASES.map((d) => ({
  diseaseName: d.name,
  photoCount: d.experimentalPhotoCount,
  n: parseInt(d.typicalSoil.npk.split("|")[0].replace(/[^\d]/g, "")) || 80,
  p: parseInt(d.typicalSoil.npk.split("|")[1].replace(/[^\d]/g, "")) || 38,
  k: parseInt(d.typicalSoil.npk.split("|")[2].replace(/[^\d]/g, "")) || 70,
  pH: parseFloat(d.typicalSoil.pH) || 5.6,
  ec: parseFloat(d.typicalSoil.ec) || 0.5,
  temp: parseFloat(d.favorableConditions.match(/\d+-\d+°C/)?.[0] || "29") || 29,
  moisture: parseInt(d.typicalSoil.moisture) || 82
}));

export const PROTOTYPE_STAGES: PrototypeStage[] = [
  {
    id: "stage_1",
    period: "07/09/2025 - 19/11/2025",
    title: "Mẫu Thử Ban Đầu (Giai Đoạn 1)",
    description: "Xây dựng mô hình Cánh tay Robot xoay tự động quét ảnh ngoài đồng kết hợp giao diện cảm biến độc lập.",
    designConcept: "Thiết kế cơ khí cánh tay robot tích hợp cụm cảm biến & camera xoay 360 độ.",
    advantages: [
      "Tự động hóa hoàn toàn thao tác đưa camera quét quanh khóm lúa.",
      "Chụp ảnh phân tích và hiển thị thông số đất lên giao diện máy tính."
    ],
    limitations: [
      "Bán kính quét cố định, diện tích khảo sát quá nhỏ so với đồng ruộng rộng lớn.",
      "Chất lượng ảnh phụ thuộc nhiều vào điều kiện rung lắc gió ngoài trời.",
      "Chi phí cơ khí robot đắt đỏ, khó nhân rộng cho nông dân."
    ],
    imageBg: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80",
    features: ["Cánh tay robot cơ khí", "Camera quét xoay", "Giao diện cảm biến máy tính"]
  },
  {
    id: "stage_2",
    period: "21/11/2025 - 18/12/2025",
    title: "Mẫu Thử Thứ Hai (Giai Đoạn 2)",
    description: "Chuyển hướng sang Giao diện Web Di Động cho phép nông dân trực tiếp chụp ảnh lá lúa bằng Điện thoại thông minh.",
    designConcept: "Giao diện Web AI Rice Camera + Trình duyệt Web di động + Server xử lý ảnh trung tâm.",
    advantages: [
      "Nhẹ nhàng, tiện lợi, nông dân chỉ cần cầm smartphone chụp ảnh trực tiếp ngoài ruộng.",
      "Không cần cài đặt app phức tạp, chạy mượt trên mọi hệ điều hành.",
      "Xuất sắc ĐẠT GIẢI NHÌ Cuộc thi Sáng tạo Khoa học Kỹ thuật cấp Thành phố!"
    ],
    limitations: [
      "Nhận diện thuần túy dựa vào hình ảnh lá nên dễ nhầm lẫn giữa vết bệnh và hiện tượng thiếu hụt dinh dưỡng (như thiếu Kali/Lân).",
      "Chưa tích hợp dữ liệu cảm biến đất theo thời gian thực."
    ],
    achievements: "Đạt GIẢI NHÌ Cuộc Thi Khoa Học Kỹ Thuật Cấp Thành Phố Cần Thơ năm 2025!",
    imageBg: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
    features: ["Giao diện Web Di Động", "Server AI YOLOv8", "Nhật ký lịch sử chụp bệnh"]
  },
  {
    id: "stage_3",
    period: "01/05/2026 - Hiện Tại",
    title: "Sản Phẩm Hiện Tại (Giai Đoạn 3 hoàn thiện)",
    description: "Hệ thống Kết hợp AI Camera + Trụ Cảm Biến Đất 7-in-1 + AI Fusion Đa Nguồn Khuyến Cáo.",
    designConcept: "Bộ trụ cảm biến tripod cắm đất đồng bộ không dây ESP32-S3 với ứng dụng Web AI Rice.",
    advantages: [
      "Hợp nhất dữ liệu ảnh lá lúa + 7 chỉ số đất (N, P, K, pH, EC, Nhiệt độ, Độ ẩm).",
      "AI Fusion đánh giá toàn diện tình trạng sức khỏe cây lúa, loại trừ nhầm lẫn.",
      "Đưa ra gợi ý phân bón và thuốc điều trị chính xác tuyệt đối theo tình trạng thực tế.",
      "Màn hình TFT 1.8 inch tại hộp cảm biến hiển thị trực tiếp chỉ số ngay trên ruộng."
    ],
    limitations: [
      "Đang tiếp tục mở rộng thêm cơ sở dữ liệu bệnh và tính năng trợ lý giọng nói AI trong tương lai."
    ],
    achievements: "Giải pháp tối ưu sẵn sàng thương mại hóa và ứng dụng rộng rãi tại các Hợp Tác Xã ĐBSCL!",
    imageBg: "https://images.unsplash.com/photo-1595131838595-3154b9f4450b?auto=format&fit=crop&w=600&q=80",
    features: ["Tích hợp Cảm biến 7 in 1", "Màn hình TFT 1.8 inch", "AI Fusion Đa Nguồn", "Trụ Tripod linh hoạt"]
  }
];

export const PRESENTATION_SLIDES: PresentationSlide[] = [
  {
    id: 1,
    title: "HỆ THỐNG KẾT HỢP AI NHẬN DẠNG BỆNH LÚA VÀ PHÂN TÍCH ĐẤT TRỒNG THEO THỜI GIAN THỰC TRÊN WEB DI ĐỘNG",
    subtitle: "Dự án Super Rice / AI Rice - Cuộc thi Sáng Tạo Thanh Thiếu Niên Nhi Đồng TP. Cần Thơ",
    category: "Tổng quan",
    summaryText: "Trình bày tổng quan về giải pháp công nghệ tích hợp AI và IoT đột phá dành cho ngành trồng lúa Việt Nam.",
    speakerScript: "Kính chào Ban Giám Khảo! Em xin đại diện nhóm tác giả trường PTDTNT THCS Him Lam trình bày dự án 'Hệ thống kết hợp AI nhận dạng bệnh lúa và phân tích đất trồng theo thời gian thực trên Web di động'.",
    bulletPoints: [
      "Sản phẩm: SUPER RICE (AI-RICE)",
      "Lĩnh vực: Bảo vệ môi trường, ứng phó biến đổi khí hậu & phát triển kinh tế",
      "Nhóm tác giả: Bảo Ngân, Tường Vy, Giang Ngân, Nhựt Quỳnh (Trường Him Lam, Cần Thơ)",
      "Giáo viên hướng dẫn: Thầy Lê Thanh Liêm"
    ],
    diagramType: "architecture"
  },
  {
    id: 2,
    title: "LÝ DO CHỌN ĐỀ TÀI & VẤN ĐỀ THỰC TẾ",
    category: "Vấn đề & Khảo sát",
    summaryText: "Người trồng lúa đối mặt khó khăn lớn trong chẩn đoán dịch bệnh và theo dõi chất lượng đất ruộng.",
    speakerScript: "Qua khảo sát thực tế tại ruộng lúa Cần Thơ, bà con chủ yếu quan sát bệnh bằng mắt thường. Tuy nhiên, nhiều bệnh có triệu chứng giống hệt hiện tượng thiếu dinh dưỡng, dẫn đến chẩn đoán sai và xịt thuốc lãng phí.",
    bulletPoints: [
      "THỰC TẾ: Sâu bệnh diễn biến phức tạp, rất khó phát hiện sớm.",
      "VẤN ĐỀ: Hai bệnh triệu chứng giống nhau -> Nhầm lẫn bón phân/xịt thuốc.",
      "TRA CỨU INTERNET: Thông tin không chính xác so với đồng ruộng thực tế.",
      "HỎI CHUYÊN GIA: Phụ thuộc thời gian phản hồi, trễ đợt dập dịch.",
      "HẬU QUẢ: Giảm năng suất lúa, tăng chi phí sản xuất, ô nhiễm môi trường."
    ],
    diagramType: "survey"
  },
  {
    id: 3,
    title: "NGHIÊN CỨU TỔNG QUAN & KHOẢNG TRỐNG KHOA HỌC (TLI-YOLO)",
    category: "Nghiên cứu & Khoảng trống",
    summaryText: "Đánh giá các nghiên cứu quốc tế xuất sắc (TLI-YOLO - Li et al. 2025 trên Tạp chí Sensors MDPI).",
    speakerScript: "Nghiên cứu TLI-YOLO đạt độ chính xác 93.1%, mAP 95% nhưng có khoảng trống lớn: Chưa tích hợp chỉ số môi trường đất và chưa hỗ trợ cảnh báo sớm toàn diện.",
    bulletPoints: [
      "Mô hình TLI-YOLO (2025): Độ chính xác 93.1%, mAP 95%, F1-score 90.48%.",
      "KHOẢNG TRỐNG: Chỉ nhận diện hình ảnh thuần túy, chưa có cảm biến theo dõi môi trường đất.",
      "CHƯA HỖ TRỢ: Cảnh báo sớm nguy cơ bùng phát dịch bệnh từ các chỉ số thổ nhưỡng."
    ],
    diagramType: "comparison"
  },
  {
    id: 4,
    title: "NGHIÊN CỨU TỔNG QUAN (Inception V3 & CNN)",
    category: "Nghiên cứu & Khoảng trống",
    summaryText: "Phân tích các mô hình AI trong nước (Trường ĐH Cần Thơ, ĐH Hồng Đức).",
    speakerScript: "Mô hình Inception V3 đạt 97.4% trên 2.500 ảnh nhưng số loại bệnh nhận diện còn ít và chưa khoanh vùng vị trí vết bệnh trên lá.",
    bulletPoints: [
      "Nghiên cứu Inception V3 (ĐH Cần Thơ 2022): Đạt độ chính xác 97.4%.",
      "Khoảng trống 1: Số lượng bệnh lúa nhận diện còn ít (chỉ 4 bệnh phổ biến).",
      "Khoảng trống 2: Chưa tích hợp theo dõi pH, EC, NPK đất để đưa ra khuyến cáo nông nghiệp."
    ],
    diagramType: "comparison"
  },
  {
    id: 5,
    title: "BẢNG KẾT HỢP KHOẢNG TRỐNG GIAO THOA CÁC GIẢI PHÁP",
    category: "Nghiên cứu & Khoảng trống",
    summaryText: "So sánh tổng hợp giữa Plantix, NextFarm AI, CNN+OpenCV và AI-RICE.",
    speakerScript: "Từ việc phân tích khoảng trống giao thoa, nhóm chúng em xác định mục tiêu đột phá: Nhận diện đa dạng 11 loại bệnh lúa và TÍCH HỢP ĐỒNG BỘ chỉ số môi trường đất.",
    bulletPoints: [
      "Plantix: Nhận diện qua ảnh nhưng KHÔNG theo dõi môi trường đất.",
      "NextFarm AI: Chẩn đoán nhanh nhưng CHƯA chuyên sâu cho cây lúa.",
      "CNN + OpenCV: Phát hiện bệnh nhưng CHƯA cập nhật nhiều chủng bệnh.",
      "-> ĐỘT PHÁ CỦA AI-RICE: Nhận diện 11 chủng bệnh + Tích hợp 7 thông số cảm biến đất 7-in-1!"
    ],
    diagramType: "comparison"
  },
  {
    id: 6,
    title: "TÍNH MỚI VÀ TÍNH SÁNG TẠO CỦA SẢN PHẨM AI-RICE",
    category: "Tính mới & Nguyên lý",
    summaryText: "Tích hợp AI nhận diện 11 bệnh lúa với 7 chỉ số cảm biến đất trồng thời gian thực.",
    speakerScript: "Điểm mới nổi bật nhất của AI-RICE là thuật toán hợp nhất AI Fusion: Kết hợp ảnh lá lúa với N, P, K, pH, EC, Nhiệt độ và Độ ẩm đất.",
    bulletPoints: [
      "11 Loại Bệnh & Sâu Hại: Bạc lá, Đạo ôn, Đốm vằn, Lùn cỏ, Tungro, Sọc vi khuẩn, Sâu cuốn lá, Sâu ăn lá, Sâu đục thân, Ngộ độc hữu cơ, Châu chấu.",
      "7 Chỉ số Cảm biến Đất: Độ ẩm, Nhiệt độ, pH, EC, Nitơ (N), Photpho (P), Kali (K).",
      "Nền tảng Web Di Động: Dùng trực tiếp trên điện thoại, không cần cài ứng dụng.",
      "Bộ dữ liệu tự chụp thực địa: Huấn luyện YOLOv8 trên Google Colab & Roboflow AI."
    ],
    diagramType: "architecture"
  },
  {
    id: 7,
    title: "SƠ ĐỒ NGUYÊN LÝ HOẠT ĐỘNG TOÀN DIỆN",
    category: "Tính mới & Nguyên lý",
    summaryText: "Sơ đồ kiến trúc kết nối giữa Smartphone, Cảm biến 7-in-1, ESP32-S3, Máy tính AI Trung tâm và Web UI.",
    speakerScript: "Nguyên lý hoạt động gồm 2 luồng song song: Cảm biến 7 in 1 truyền RS485 qua ESP32-S3 gửi về server; Điện thoại chụp ảnh gửi về AI Server để hợp nhất dữ liệu.",
    bulletPoints: [
      "Cảm biến 7 in 1 -> RS485 -> Mạch chuyển UART -> Vi điều khiển ESP32-S3.",
      "ESP32-S3 đẩy dữ liệu đất qua WiFi/4G lên AI Server.",
      "Smartphone chụp ảnh lá lúa đẩy lên Server xử lý YOLOv8 & Gemini AI Fusion.",
      "Kết quả hiển thị đồng thời lên Web Di Động và Màn hình TFT 1.8 inch tại hộp cảm biến."
    ],
    diagramType: "architecture"
  },
  {
    id: 8,
    title: "MẪU THỬ BẰNG ĐẦU - CÁNH TAY ROBOT (7/9/2025 - 19/11/2025)",
    category: "Mẫu thử phát triển",
    summaryText: "Giai đoạn 1: Thiết kế mô hình Cánh tay Robot xoay quét ảnh tự động.",
    speakerScript: "Mẫu thử đầu tiên nhóm thiết kế cánh tay robot quét ảnh tự động. Mặc dù tự động hóa tốt nhưng diện tích quét quá nhỏ và chi phí cơ khí cao.",
    bulletPoints: [
      "Ưu điểm: Tự động xoay chụp ảnh phân tích.",
      "Nhược điểm: Diện tích quét hẹp, dễ rung lắc theo thời tiết, chi phí cao."
    ],
    diagramType: "prototype"
  },
  {
    id: 9,
    title: "MẪU THỬ THỨ HAI - WEB CAMERA AI (21/11/2025 - 18/12/2025)",
    category: "Mẫu thử phát triển",
    summaryText: "Giai đoạn 2: Phát triển ứng dụng Web AI di động (Đạt Giải Nhì Cuộc Thi KH-KT Cấp Thành Phố).",
    speakerScript: "Nhóm chuyển sang giao diện Web di động cho nông dân chụp trực tiếp. Mẫu thử này xuất sắc đạt Giải Nhì Cuộc thi Khoa học Kỹ thuật Thành phố Cần Thơ!",
    bulletPoints: [
      "Ưu điểm: Tiện lợi, chạy mượt trên mọi điện thoại không cần cài app.",
      "Thành tựu: ĐẠT GIẢI NHÌ CUỘC THI KH-KT CẤP THÀNH PHỐ CẦN THƠ!",
      "Nhược điểm: Chưa phân biệt được giữa bệnh hại và hiện tượng thiếu dinh dưỡng đất."
    ],
    diagramType: "prototype"
  },
  {
    id: 10,
    title: "SẢN PHẨM HIỆN TẠI - KẾT HỢP AI CAMERA & TRỤ CẢM BIẾN (01/5/2026 - HIỆN TẠI)",
    category: "Mẫu thử phát triển",
    summaryText: "Giai đoạn 3: Hoàn thiện sản phẩm trụ cảm biến 7-in-1 kết hợp Web AI Fusion.",
    speakerScript: "Sản phẩm hiện tại đã khắc phục hoàn toàn nhược điểm: Trụ cảm biến tripod cắm đất đồng bộ tức thời với Web AI, đưa ra khuyến cáo chính xác 90-95%.",
    bulletPoints: [
      "Hợp nhất AI Ảnh + Cảm biến đất 7 chỉ số.",
      "Màn hình TFT 1.8 inch xem chỉ số ngay tại ruộng.",
      "Khuyến cáo AI Fusion phân tích chiều sâu sinh học thổ nhưỡng."
    ],
    diagramType: "prototype"
  },
  {
    id: 11,
    title: "CÁCH SỬ DỤNG VẬN HÀNH TRÊN WEB DI ĐỘNG",
    category: "Tính mới & Nguyên lý",
    summaryText: "Quy trình 3 bước sử dụng Web di động nhận diện bệnh lúa trực quan.",
    speakerScript: "Nông dân chỉ cần 3 bước đơn giản: BƯỚC 1 Mở link web di động -> BƯỚC 2 Chụp ảnh lá lúa -> BƯỚC 3 Nhận kết quả tên bệnh và tỷ lệ % tin cậy ngay sau 1-3 giây.",
    bulletPoints: [
      "Bước 1: Mở link hệ thống trên điện thoại.",
      "Bước 2: Đưa camera vào lá lúa và ấn nút Chụp ảnh.",
      "Bước 3: Nhận ngay tên bệnh, độ tin cậy %, khoanh vùng vị trí vết bệnh."
    ],
    diagramType: "architecture"
  },
  {
    id: 12,
    title: "CÁCH SỬ DỤNG BỘ CẢM BIẾN ĐẤT TRỒNG LÚA",
    category: "Tính mới & Nguyên lý",
    summaryText: "Quy trình kết nối và vận hành bộ cảm biến 7-in-1 cắm trực tiếp ngoài ruộng.",
    speakerScript: "Để đo đất, nông dân BƯỚC 4 Cắm chân cảm biến xuống đất ruộng -> BƯỚC 5 Bật công tắc và ấn START. Các chỉ số lập tức hiện trên màn hình TFT và đồng bộ về Web.",
    bulletPoints: [
      "Bước 4: Đặt đầu cảm biến xuống đất ruộng lúa.",
      "Bước 5: Bật công tắc nguồn, ấn nút START để đo và cập nhật dữ liệu.",
      "Hiển thị: T, pH, EC, N, P, K và đồng bộ tức thì lên Web AI Fusion."
    ],
    diagramType: "architecture"
  },
  {
    id: 13,
    title: "THỰC NGHIỆM SẢN PHẨM TRÊN 2.000+ MẪU ẢNH VÀ 11 LOẠI BỆNH",
    category: "Thực nghiệm & So sánh",
    summaryText: "Kết quả thực nghiệm quy mô lớn tại 3 xã (Tân Hòa, Thạnh Hòa, Tân Bình - Cần Thơ).",
    speakerScript: "Nhóm đã tiến hành thử nghiệm trên hơn 2.000 tấm ảnh lúa thực tế ngoài đồng ruộng. Kết hợp đo đạc giá trị trung bình NPK, pH, EC, nhiệt độ và độ ẩm cho từng loại bệnh.",
    bulletPoints: [
      "2.001 Ảnh thực nghiệm thuộc 11 loại bệnh & sâu hại.",
      "3 Địa điểm khảo sát: Xã Tân Hòa, Thạnh Hòa, Tân Bình (TP. Cần Thơ).",
      "Xác định ngưỡng dinh dưỡng đất đặc trưng cho từng loại bệnh hại lúa."
    ],
    diagramType: "dataset"
  },
  {
    id: 14,
    title: "HIỆU QUẢ ỨNG DỤNG SO SÁNH TRƯỚC VÀ SAU KHI DÙNG AI-RICE",
    category: "Thực nghiệm & So sánh",
    summaryText: "Bảng so sánh vượt trội về thời gian, độ chính xác và tính toàn diện.",
    speakerScript: "So với phương pháp thủ công, AI-RICE rút ngắn thời gian xử lý từ vài ngày xuống chỉ còn 1-3 giây/ảnh, nâng độ chính xác lên 90-95%!",
    bulletPoints: [
      "Thời gian xử lý: Vài giờ - vài ngày -> 1-3 GIÂY/ẢNH (mAP50).",
      "Độ chính xác: Dựa vào cảm tính cá nhân -> ĐẠT 90 - 95%.",
      "Số lượng nhận diện: Không xác định -> NHẬN DIỆN RÕ 11 LOẠI.",
      "Theo dõi đất: Mắt thường -> GIÁM SÁT RÕ 7 THÔNG SỐ CẢM BIẾN."
    ],
    diagramType: "comparison"
  },
  {
    id: 15,
    title: "ĐÁNH GIÁ TỰ THỰC ĐỊA & Ý KIẾN BÀ CON NÔNG DÂN",
    category: "Thực nghiệm & So sánh",
    summaryText: "Phản hồi tích cực từ nông dân (Chú Tùng, Chú Vinh, Chú Hoàng - TP. Cần Thơ).",
    speakerScript: "Bà con nông dân tại Cần Thơ sau khi dùng thử đã đánh giá rất cao sự tiện lợi, giúp nông dân yên tâm bảo vệ đồng ruộng.",
    bulletPoints: [
      "Chú Vinh (xã Thạnh Hòa): 'Máy báo chính xác bệnh đạo ôn, tui ngưng bón đạm xịt thuốc đúng liều tiết kiệm hẳn chi phí!'",
      "Chú Hoàng (xã Tân Bình): 'Giao diện web dễ xài, cầm điện thoại bấm cái là biết chỉ số đất liền.'",
      "Chú Tùng (xã Tân Hòa): 'Thiết bị gọn nhẹ, cắm tripod ngoài ruộng rất vững chãi.'"
    ],
    diagramType: "survey_detail"
  },
  {
    id: 16,
    title: "BẢNG GIÁ THÀNH SẢN PHẨM & KẾ HOẠCH KINH DOANH",
    category: "Kế hoạch Kinh doanh",
    summaryText: "Chi phí sản xuất tối ưu và cấu trúc giá bán cực kỳ cạnh tranh.",
    speakerScript: "Về kinh doanh, chi phí sản xuất phần cứng bộ cảm biến có trụ tripod chỉ 1.714.000 VNĐ, giá bán dự kiến 2.056.800 VNĐ, phù hợp với túi tiền của bà con.",
    bulletPoints: [
      "Bộ thiết bị có trụ tripod: Chi phí 1.714.000 VNĐ | Giá bán 2.056.800 VNĐ | Lợi nhuận 342.800 VNĐ.",
      "Bộ thiết bị không trụ: Chi phí 1.487.000 VNĐ | Giá bán 1.784.000 VNĐ | Lợi nhuận 297.000 VNĐ.",
      "Tài khoản Web AI: Chi phí vận hành 57.200 VNĐ/tháng | Giá bán 100.000 VNĐ/tháng.",
      "Combo Trọn gói: Giá bán ưu đãi 2.036.880 VNĐ."
    ],
    diagramType: "business"
  },
  {
    id: 17,
    title: "BUSINESS MODEL CANVAS (MÔ HÌNH KINH DOANH)",
    category: "Kế hoạch Kinh doanh",
    summaryText: "Cấu trúc Đối tác, Hoạt động, Giá trị, Kênh phân phối & Phân khúc khách hàng.",
    speakerScript: "Mô hình kinh doanh hướng đến đối tượng Nông dân, Hợp tác xã nông nghiệp và Trung tâm Khuyến nông.",
    bulletPoints: [
      "Khách hàng mục tiêu: Nông dân trồng lúa, Hợp tác xã, Trang trại, Trung tâm Khuyến nông.",
      "Kênh phân phối: Bán trực tiếp cho HTX, bán qua phần mềm/website.",
      "Giá trị mang lại: Phát hiện bệnh sớm, tiết kiệm phân bón & thuốc BVTV, tăng năng suất."
    ],
    diagramType: "business"
  },
  {
    id: 18,
    title: "GIAO DIỆN QUẢN LÝ HỆ THỐNG & TÀI KHOẢN ADMIN",
    category: "Kế hoạch Kinh doanh",
    summaryText: "Hệ thống cấp Access Key, theo dõi Quota sử dụng và quản lý hạn dùng.",
    speakerScript: "Hệ thống phân quyền Admin chuyên nghiệp: sinh khóa Access Key tự động, quản lý thời hạn sử dụng, theo dõi quota lượt chụp ảnh của từng nông dân.",
    bulletPoints: [
      "Sinh Access Key tự động cho từng tài khoản người dùng.",
      "Quản lý thời hạn dùng (30 ngày, 1 năm) và gia hạn linh hoạt.",
      "Theo dõi số lượng ảnh tải lên (Quota) và khóa/mở tài khoản từ xa."
    ],
    diagramType: "business"
  },
  {
    id: 19,
    title: "NGUYỆN VỌNG VÀ ĐỊNH HƯỚNG PHÁT TRIỂN TRONG TƯƠNG LAI",
    category: "Kế hoạch Kinh doanh",
    summaryText: "Lộ trình mở rộng tính năng AI dự đoán nguy cơ, Trợ lý Giọng nói & Bản đồ AI.",
    speakerScript: "Trong tương lai, nhóm định hướng tích hợp AI dự đoán nguy cơ phát sinh bệnh trước khi có triệu chứng, Trợ lý giọng nói nói tiếng Nam Bộ và Bản đồ giám sát nhiều ruộng lúa.",
    bulletPoints: [
      "2026 - 2027: AI dự đoán nguy cơ bùng phát bệnh sớm trước khi lây lan.",
      "2027 - 2028: Trợ lý AI giọng nói hỏi đáp kỹ thuật canh tác lúa.",
      "2028 - 2029: Bản đồ AI giám sát nhiều đồng ruộng trực quan."
    ],
    diagramType: "prototype"
  },
  {
    id: 20,
    title: "KẾT LUẬN & LỜI CẢM ƠN BAN GIÁM KHẢO",
    subtitle: "Dự án AI-RICE (Super Rice) - Trường PTDTNT THCS Him Lam, Cần Thơ",
    category: "Tổng quan",
    summaryText: "Tóm tắt đóng góp lớn của sản phẩm cho nền Nông Nghiệp Số Việt Nam.",
    speakerScript: "Phần trình bày của nhóm chúng em đến đây xin hết. Trân trọng cảm ơn Ban Giám Khảo đã chú ý theo dõi và lắng nghe! Kính chúc Ban Giám Khảo sức khỏe!",
    bulletPoints: [
      "Hiệu quả Kinh tế: Tiết kiệm thuốc BVTV & phân bón, nâng cao năng suất lúa.",
      "Hiệu quả Xã hội: Thúc đẩy ứng dụng công nghệ số trong nông nghiệp.",
      "Hiệu quả Môi trường: Giảm ô nhiễm nguồn nước và đất trồng.",
      "CẢM ƠN BAN GIÁM KHẢO ĐÃ LẮNG NGHE!"
    ],
    diagramType: "architecture"
  }
];

export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: "usr_1",
    userId: "BaoNgan",
    expiryDate: "2026-12-31",
    quota: "UNLIMITED",
    usedCount: 142,
    status: "active",
    accessKey: "BacBaKey_0FCE",
    userLink: "https://ai.nongnghiepsangtao.io.vn/static/camera.html?user=BaoNgan&key=B34"
  },
  {
    id: "usr_2",
    userId: "GiangNgan",
    expiryDate: "2026-07-06",
    quota: 100,
    usedCount: 28,
    status: "active",
    accessKey: "GiangNganKey_E1",
    userLink: "https://ai.nongnghiepsangtao.io.vn/static/camera.html?user=GiangNgan&key=E1"
  },
  {
    id: "usr_3",
    userId: "ChuVinh_ThanhHoa",
    expiryDate: "2026-09-30",
    quota: 200,
    usedCount: 65,
    status: "active",
    accessKey: "VinhKey_99F",
    userLink: "https://ai.nongnghiepsangtao.io.vn/static/camera.html?user=ChuVinh&key=99F"
  },
  {
    id: "usr_4",
    userId: "ChuHoang_TanBinh",
    expiryDate: "2026-10-15",
    quota: 200,
    usedCount: 41,
    status: "active",
    accessKey: "HoangKey_77C",
    userLink: "https://ai.nongnghiepsangtao.io.vn/static/camera.html?user=ChuHoang&key=77C"
  }
];

export const BUSINESS_COST_ITEMS: BusinessCostItem[] = [
  {
    item: "Bộ thiết bị cảm biến & phân tích dinh dưỡng đất (có trụ tripod)",
    costUnit: 1714000,
    priceUnit: 2056800,
    profitUnit: 342800,
    notes: "Bao gồm ESP32-S3, Cảm biến 7 in 1, Pin lithium, Mạch sạc, Màn TFT 1.8, Chân tripod"
  },
  {
    item: "Bộ thiết bị cảm biến & phân tích dinh dưỡng đất (không trụ)",
    costUnit: 1487000,
    priceUnit: 1784000,
    profitUnit: 297000,
    notes: "Không bao gồm chân đỡ Tripod, dùng cầm tay cắm cọc tại chỗ"
  },
  {
    item: "Tài khoản Web AI (Gói dịch vụ phân tích & cảnh báo 1 tháng)",
    costUnit: 57200,
    priceUnit: 100000,
    profitUnit: 42800,
    notes: "Duy trì server xử lý AI, băng thông 4G/Cloudflare tunnel & lưu trữ dữ liệu"
  },
  {
    item: "Combo Trọn Gói (Bộ cảm biến có trụ + 1 năm Web AI)",
    costUnit: 1771200,
    priceUnit: 2036880,
    profitUnit: 265680,
    notes: "Chiết khấu đặc biệt cho Hợp Tác Xã & Nông dân đăng ký theo vụ mùa"
  }
];
