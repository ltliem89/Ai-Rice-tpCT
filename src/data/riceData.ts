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
    definition: "Bệnh đạo ôn (Rice Blast) do nấm nấm Pyricularia oryzae gây ra. Đây là một trong những dịch bệnh phá hại nguy hiểm bậc nhất trên cây lúa tại Đồng bằng Sông Cửu Long, có khả năng tấn công tất cả các bộ phận từ lá, cổ lá, thân, cổ bông đến hạt lúa.",
    identification: [
      "Vết bệnh trên lá có dạng hình mắt én (hình thoi) đặc trưng: tâm màu xám trắng hoại tử, viền xung quanh màu nâu sẫm hay đỏ gạch.",
      "Vết bệnh trên cổ bông làm hoại tử thâm đen bao quanh cổ giáp lá, làm cổ bông héo khô và gãy gục hoàn toàn.",
      "Vết bệnh trên hạt làm vỏ hạt xuất hiện đốm nâu xám, hạt lúa bị lem lép đen."
    ],
    harmfulEffects: {
      yieldLoss: "Thất thu 30% - 80% năng suất (mất trắng nếu bị đạo ôn cổ bông gãy gục)",
      description: "Phá hủy diện tích quang hợp lá lúa, cắt đứt mạch dẫn nuôi bông lúa làm hạt không thể vào gạo, bông lúa bị lép đen và gãy rụi.",
      impacts: [
        "Cháy rụi toàn bộ bộ lá lúa (đạo ôn lá) làm suy kiệt sức sống cây lúa.",
        "Gãy gục cổ bông (đạo ôn cổ bông) làm 100% hạt trên bông bị lép lửng.",
        "Suy giảm chất lượng hạt gạo, tăng chi phí phun thuốc bảo vệ thực vật."
      ]
    },
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
    sampleImage: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400' width='100%' height='100%'><rect width='600' height='400' fill='%23133e28'/><path d='M100 380 Q 250 120 500 20 Q 350 220 180 400 Z' fill='%2338a169'/><path d='M180 340 Q 280 180 450 60 Q 330 240 220 370 Z' fill='%2348bb78'/><ellipse cx='280' cy='200' rx='45' ry='16' transform='rotate(-35 280 200)' fill='%23742a2a' stroke='%23322659' stroke-width='3'/><ellipse cx='280' cy='200' rx='28' ry='8' transform='rotate(-35 280 200)' fill='%23e2e8f0'/><ellipse cx='360' cy='140' rx='35' ry='12' transform='rotate(-35 360 140)' fill='%23742a2a' stroke='%23322659' stroke-width='2'/><ellipse cx='360' cy='140' rx='20' ry='6' transform='rotate(-35 360 140)' fill='%23cbd5e0'/><rect x='15' y='15' width='270' height='36' rx='6' fill='rgba(0,0,0,0.75)'/><text x='25' y='38' font-family='sans-serif' font-size='13' font-weight='bold' fill='%2368d391'>SLIDE 23: HÌNH ĐẠO ÔN</text></svg>",
    documentSlide: "Slide 23",
    documentRef: "Tài liệu Trình chiếu Super Rice - Slide 23 (Hình Đạo ôn)",
    experimentalPhotoCount: 370
  },
  {
    id: "dom_van",
    name: "Bệnh Đốm Vằn (Khô Vằn)",
    englishName: "Sheath Blight",
    scientificName: "Rhizoctonia solani",
    category: "Bệnh do nấm",
    definition: "Bệnh đốm vằn (Khô vằn) do nấm Rhizoctonia solani gây ra. Bào tử nấm và hạch nấm tồn tại lâu năm trong đất, tấn công từ gầm gốc bẹ lá sát mặt nước rồi lan dần lên tầng lá trên.",
    identification: [
      "Vết bệnh dạng đốm vằn vèo như da hổ hoặc hình mây loang lổ màu xám xanh rồi chuyển xám trắng viền nâu.",
      "Phát triển từ bẹ lá chân gốc sát mặt nước rồi lan rộng lên phiến lá đòng và bông lúa.",
      "Xuất hiện các hạch nấm nhỏ dạng hạt màu trắng hoặc nâu bám trên bẹ lá bị bệnh."
    ],
    harmfulEffects: {
      yieldLoss: "Thất thu 20% - 50% năng suất lúa",
      description: "Thối mục bẹ lá khiến cây lúa bị gãy ngã rụi hàng loạt khi gặp mưa gió, hạt lúa bị lép lửng nặng.",
      impacts: [
        "Làm mục nát bẹ lá và thân lúa làm lúa đổ rạp diện rộng.",
        "Giảm nghiêm trọng diện tích lá xanh quang hợp nuôi hạt.",
        "Làm suy giảm phẩm cấp chất lượng hạt gạo sau thu hoạch."
      ]
    },
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
    sampleImage: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400' width='100%' height='100%'><rect width='600' height='400' fill='%231a365d'/><rect x='220' y='0' width='70' height='400' fill='%232f855a'/><rect x='330' y='0' width='80' height='400' fill='%23276749'/><path d='M210 220 Q 250 200 290 230 Q 270 270 220 250 Z' fill='%23975a16' stroke='%23742a2a' stroke-width='3'/><path d='M220 120 Q 260 100 285 130 Q 260 160 215 140 Z' fill='%23b7791f' stroke='%23742a2a' stroke-width='3'/><path d='M325 180 Q 380 150 415 190 Q 370 230 330 200 Z' fill='%23975a16' stroke='%23742a2a' stroke-width='3'/><rect x='15' y='15' width='260' height='36' rx='6' fill='rgba(0,0,0,0.75)'/><text x='25' y='38' font-family='sans-serif' font-size='13' font-weight='bold' fill='%23f6ad55'>SLIDE 23: HÌNH KHÔ VẰN</text></svg>",
    documentSlide: "Slide 23",
    documentRef: "Tài liệu Trình chiếu Super Rice - Slide 23 (Hình Khô vằn)",
    experimentalPhotoCount: 274
  },
  {
    id: "bac_la",
    name: "Bệnh Bạc Lá (Cháy Bìa Lá)",
    englishName: "Bacterial Leaf Blight",
    scientificName: "Xanthomonas oryzae pv. oryzae",
    category: "Bệnh do vi khuẩn",
    definition: "Bệnh bạc lá (Cháy bìa lá) do vi khuẩn Xanthomonas oryzae pv. oryzae gây ra. Vi khuẩn xâm nhập qua khí khổng hoặc vết rách lá do giông bão rồi nhân lên làm tắc nghẽn mạch dẫn dinh dưỡng.",
    identification: [
      "Vết bệnh phát triển từ chóp lá hoặc bìa lá thành các dải dài màu vàng nhạt rồi trắng xám ngả vàng đục.",
      "Ranh giới giữa phần lá bị bệnh và phần khỏe có đường lượn sóng màu nâu đỏ rất rõ rệt.",
      "Buổi sáng sớm xuất hiện các giọt keo vi khuẩn đục tròn nhỏ màu vàng óng bám trên vết bệnh."
    ],
    harmfulEffects: {
      yieldLoss: "Thất thu 30% - 70% năng suất lúa",
      description: "Làm cháy khô rụi lá đòng (lá nuôi bông), làm lúa trỗ lép nhiều, gãy bông, chất lượng gạo giảm sút nghiêm trọng.",
      impacts: [
        "Phá hủy hoàn toàn lá đòng - bộ lá quyết định 70% năng suất hạt lúa.",
        "Hạt lúa bị lép lửng, gạo bị xốp gãy, màu xám đục.",
        "Lây lan thần tốc sau các đợt mưa bão giông lốc ngoài đồng."
      ]
    },
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
    sampleImage: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400' width='100%' height='100%'><rect width='600' height='400' fill='%23064e3b'/><path d='M50 380 Q 200 150 550 40 L 520 20 Q 180 140 30 360 Z' fill='%2310b981'/><path d='M550 40 Q 350 180 150 380 L 120 380 Q 330 170 520 20 Z' fill='%23fef08a' stroke='%23eab308' stroke-width='2'/><path d='M300 180 Q 220 240 100 370 L 80 370 Q 200 230 280 170 Z' fill='%23fef08a'/><rect x='15' y='15' width='330' height='36' rx='6' fill='rgba(0,0,0,0.75)'/><text x='25' y='38' font-family='sans-serif' font-size='13' font-weight='bold' fill='%23facc15'>SLIDE 22 &amp; TRANG 2: HÌNH BẠC LÁ</text></svg>",
    documentSlide: "Slide 22 & Trang 2",
    documentRef: "Thuyết Minh Trang 2 & Slide 22 (Hình Bạc lá / Cháy bìa lá)",
    experimentalPhotoCount: 284
  },
  {
    id: "sau_cuon_la",
    name: "Sâu Cuốn Lá",
    englishName: "Rice Leaf Folder",
    scientificName: "Cnaphalocrocis medinalis",
    category: "Sâu hại / Côn trùng",
    definition: "Sâu cuốn lá nhỏ (Cnaphalocrocis medinalis) là côn trùng sâu hại phổ biến. Sâu nhả tơ kết 2 mép lá lại thành ống dẹp và sống ẩn nấp bên trong để gặm nhấm phần diệp lục màu xanh.",
    identification: [
      "Lá lúa bị cuốn tròn dẹp dọc theo phiến lá.",
      "Thịt lá bên trong ống cuốn bị gặm mất, để lại vệt biểu bì màu trắng sọc dài dọc theo gân lá.",
      "Cánh đồng bị hại nhìn từ xa có màu bạc xám trắng."
    ],
    harmfulEffects: {
      yieldLoss: "Thất thu 15% - 40% năng suất lúa",
      description: "Làm mất bộ lá quang hợp, đặc biệt khi gây hại lá đòng làm lúa trỗ lép, hạt nhỏ lửng.",
      impacts: [
        "Mất diện tích quang hợp nghiêm trọng giai đoạn đẻ nhánh và làm đòng.",
        "Hạt lúa kém mẩy, tỷ lệ hạt lép lửng tăng cao.",
        "Cây lúa bị mất sức, mở đường cho nấm bệnh xâm nhập."
      ]
    },
    symptoms: [
      "Sâu nhả tơ cuốn 2 mép lá lại thành ống dẹp.",
      "Sâu nằm bên trong nhai ăn phần thịt lá màu xanh, để lại biểu bì màu trắng dọc lá.",
      "Làm giảm khả năng quang hợp nghiêm trọng của lá lúa."
    ],
    favorableConditions: "Thời tiết mát mẻ, độ ẩm cao, bón dư thừa phân đạm.",
    typicalSoil: {
      moisture: "78%",
      pH: "5.8",
      npk: "N: 93 mg/kg | P: 45 mg/kg | K: 81 mg/kg",
      ec: "0.49 mS/cm"
    },
    treatment: [
      "Phun thuốc khi mật độ sâu cao (>20-30 con/m2) ở giai đoạn làm đòng.",
      "Sử dụng các gốc thuốc đặc trị như Chlorantraniliprole, Indoxacarb, Emamectin benzoate."
    ],
    preventiveMeasures: [
      "Bón phân cân đối NPK, tránh bón đạm muộn.",
      "Thăm ruộng thường xuyên để phát hiện bướm rộ."
    ],
    sampleImage: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400' width='100%' height='100%'><rect width='600' height='400' fill='%23065f46'/><path d='M100 350 Q 250 180 480 50 L 500 70 Q 270 200 120 370 Z' fill='%23059669'/><path d='M200 250 Q 300 170 420 100 L 410 115 Q 290 185 190 265 Z' fill='%23f8fafc' opacity='0.85'/><line x1='210' y1='240' x2='410' y2='110' stroke='%23475569' stroke-width='2' stroke-dasharray='4,4'/><rect x='15' y='15' width='310' height='36' rx='6' fill='rgba(0,0,0,0.75)'/><text x='25' y='38' font-family='sans-serif' font-size='13' font-weight='bold' fill='%2334d399'>TRANG 14: HÌNH SÂU CUỐN LÁ</text></svg>",
    documentSlide: "Trang 14",
    documentRef: "Bảng 2.000 ảnh thực nghiệm - Trang 14 (Sâu cuốn lá)",
    experimentalPhotoCount: 242
  },
  {
    id: "sau_an_la",
    name: "Sâu Ăn Lá (Sâu Gai / Sâu Khấu)",
    englishName: "Rice Armyworm / Leaf Caterpillar",
    scientificName: "Spodoptera litura / Dicladispa armigera",
    category: "Sâu hại / Côn trùng",
    definition: "Nhóm sâu ăn lá bao gồm Sâu gai và Sâu keo/Sâu khấu cắn phá phiến lá lúa trực tiếp. Bộc phát nhanh khi thời tiết nắng mưa thất thường.",
    identification: [
      "Mép lá lúa bị cắn khuyết nham nhở hoặc cắn đứt ngang phiến lá.",
      "Hạt phân sâu màu đen đùn ra dưới gốc lúa.",
      "Bọ gai màu đen hoặc sâu xám bò trực tiếp trên phiến lá."
    ],
    harmfulEffects: {
      yieldLoss: "Thất thu 20% - 60% năng suất lúa",
      description: "Ăn trụi toàn bộ bộ lá lúa trên cánh đồng, khiến cây lúa không còn khả năng quang hợp và suy kiệt.",
      impacts: [
        "Có thể ăn trơ trụi gân lá trong thời gian rất ngắn.",
        "Cây lúa ngưng sinh trưởng hoàn toàn.",
        "Mất năng suất trầm trọng nếu bị tấn công giai đoạn lúa non đẻ nhánh."
      ]
    },
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
    sampleImage: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400' width='100%' height='100%'><rect width='600' height='400' fill='%23047857'/><path d='M120 380 Q 280 150 500 30 Q 380 180 180 400 Z' fill='%2310b981'/><circle cx='280' cy='200' r='25' fill='%23047857'/><circle cx='340' cy='140' r='30' fill='%23047857'/><circle cx='230' cy='250' r='20' fill='%23047857'/><rect x='15' y='15' width='310' height='36' rx='6' fill='rgba(0,0,0,0.75)'/><text x='25' y='38' font-family='sans-serif' font-size='13' font-weight='bold' fill='%23a7f3d0'>TRANG 14: HÌNH SÂU ĂN LÁ</text></svg>",
    documentSlide: "Trang 14",
    documentRef: "Bảng 2.000 ảnh thực nghiệm - Trang 14 (Sâu ăn lá)",
    experimentalPhotoCount: 174
  },
  {
    id: "ngo_doc_huu_co",
    name: "Ngộ Độc Hữu Cơ",
    englishName: "Organic Acid Toxicity / Root Rot",
    scientificName: "Abiotic Toxicity",
    category: "Sinh lý / Môi trường",
    definition: "Bệnh ngộ độc hữu cơ là rối loạn sinh lý phi sinh học (Abiotic Disease). Xảy ra khi vùi rơm rạ tươi của vụ trước rồi ngâm nước làm rơm rạ phân hủy yếm khí sinh ra độc khí (H2S, CH4) và axit hữu cơ làm thối rễ lúa.",
    identification: [
      "Cây lúa ngưng phát triển, toàn bộ lá bị ngả màu vàng xám từ chóp lá lan xuống.",
      "Bộ rễ lúa bị thối đen, có mùi hôi chua nồng đậm, không có rễ trắng lông hút.",
      "Rễ lúa bị mềm nhũn, nhổ cây lên rất dễ dàng và cây không đẻ nhánh."
    ],
    harmfulEffects: {
      yieldLoss: "Thất thu 30% - 70% năng suất lúa",
      description: "Làm hư hỏng toàn bộ hệ thống rễ lúa, làm cây không thể hút nước và khoáng chất dẫn đến chết héo.",
      impacts: [
        "Rễ thối đen làm mất khả năng hút dinh dưỡng đạm, lân, kali.",
        "Cây lúa cằn cỗi, không đẻ nhánh, bạt bụi vàng rụi.",
        "Dễ dẫn đến nhiễm trùng thứ cấp do nấm và vi khuẩn tấn công."
      ]
    },
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
    sampleImage: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400' width='100%' height='100%'><rect width='600' height='260' fill='%230f766e'/><rect y='260' width='600' height='140' fill='%23451a03'/><path d='M280 270 Q 200 120 150 30' stroke='%23eab308' stroke-width='14' fill='none'/><path d='M300 270 Q 300 100 320 20' stroke='%23ca8a04' stroke-width='16' fill='none'/><path d='M320 270 Q 400 120 450 30' stroke='%23a16207' stroke-width='14' fill='none'/><path d='M290 270 Q 250 320 220 380 M 300 270 Q 300 330 300 390 M 310 270 Q 350 320 380 380' stroke='%231c1917' stroke-width='8' fill='none'/><rect x='15' y='15' width='320' height='36' rx='6' fill='rgba(0,0,0,0.75)'/><text x='25' y='38' font-family='sans-serif' font-size='13' font-weight='bold' fill='%23fde047'>TRANG 14: NGỘ ĐỘC HỮU CƠ</text></svg>",
    documentSlide: "Trang 14",
    documentRef: "Bảng 2.000 ảnh thực nghiệm - Trang 14 (Ngộ độc hữu cơ)",
    experimentalPhotoCount: 148
  },
  {
    id: "lun_co",
    name: "Bệnh Lùn Cỏ (Vàng Lùn)",
    englishName: "Rice Grassy Stunt Virus",
    scientificName: "Rice Grassy Stunt Virus (RGSV)",
    category: "Bệnh do virus",
    definition: "Bệnh Lùn cỏ (Vàng lùn) do virus Rice Grassy Stunt Virus (RGSV) gây ra, lây truyền duy nhất qua vật trung gian là Rầy Nâu (Nilaparvata lugens). Phá hủy hoàn toàn khả năng trỗ bông của lúa.",
    identification: [
      "Cây lúa bị lùn rất nặng, đẻ nhiều nhánh nhỏ mọc xoè rộng như bụi cỏ dại.",
      "Lá lúa ngắn, hẹp, màu xanh vàng hoặc vàng nhạt có đốm nâu gỉ sắt rải rác.",
      "Bụi lúa bệnh hoàn toàn không trỗ bông được hoặc bông bị lép 100%."
    ],
    harmfulEffects: {
      yieldLoss: "Thất thu 70% - 100% (mất trắng toàn bộ vùng bùng phát dịch)",
      description: "Cây lúa bị biến dạng sinh học, còi cọc như cỏ dại và không thu hoạch được hạt gạo nào.",
      impacts: [
        "Mất trắng năng suất lúa hoàn toàn tại các ổ dịch.",
        "Lây lan diện rộng cực kỳ nhanh chóng theo mật độ rầy nâu di trú.",
        "Không có thuốc hóa học đặc trị virus."
      ]
    },
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
    sampleImage: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400' width='100%' height='100%'><rect width='600' height='400' fill='%230f52ba'/><path d='M300 380 Q 150 250 80 180' stroke='%23facc15' stroke-width='12' fill='none'/><path d='M300 380 Q 200 220 160 140' stroke='%23eab308' stroke-width='10' fill='none'/><path d='M300 380 Q 280 200 260 120' stroke='%23ca8a04' stroke-width='10' fill='none'/><path d='M300 380 Q 340 200 380 120' stroke='%23facc15' stroke-width='10' fill='none'/><path d='M300 380 Q 400 220 460 140' stroke='%23eab308' stroke-width='10' fill='none'/><path d='M300 380 Q 450 250 520 180' stroke='%23ca8a04' stroke-width='12' fill='none'/><rect x='15' y='15' width='280' height='36' rx='6' fill='rgba(0,0,0,0.75)'/><text x='25' y='38' font-family='sans-serif' font-size='13' font-weight='bold' fill='%23facc15'>SLIDE 23: HÌNH VÀNG LÙN</text></svg>",
    documentSlide: "Slide 23",
    documentRef: "Tài liệu Trình chiếu Super Rice - Slide 23 (Hình Vàng Lùn)",
    experimentalPhotoCount: 138
  },
  {
    id: "sau_duc_than",
    name: "Sâu Đục Thân",
    englishName: "Rice Stem Borer",
    scientificName: "Scirpophaga incertulas",
    category: "Sâu hại / Côn trùng",
    definition: "Sâu đục thân bướm 2 chấm (Scirpophaga incertulas) là loài sâu hại đục bẹ xâm nhập vào bên trong thân lúa cắn đứt mạch dẫn dinh dưỡng và nước nuôi cây.",
    identification: [
      "Giai đoạn lúa đẻ nhánh: dọt lá non bên trong bị héo khô, rút ra dễ dàng (dọt héo).",
      "Giai đoạn lúa trỗ: bông lúa trỗ ra có màu trắng bạc, đứng thẳng lép hạt 100% (bông bạc).",
      "Thân lúa bị đục có lỗ nhỏ và dính phân sâu dạng mùn cưa."
    ],
    harmfulEffects: {
      yieldLoss: "Thất thu 30% - 70% năng suất lúa",
      description: "Mỗi bông lúa bị sâu đục thân cắn làm bông bạc là mất hoàn toàn 100% năng suất của bông lúa đó.",
      impacts: [
        "Gây hiện tượng dọt héo giai đoạn đẻ nhánh.",
        "Gây hiện tượng bông bạc thẳng đứng giai đoạn trỗ.",
        "Mất trắng sản lượng của các bông lúa bị đục thân."
      ]
    },
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
    sampleImage: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400' width='100%' height='100%'><rect width='600' height='400' fill='%23047857'/><path d='M250 400 L 260 180 Q 280 100 340 30' stroke='%23f8fafc' stroke-width='12' fill='none'/><circle cx='255' cy='280' r='6' fill='%23451a03'/><path d='M300 400 L 280 220 Q 250 140 180 50' stroke='%2310b981' stroke-width='14' fill='none'/><rect x='15' y='15' width='320' height='36' rx='6' fill='rgba(0,0,0,0.75)'/><text x='25' y='38' font-family='sans-serif' font-size='13' font-weight='bold' fill='%23f1f5f9'>TRANG 14: SÂU ĐỤC THÂN (BÔNG BẠC)</text></svg>",
    documentSlide: "Trang 14",
    documentRef: "Bảng 2.000 ảnh thực nghiệm - Trang 14 (Sâu đục thân)",
    experimentalPhotoCount: 126
  },
  {
    id: "chau_chau",
    name: "Tổn Thương Do Châu Chấu",
    englishName: "Grasshopper Damage",
    scientificName: "Oxya chinensis",
    category: "Sâu hại / Côn trùng",
    definition: "Châu chấu lúa (Oxya chinensis) là côn trùng đa thực sử dụng bộ hàm khỏe cắn thủng rách phiến lá lúa, làm mất diện tích diệp lục của lá.",
    identification: [
      "Lá lúa bị cắn thủng từng lỗ lớn bất định hình rải rác.",
      "Mép lá lúa bị cắn nham nhở khuyết hình dợn sóng.",
      "Côn trùng nhảy rộn rã khi di chuyển qua các rãnh lúa."
    ],
    harmfulEffects: {
      yieldLoss: "Thất thu 10% - 30% năng suất lúa",
      description: "Suy giảm khả năng quang hợp và tạo điều kiện cho vi khuẩn xâm nhập qua vết thương hở.",
      impacts: [
        "Giảm diện tích lá xanh tổng hợp diệp lục.",
        "Mở đường cho nấm và vi khuẩn xâm nhập gây bệnh thứ cấp.",
        "Tăng chi phí quản lý dịch hại."
      ]
    },
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
      "Phat quang bờ dại ven ruộng.",
      "Phun xịt xua đuổi bằng tinh dầu neem hoặc thuốc trừ sâu tiếp xúc."
    ],
    preventiveMeasures: [
      "Vệ sinh cỏ bờ quanh vùng canh tác."
    ],
    sampleImage: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400' width='100%' height='100%'><rect width='600' height='400' fill='%23065f46'/><path d='M100 380 Q 280 150 500 30 Q 380 180 180 400 Z' fill='%2310b981'/><ellipse cx='300' cy='180' rx='40' ry='20' transform='rotate(25 300 180)' fill='%23065f46'/><ellipse cx='380' cy='120' rx='30' ry='15' transform='rotate(25 380 120)' fill='%23065f46'/><rect x='15' y='15' width='330' height='36' rx='6' fill='rgba(0,0,0,0.75)'/><text x='25' y='38' font-family='sans-serif' font-size='13' font-weight='bold' fill='%236ee7b7'>TRANG 14: TỔN THƯƠNG CHÂU CHẤU</text></svg>",
    documentSlide: "Trang 14",
    documentRef: "Bảng 2.000 ảnh thực nghiệm - Trang 14 (Châu chấu hại lúa)",
    experimentalPhotoCount: 116
  },
  {
    id: "soc_vi_khuan",
    name: "Sọc Vi Khuẩn Trên Lá",
    englishName: "Bacterial Leaf Streak",
    scientificName: "Xanthomonas oryzae pv. oryzicola",
    category: "Bệnh do vi khuẩn",
    definition: "Bệnh sọc vi khuẩn do Xanthomonas oryzae pv. oryzicola gây ra. Vi khuẩn phát triển theo các mạch gân lá sinh ra dải sọc màu nâu vàng kéo dài.",
    identification: [
      "Dải sọc ngắn hẹp màu nâu ngả vàng chạy dọc theo gân lá.",
      "Soi phiến lá trước ánh sáng thấy vệt bệnh mờ trong suốt hẹp theo gân.",
      "Lá lúa bị cháy khô từng mảng lớn màu nâu xám."
    ],
    harmfulEffects: {
      yieldLoss: "Thất thu 20% - 50% năng suất lúa",
      description: "Cháy khô từng mảng lá lúa, cản trở quang hợp và hạt lúa bị biến màu xấu gạo.",
      impacts: [
        "Làm cháy khô các phiến lá trên tầng mặt.",
        "Hạt lúa kém mẩy, lúa bị lem lép hạt.",
        "Chất lượng gạo thương phẩm suy giảm."
      ]
    },
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
    sampleImage: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400' width='100%' height='100%'><rect width='600' height='400' fill='%23064e3b'/><path d='M100 380 Q 280 150 500 30 Q 380 180 180 400 Z' fill='%2310b981'/><path d='M180 300 L 420 80' stroke='%23eab308' stroke-width='4' stroke-dasharray='15,8' fill='none'/><path d='M200 310 L 440 90' stroke='%23ca8a04' stroke-width='3' stroke-dasharray='20,10' fill='none'/><rect x='15' y='15' width='330' height='36' rx='6' fill='rgba(0,0,0,0.75)'/><text x='25' y='38' font-family='sans-serif' font-size='13' font-weight='bold' fill='%23fde047'>TRANG 14: SỌC VI KHUẨN TRÊN LÁ</text></svg>",
    documentSlide: "Trang 14",
    documentRef: "Bảng 2.000 ảnh thực nghiệm - Trang 14 (Sọc vi khuẩn)",
    experimentalPhotoCount: 98
  },
  {
    id: "tungro",
    name: "Bệnh Tungro",
    englishName: "Rice Tungro Virus",
    scientificName: "Rice Tungro Bacilliform Virus (RTBV)",
    category: "Bệnh do virus",
    definition: "Bệnh Tungro là bệnh virus phức hợp do Rice Tungro Bacilliform Virus (RTBV) gây ra, lây truyền môi giới qua Rầy Xanh đuôi đen (Nephotettix virescens).",
    identification: [
      "Lá lúa biến đổi màu từ xanh sang vàng cam hay da cam từ chóp lá lan xuống.",
      "Cây lúa bị lùn nhẹ, đẻ nhánh kém, rễ còi cọc.",
      "Bông lúa nhỏ, trỗ không thoát và hạt lép có đốm nâu."
    ],
    harmfulEffects: {
      yieldLoss: "Thất thu 40% - 80% năng suất lúa",
      description: "Suy nhược cây lúa toàn diện, làm bông lúa trỗ không thoát và lép hạt nặng.",
      impacts: [
        "Lá lúa chuyển vàng cam cản trở diệp lục tố.",
        "Cây lúa bị lùn cọc kiệt sức.",
        "Lây lan nhanh theo di trú của rầy xanh."
      ]
    },
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
    sampleImage: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400' width='100%' height='100%'><rect width='600' height='400' fill='%23065f46'/><path d='M100 380 Q 280 150 500 30 Q 380 180 180 400 Z' fill='%2310b981'/><path d='M350 140 Q 430 80 500 30 Q 420 120 320 200 Z' fill='%23f97316'/><rect x='15' y='15' width='280' height='36' rx='6' fill='rgba(0,0,0,0.75)'/><text x='25' y='38' font-family='sans-serif' font-size='13' font-weight='bold' fill='%23fdba74'>TRANG 14: BỆNH TUNGRO</text></svg>",
    documentSlide: "Trang 14",
    documentRef: "Bảng 2.000 ảnh thực nghiệm - Trang 14 (Bệnh Tungro)",
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
    title: "HỆ THỐNG KẾT HỢP AI NHẬN DIỆN BỆNH LÚA VÀ THEO DÕI ĐẤT TRỒNG THEO THỜI GIAN THỰC TRÊN WEB DI ĐỘNG",
    subtitle: "SUPER RICE - Dự án Khoa Học Kỹ Thuật / Sáng Tạo Thanh Thiếu Niên Nhi Đồng TP. Cần Thơ",
    category: "Tổng quan",
    summaryText: "Slide mở đầu giới thiệu tên đề tài nghiên cứu, nhóm tác giả học sinh trường Him Lam và GVHD.",
    speakerScript: "Kính chào Ban Giám Khảo! Em xin đại diện nhóm trình bày dự án 'Hệ thống kết hợp AI nhận diện bệnh lúa và theo dõi đất trồng theo thời gian thực trên Web di động' - Đề tài mang tên SUPER RICE nhằm nâng cao hiệu quả canh tác lúa tại TP. Cần Thơ và cả nước.",
    bulletPoints: [
      "Nhóm tác giả: Học sinh trường PTDTNT THCS Him Lam, huyện Châu Thành, TP. Cần Thơ.",
      "Giáo viên hướng dẫn: Thầy Lê Thanh Liêm.",
      "Sứ mệnh dự án: Đưa chuyển đổi số và công nghệ AI/IoT thông minh ra đồng ruộng lúa dã chiến."
    ],
    diagramType: "architecture"
  },
  {
    id: 2,
    title: "VẤN ĐỀ THỰC TẾ & KHẢO SÁT THỰC ĐỊA RUỘNG LÚA CẦN THƠ",
    category: "Vấn đề & Khảo sát",
    summaryText: "Khảo sát thực tế khó khăn của bà con trồng lúa khi chẩn đoán bệnh bằng mắt thường và bón phân theo cảm tính.",
    speakerScript: "Qua khảo sát thực địa tại các ruộng lúa Cần Thơ, chúng em thấy bà con gặp rất nhiều khó khăn do sâu bệnh hại phức tạp và thiếu phương tiện đo chất đất định lượng. Việc quan sát bằng mắt thường dễ nhầm lẫn dẫn đến bón sai phân, xịt sai thuốc, hại đất nước và giảm năng suất.",
    bulletPoints: [
      "Khó khăn của bà con: Bệnh lúa phát triển nhanh, khó phân biệt các triệu chứng tương tự bằng mắt thường.",
      "Hậu quả bón phân cảm tính: Thừa đạm làm bùng phát dịch đạo ôn, lúa lửng hạt, tăng chi phí thuốc BVTV.",
      "Nhu cầu thực tiễn: Cần một công cụ di động nhận diện bệnh nhanh và đo chính xác chỉ số đất NPK."
    ],
    diagramType: "survey"
  },
  {
    id: 3,
    title: "NGHIÊN CỨU TỔNG QUAN: MÔ HÌNH TLI-YOLO",
    subtitle: "Li và cộng sự (2025) – Tạp chí Sensors (MDPI)",
    category: "Nghiên cứu & Khoảng trống",
    summaryText: "Đánh giá mô hình TLI-YOLO hiện đại trên thế giới và khoảng trống nghiên cứu chưa tích hợp cảm biến đất.",
    speakerScript: "Chúng em nghiên cứu đề tài TLI-YOLO công bố năm 2025 đạt độ chính xác 93.1%, mAP 95%, tuy nhiên mô hình này vẫn còn khoảng trống lớn: Chưa tích hợp các thông số môi trường đất và hỗ trợ cảnh báo sớm toàn diện.",
    bulletPoints: [
      "Mô hình TLI-YOLO (2025): Đạt độ chính xác 93.1% precision, 88% recall, 95% mAP, và 90.48% F1 score.",
      "Ưu điểm: Tương thích tốt trên thiết bị di động với tốc độ xử lý nhanh.",
      "KHOẢNG TRỐNG: Chưa tích hợp các thông số môi trường đất trồng, chưa hỗ trợ cảnh báo sớm và giám sát sức khỏe cây lúa một cách toàn diện."
    ],
    diagramType: "comparison"
  },
  {
    id: 4,
    title: "NGHIÊN CỨU TỔNG QUAN: MÔ HÌNH INCEPTION V3",
    subtitle: "Nguyễn Thái Nghe (2022) – Tạp chí Khoa học Trường Đại học Cần Thơ",
    category: "Nghiên cứu & Khoảng trống",
    summaryText: "Đánh giá nghiên cứu nhận dạng bệnh lá lúa bằng phương pháp học chuyển giao tại Việt Nam.",
    speakerScript: "Tại Việt Nam, nghiên cứu Inception V3 năm 2022 của ĐH Cần Thơ đạt độ chính xác 97.4% trên 2.500 ảnh lúa, nhưng số lượng bệnh nhận dạng còn ít và chưa định vị vết bệnh trên lá.",
    bulletPoints: [
      "Mô hình Inception V3: Chạy thực nghiệm trên 2.500 hình ảnh lá lúa, đạt độ chính xác 97.4%.",
      "KHOẢNG TRỐNG: Số lượng loại bệnh nhận diện còn hạn chế, chưa chỉ ra được vị trí chính xác của vết bệnh trên phiến lá."
    ],
    diagramType: "comparison"
  },
  {
    id: 5,
    title: "NGHIÊN CỨU TỔNG QUAN: MÔ HÌNH CNN PHÂN LOẠI",
    subtitle: "Nguyễn Đình Công (2022) – Tạp chí Khoa học Trường Đại học Hồng Đức",
    category: "Nghiên cứu & Khoảng trống",
    summaryText: "Phân tích so sánh các kiến trúc CNN trên di động phân loại bệnh hại lúa.",
    speakerScript: "Nghiên cứu năm 2022 của tác giả Nguyễn Đình Công đề xuất mô hình CNN gọn nhẹ chỉ 0.8 triệu tham số đạt 99.21% chính xác, tuy nhiên vẫn chưa tích hợp các yếu tố đất đai.",
    bulletPoints: [
      "So sánh kiến trúc: DenseNet201 (99.65%), MobileNetv3 (91.3%), SimpleCNN (75.1%), Mô hình đề xuất (99.21% chính xác với 0.8M tham số).",
      "KHOẢNG TRỐNG: Chưa hỗ trợ theo dõi các yếu tố môi trường thổ nhưỡng, chưa đưa ra cảnh báo sớm nguy cơ phát sinh dịch hại."
    ],
    diagramType: "comparison"
  },
  {
    id: 6,
    title: "SO SÁNH CÁC GIẢI PHÁP & KHOẢNG TRỐNG KHOA HỌC GIAO THOA",
    category: "Nghiên cứu & Khoảng trống",
    summaryText: "Phân tích so sánh chi tiết giữa Plantix, NextFarm AI, CNN+OpenCV và định vị khoảng trống đột phá của AI-RICE.",
    speakerScript: "Từ việc phân tích khoảng trống khoa học giao thoa, nhóm nhận thấy các giải pháp hiện tại như Plantix hay NextFarm AI hoặc không theo dõi đất, hoặc chưa chuyên sâu cho lúa. AI-RICE ra đời để lấp đầy khoảng trống này.",
    bulletPoints: [
      "Plantix: Nhận diện bệnh qua ảnh tốt, dễ dùng trên di động nhưng KHÔNG theo dõi môi trường đất.",
      "NextFarm AI: Chẩn đoán nhanh, hỗ trợ xử lý kịp thời nhưng CHƯA chuyên sâu riêng cho cây lúa.",
      "CNN + OpenCV: Hỗ trợ chẩn đoán và phát hiện bệnh nhưng CHƯA cập nhật nhiều chủng bệnh mới.",
      "KHOẢNG TRỐNG KHOA HỌC GIAO THOA: Số lượng bệnh lúa nhận diện còn hạn chế, CHƯA TÍCH HỢP ĐỒNG THỜI thông số môi trường đất trồng lúa."
    ],
    diagramType: "comparison"
  },
  {
    id: 7,
    title: "TÍNH MỚI, TÍNH SÁNG TẠO ĐỘT PHÁ CỦA SẢN PHẨM",
    category: "Tính mới & Nguyên lý",
    summaryText: "Sự kết hợp hoàn hảo giữa mô hình AI nhận diện 11 bệnh lúa và đo đạc 7 thông số chất đất.",
    speakerScript: "Sản phẩm của chúng em sở hữu tính mới vượt trội: Mô hình AI nhận dạng rõ 11 loại bệnh hại phổ biến cùng cảm biến 7 trong 1 đo chính xác NPK, pH, EC, nhiệt ẩm đất đai.",
    bulletPoints: [
      "MÔ HÌNH AI: Nhận diện 11 loại dịch hại (Bạc lá, Sâu ăn lá, Châu chấu, Lùn cỏ, Sâu cuốn lá, Ngộ độc hữu cơ, Đạo ôn, Đốm vằn, Sâu đục thân, Sọc vi khuẩn, Tungro).",
      "CẢM BIẾN ĐẤT 7-IN-1: Đo đạc thời gian thực Độ ẩm, Nhiệt độ, pH, EC, Nitơ (N), Photpho (P), Kali (K).",
      "PHÂN TÍCH TỔNG HỢP: Hợp nhất dữ liệu hình ảnh bệnh và 7 chỉ số đất để đưa ra khuyến cáo phân bón, thuốc trị bệnh chính xác và khoa học nhất."
    ],
    diagramType: "architecture"
  },
  {
    id: 8,
    title: "CẤU TẠO PHẦN CỨNG THIẾT BỊ ĐO ĐẤT AI-RICE",
    category: "Tính mới & Nguyên lý",
    summaryText: "Chi tiết thiết kế phần cứng gồm vi điều khiển ESP32-S3 và cảm biến 7 chỉ số đất.",
    speakerScript: "Mạch phần cứng được thiết kế nhỏ gọn, sử dụng vi điều khiển ESP32-S3 hiệu năng cao, tích hợp sạc pin Lithium và đầu đo 7-in-1 cực bền ngoài đồng ruộng.",
    bulletPoints: [
      "Vi điều khiển chính: ESP32-S3 hỗ trợ WiFi/Bluetooth truyền tải dữ liệu tức thì.",
      "Nguồn điện dã chiến: Sử dụng Pin Lithium 18650 tích hợp mạch sạc và bảo vệ pin tự động.",
      "Màn hình thực địa: Màn hình màu TFT 1.8 inch hiển thị nhanh kết quả đo đạc tại chỗ không cần điện thoại."
    ],
    diagramType: "architecture"
  },
  {
    id: 9,
    title: "MÔ HÌNH AI NHẬN DIỆN 11 LOẠI DỊCH HẠI",
    category: "Tính mới & Nguyên lý",
    summaryText: "Mô hình học máy Deep Learning tối ưu nhận diện chuẩn xác 11 đối tượng lúa.",
    speakerScript: "Mô hình AI nhận diện của chúng em hỗ trợ nhận biết 11 dịch hại chính: từ đạo ôn, đốm vằn, bạc lá cho đến các loại sâu hại, châu chấu phá hoại.",
    bulletPoints: [
      "Công nghệ cốt lõi: Mô hình mạng YOLOv8/TLI-YOLO được huấn luyện chuyên biệt cho lúa.",
      "Độ chính xác vượt trội: Nhận diện khoanh vùng tức thì với mAP đạt trên 90%.",
      "Khả năng mở rộng: Dễ dàng cập nhật thêm các chủng bệnh và sâu hại mới xuất hiện."
    ],
    diagramType: "architecture"
  },
  {
    id: 10,
    title: "QUY TRÌNH HOẠT ĐỘNG PHỐI HỢP AI FUSION",
    category: "Tính mới & Nguyên lý",
    summaryText: "Cơ chế Fusion kết hợp kết quả chẩn đoán hình ảnh với dữ liệu thổ nhưỡng NPK.",
    speakerScript: "Đặc biệt, hệ thống sử dụng thuật toán AI Fusion: kết hợp kết quả chẩn đoán từ ảnh lá lúa với nồng độ NPK, pH thực tế để đưa ra khuyến cáo phân bón chính xác nhất.",
    bulletPoints: [
      "Hợp nhất dữ liệu: Ảnh chụp lá lúa + Độ ẩm, Nhiệt độ, pH, EC, N-P-K của đất trồng.",
      "Chẩn đoán kép: Loại trừ trường hợp vàng lá do sinh lý (thiếu NPK) với bệnh hại thực tế.",
      "Khuyến cáo thông minh: Đưa ra công thức bón phân và xịt thuốc BVTV theo đúng nhu cầu thực tế."
    ],
    diagramType: "architecture"
  },
  {
    id: 11,
    title: "CÁCH SỬ DỤNG PHẦN MỀM DI ĐỘNG NHẬN DIỆN BỆNH LÚA",
    category: "Tính mới & Nguyên lý",
    summaryText: "Quy trình 3 bước sử dụng phần mềm trên di động đơn giản cho bà con nông dân.",
    speakerScript: "Đầu tiên, cách sử dụng phần mềm di động AI-RICE cực kỳ đơn giản cho bà con nông dân: BƯỚC 1: Truy cập web hệ thống. BƯỚC 2: Chụp ảnh lá lúa bị bệnh. BƯỚC 3: Nhận ngay chẩn đoán trong 1-3 giây.",
    bulletPoints: [
      "Bước 1: Truy cập địa chỉ website hệ thống trên điện thoại.",
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
    speakerScript: "Để đo đất, nông dân chỉ cần: BƯỚC 4: Cắm chân cảm biến xuống đất ruộng. BƯỚC 5: Bật công tắc và ấn START. Các chỉ số lập tức hiện trên màn hình TFT và đồng bộ về Web.",
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
    title: "CÁC VIDEO ĐÁNH GIÁ, GIỚI THIỆU TIÊU BIỂU",
    category: "Thực nghiệm & So sánh",
    summaryText: "Ghi nhận tư liệu thực tế giới thiệu và hướng dẫn bà con nông dân sử dụng bộ thiết bị ngoài đồng ruộng.",
    speakerScript: "Đây là các video tư liệu quý giá của nhóm: Thầy Lê Thanh Liêm giới thiệu sản phẩm và các bạn học sinh Bảo Ngân, Tường Vy trực tiếp hướng dẫn chú Vinh, chú Hoàng đo đạc và chụp ảnh lá lúa.",
    bulletPoints: [
      "VIDEO 1: Giáo viên hướng dẫn đang giới thiệu nguyên lý hoạt động của sản phẩm ngoài đồng ruộng.",
      "VIDEO 2: Bạn Bảo Ngân tận tình hướng dẫn chú Vinh cắm chân cảm biến và thao tác đo đạc đất lúa.",
      "VIDEO 3: Bạn Tường Vy trực tiếp hướng dẫn chú Hoàng cách dùng điện thoại chụp ảnh lá lúa nhận dạng bệnh tức thì."
    ],
    diagramType: "survey_detail"
  },
  {
    id: 16,
    title: "Ý KIẾN ĐÁNH GIÁ TRỰC TIẾP TỪ BÀ CON NÔNG DÂN",
    category: "Thực nghiệm & So sánh",
    summaryText: "Phản hồi chân thực từ các hộ nông dân trực tiếp sử dụng trải nghiệm sản phẩm tại Cần Thơ.",
    speakerScript: "Ý kiến đóng góp từ các hộ nông dân tại Cần Thơ đều rất tích cực. Bà con rất phấn khởi khi có một công cụ đo đất chính xác và chụp ảnh chẩn đoán bệnh tức thì bằng tiếng Việt.",
    bulletPoints: [
      "Chú Vinh (xã Thạnh Hòa): 'Thiết bị báo chuẩn bệnh đạo ôn, giúp tui kịp thời ngừng bón phân đạm bừa bãi và dập dịch tốt!'",
      "Chú Hoàng (xã Tân Bình): 'Giao diện web bằng điện thoại rất trực quan, đo đất cái là biết ngay NPK thiếu đủ thế nào.'",
      "Chú Tùng (xã Tân Hòa): 'Mô hình tripod cắm đất dã chiến rất vững chãi, gọn nhẹ, dễ xách đi khắp mọi góc ruộng lúa.'"
    ],
    diagramType: "survey_detail"
  },
  {
    id: 17,
    title: "HIỆU QUẢ ỨNG DỤNG SO VỚI TRUYỀN THỐNG (AI-RICE VS TRUYỀN THỐNG)",
    category: "Thực nghiệm & So sánh",
    summaryText: "Bảng phân tích hiệu quả vượt trội về thời gian phản hồi, độ chính xác và khả năng theo dõi thổ nhưỡng.",
    speakerScript: "Bảng so sánh này thể hiện rõ rệt hiệu quả của AI-RICE so với canh tác truyền thống: rút ngắn thời gian chẩn đoán từ vài ngày xuống 1-3 giây, nâng độ chính xác lên 90-95% và tự động hóa theo dõi đất đai.",
    bulletPoints: [
      "NHẬN DIỆN BỆNH: Phương pháp thủ công bằng mắt thường -> Được hệ thống AI thông minh hỗ trợ 24/7.",
      "SỐ LƯỢNG NHẬN DIỆN: Kinh nghiệm không xác định rõ -> Nhận diện chuẩn xác 11 loại dịch hại.",
      "THỜI GIAN XỬ LÝ: Mất vài giờ đến vài ngày gửi mẫu -> Chỉ mất 1-3 giây/ảnh chụp (đạt mAP50 cao).",
      "ĐỘ CHÍNH XÁC: Phụ thuộc hoàn toàn cảm tính -> Đạt độ chính xác khoa học từ 90% - 95%.",
      "THEO DÕI ĐẤT: Quan sát phỏng đoán đất tốt xấu -> Giám sát tự động 7 chỉ số NPK/pH/EC định lượng rõ ràng."
    ],
    diagramType: "comparison"
  },
  {
    id: 18,
    title: "BẢNG GIÁ THÀNH SẢN PHẨM & KẾ HOẠCH KINH DOANH",
    category: "Kế hoạch Kinh doanh",
    summaryText: "Chi phí sản xuất tối ưu và cấu trúc giá bán cực kỳ cạnh tranh cho nông dân.",
    speakerScript: "Về thương mại hóa, bộ thiết bị cảm biến có trụ tripod có giá bán 2.056.800 VNĐ, bộ không trụ là 1.784.000 VNĐ, tài khoản Web AI duy trì là 100.000 VNĐ/tháng.",
    bulletPoints: [
      "BỘ CÓ TRỤ TRIPOD: Chi phí sản xuất 1.714.000 VNĐ | Giá bán dự kiến 2.056.800 VNĐ | Lợi nhuận 342.800 VNĐ.",
      "BỘ KHÔNG TRỤ: Chi phí sản xuất 1.487.000 VNĐ | Giá bán dự kiến 1.784.000 VNĐ | Lợi nhuận 297.000 VNĐ.",
      "TÀI KHOẢN WEB AI: Chi phí vận hành 57.200 VNĐ/tháng | Giá bán 100.000 VNĐ/tháng.",
      "COMBO TRỌN GÓI: Giá bán ưu đãi 2.036.880 VNĐ."
    ],
    diagramType: "business"
  },
  {
    id: 19,
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
    id: 20,
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
    id: 21,
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
    id: 22,
    title: "HÌNH ẢNH MINH HỌA THỰC TẾ TRÊN RUỘNG LÚA (PHẦN 1)",
    category: "Thực nghiệm & So sánh",
    summaryText: "Hình ảnh đối chứng thực tế đốm bệnh Cháy bìa lá vi khuẩn và hiện tượng lúa bị Thiếu hụt Kali.",
    speakerScript: "Slide này trình bày hình ảnh đối chứng đốm bệnh Cháy bìa lá do vi khuẩn gây ra dọc mép lá lúa và hiện tượng Thiếu hụt Kali làm mép lá bị úa vàng, khô héo.",
    bulletPoints: [
      "CHÁY BÌA LÁ (BẠC LÁ): Vết bệnh lan dọc theo mép lá lúa từ chóp xuống, ban đầu màu vàng nhạt rồi chuyển sang xám trắng.",
      "THIẾU KALI: Đầu lá và mép lá xuất hiện các vệt vàng cam úa khô, lá lúa bị khô héo dần từ rìa ngoài vào gân trong."
    ],
    diagramType: "images_part1"
  },
  {
    id: 23,
    title: "HÌNH ẢNH MINH HỌA THỰC TẾ TRÊN RUỘNG LÚA (PHẦN 2)",
    category: "Thực nghiệm & So sánh",
    summaryText: "Hình ảnh đối chứng đốm bệnh Thiếu Lân, Vàng lùn, Khô vằn và Đạo ôn lá điển hình.",
    speakerScript: "Slide cuối trình bày 4 hình ảnh đối chứng thực địa: cây lúa bị Thiếu Lân còi cọc màu xanh đậm tím; bệnh Vàng lùn lùn xoắn lá; đốm mây Khô vằn gốc bẹ; vết hình thoi Đạo ôn lá lúa.",
    bulletPoints: [
      "THIẾU LÂN: Lá lúa hẹp, dựng đứng có màu xanh tối đậm ngả tím, đẻ nhánh cực kỳ kém, cây lúa còi cọc.",
      "VÀNG LÙN: Lá lúa ngả sang màu vàng cam chói, phiến lá ngắn bị xoắn đầu lá, cây lúa lùn rụt không thể làm đòng trỗ bông.",
      "KHÔ VẰN: Vết loang hình đốm mây vằn vèo như da hổ xuất hiện từ bẹ gốc sát mặt nước lây lan nhanh lên phiến lá.",
      "ĐẠO ÔN: Vết bệnh hình thoi hoại tử đặc trưng có tâm xám trắng bám rải rác trên phiến lá lúa, lan rộng làm cháy khô bộ lá."
    ],
    diagramType: "images_part2"
  },
  {
    id: 24,
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
