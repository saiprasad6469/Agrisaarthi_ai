export * from './User';
export * from './Farm';
export * from './SoilReport';

import mongoose from 'mongoose';

export const soilLabSchema = new mongoose.Schema({
  name: { type: String, required: true },
  authorizationStatus: { type: String, required: true },
  address: { type: String, required: true },
  district: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  distance: { type: String, default: '5 km' },
  contact: { type: String, required: true },
  openingHours: { type: String, default: '9:00 AM - 5:00 PM' }
});

export const SoilLab = mongoose.model('SoilLab', soilLabSchema);

export const cropSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, default: 'Vegetable' },
  pHRange: { min: Number, max: Number },
  waterRequirement: { type: String, required: true },
  duration: { type: String, required: true },
  durationDays: { type: Number, default: 90 },
  sowingPeriod: { type: String, required: true },
  harvestPeriod: { type: String, required: true },
  expectedYield: { type: String, required: true },
  cultivationCost: { type: Number, required: true },
  estimatedRevenue: { type: Number, required: true },
  marketDemand: { type: String, default: 'High' },
  risks: [{ type: String }],
  description: { type: String }
});

export const Crop = mongoose.model('Crop', cropSchema);

export const fertilizerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nutrients: { type: String, required: true },
  crop: { type: String, required: true },
  recommendedUsage: { type: String, required: true }
});

export const Fertilizer = mongoose.model('Fertilizer', fertilizerSchema);

export const cropPlanSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  cropId: { type: String, required: true },
  cropName: { type: String, required: true },
  farmSize: { type: Number, required: true },
  tasks: [{
    id: String,
    day: Number,
    title: String,
    description: String,
    category: String,
    status: { type: String, enum: ['upcoming', 'completed'], default: 'upcoming' },
    dueDate: String
  }],
  irrigationSchedule: [{ day: Number, note: String }],
  fertilizerSchedule: [{ day: Number, note: String }],
  createdAt: { type: Date, default: Date.now }
});

export const CropPlan = mongoose.model('CropPlan', cropPlanSchema);

export const recommendationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  soilData: Object,
  recommendations: Array,
  createdAt: { type: Date, default: Date.now }
});

export const Recommendation = mongoose.model('Recommendation', recommendationSchema);

export const marketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  district: { type: String, required: true },
  crop: { type: String, required: true },
  currentPrice: { type: String, required: true },
  pricePerKg: { type: Number, default: 20 },
  trend: { type: String, default: 'Up 12%' },
  trendDirection: { type: String, default: 'up' },
  distance: { type: String, default: '5 km' },
  demand: { type: String, default: 'High' },
  lastUpdated: { type: String, default: '2 hrs ago' },
  priceHistory: [{ date: String, price: Number }]
});

export const Market = mongoose.model('Market', marketSchema);

export const buyerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  buyerType: { type: String, default: 'Wholesaler' },
  crop: { type: String, required: true },
  cropsRequired: [{ type: String }],
  quantityRequired: { type: String, required: true },
  location: { type: String, required: true },
  district: { type: String, required: true },
  distance: { type: String, default: '12 km' },
  contact: { type: String, required: true }
});

export const Buyer = mongoose.model('Buyer', buyerSchema);

export const notificationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['task', 'fertilizer', 'irrigation', 'market', 'soil', 'other'], default: 'other' },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export const Notification = mongoose.model('Notification', notificationSchema);
