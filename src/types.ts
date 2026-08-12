export interface DiseaseItem {
  id: string;
  name: string;
  englishName: string;
  scientificName: string;
  category: "Bệnh do nấm" | "Bệnh do vi khuẩn" | "Bệnh do virus" | "Sâu hại / Côn trùng" | "Sinh lý / Môi trường";
  definition: string;
  identification: string[];
  harmfulEffects: {
    yieldLoss: string;
    description: string;
    impacts: string[];
  };
  symptoms: string[];
  favorableConditions: string;
  typicalSoil: {
    moisture: string;
    pH: string;
    npk: string;
    ec: string;
  };
  treatment: string[];
  preventiveMeasures: string[];
  sampleImage: string;
  documentRef?: string;
  documentSlide?: string;
  experimentalPhotoCount: number;
}

export interface SoilSensorData {
  moisture: number; // % (0-100)
  temperature: number; // °C (15-45)
  pH: number; // 3.5 - 9.0
  ec: number; // mS/cm (0.1 - 3.0)
  nitrogen: number; // mg/kg (0 - 300)
  phosphorus: number; // mg/kg (0 - 150)
  potassium: number; // mg/kg (0 - 200)
  timestamp: string;
  sensorStatus: "ONLINE" | "CONNECTING" | "OFFLINE";
  batteryLevel: number;
}

export interface ExperimentalRecord {
  diseaseName: string;
  photoCount: number;
  n: number;
  p: number;
  k: number;
  pH: number;
  ec: number;
  temp: number;
  moisture: number;
}

export interface PrototypeStage {
  id: string;
  period: string;
  title: string;
  description: string;
  designConcept: string;
  advantages: string[];
  limitations: string[];
  achievements?: string;
  imageBg: string;
  features: string[];
}

export interface PresentationSlide {
  id: number;
  title: string;
  subtitle?: string;
  category: "Tổng quan" | "Vấn đề & Khảo sát" | "Nghiên cứu & Khoảng trống" | "Tính mới & Nguyên lý" | "Mẫu thử phát triển" | "Thực nghiệm & So sánh" | "Kế hoạch Kinh doanh";
  summaryText: string;
  speakerScript: string;
  bulletPoints?: string[];
  imageIllustration?: string;
  diagramType?: "architecture" | "comparison" | "dataset" | "prototype" | "business" | "survey" | "survey_detail" | "images_part1" | "images_part2";
}

export interface BusinessCostItem {
  item: string;
  costUnit: number;
  priceUnit: number;
  profitUnit: number;
  notes: string;
}

export interface AdminUser {
  id: string;
  userId: string;
  expiryDate: string;
  quota: number | "UNLIMITED";
  usedCount: number;
  status: "active" | "locked";
  accessKey: string;
  userLink: string;
}

export interface AIFusionResult {
  diseaseName: string;
  confidence: number;
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  leafDiagnosis: string;
  environmentAnalysis: string;
  recommendations: string[];
  scientificReasoning: string;
  timestamp: string;
}
