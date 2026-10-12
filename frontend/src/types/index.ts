export interface FarmerUser {
  id: string;
  name: string;
  mobile: string;
  email: string;
  preferredLanguage: 'en' | 'te' | 'hi';
}

export interface FarmDetails {
  userId: string;
  farmSize: number;
  location: {
    village: string;
    district: string;
    state: string;
    latitude?: number;
    longitude?: number;
  };
  soilType: string;
  currentCrop: string;
  currentStage: string;
  sowingDate?: string;
}

export interface SoilNutrients {
  pH: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicCarbon: number;
  sulfur: number;
  zinc: number;
  iron: number;
}

export interface SoilLabItem {
  id: string;
  name: string;
  authorizationStatus: string;
  address: string;
  district: string;
  latitude: number;
  longitude: number;
  distance: string;
  contact: string;
  openingHours: string;
}

export interface CropItem {
  id: string;
  name: string;
  category: string;
  pHRange: { min: number; max: number };
  waterRequirement: string;
  duration: string;
  sowingPeriod: string;
  harvestPeriod: string;
  expectedYield: string;
  cultivationCost: number;
  estimatedRevenue: number;
  marketDemand: string;
  risks: string[];
  description?: string;
}

export interface CropRecommendation {
  cropId: string;
  cropName: string;
  category: string;
  suitabilityScore: number;
  duration: string;
  waterRequirement: string;
  expectedYield: string;
  estimatedCost: number;
  estimatedRevenue: number;
  estimatedProfit: number;
  risk: string;
  marketDemand: string;
  whyThisCrop: string;
}

export interface FertilizerRecommendation {
  id: string;
  nutrientDeficiency: string;
  fertilizerType: string;
  quantityPerAcre: string;
  totalQuantity: string;
  applicationSchedule: string;
}

export interface CropTask {
  id: string;
  day: number;
  title: string;
  description: string;
  category: string;
  status: 'upcoming' | 'completed';
  dueDate: string;
}

export interface MarketItem {
  id: string;
  name: string;
  district: string;
  crop: string;
  currentPrice: string;
  pricePerKg: number;
  trend: string;
  trendDirection: 'up' | 'down';
  distance: string;
  demand: string;
  lastUpdated: string;
  priceHistory: { date: string; price: number }[];
}

export interface BuyerItem {
  id: string;
  name: string;
  buyerType: string;
  crop: string;
  cropsRequired: string[];
  quantityRequired: string;
  location: string;
  district: string;
  distance: string;
  contact: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'task' | 'fertilizer' | 'irrigation' | 'market' | 'soil' | 'other';
  read: boolean;
  time: string;
}
