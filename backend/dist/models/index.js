"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = exports.notificationSchema = exports.Buyer = exports.buyerSchema = exports.Market = exports.marketSchema = exports.Recommendation = exports.recommendationSchema = exports.CropPlan = exports.cropPlanSchema = exports.Fertilizer = exports.fertilizerSchema = exports.Crop = exports.cropSchema = exports.SoilLab = exports.soilLabSchema = void 0;
__exportStar(require("./User"), exports);
__exportStar(require("./Farm"), exports);
__exportStar(require("./SoilReport"), exports);
const mongoose_1 = __importDefault(require("mongoose"));
exports.soilLabSchema = new mongoose_1.default.Schema({
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
exports.SoilLab = mongoose_1.default.model('SoilLab', exports.soilLabSchema);
exports.cropSchema = new mongoose_1.default.Schema({
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
exports.Crop = mongoose_1.default.model('Crop', exports.cropSchema);
exports.fertilizerSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    nutrients: { type: String, required: true },
    crop: { type: String, required: true },
    recommendedUsage: { type: String, required: true }
});
exports.Fertilizer = mongoose_1.default.model('Fertilizer', exports.fertilizerSchema);
exports.cropPlanSchema = new mongoose_1.default.Schema({
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
exports.CropPlan = mongoose_1.default.model('CropPlan', exports.cropPlanSchema);
exports.recommendationSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    soilData: Object,
    recommendations: Array,
    createdAt: { type: Date, default: Date.now }
});
exports.Recommendation = mongoose_1.default.model('Recommendation', exports.recommendationSchema);
exports.marketSchema = new mongoose_1.default.Schema({
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
exports.Market = mongoose_1.default.model('Market', exports.marketSchema);
exports.buyerSchema = new mongoose_1.default.Schema({
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
exports.Buyer = mongoose_1.default.model('Buyer', exports.buyerSchema);
exports.notificationSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ['task', 'fertilizer', 'irrigation', 'market', 'soil', 'other'], default: 'other' },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});
exports.Notification = mongoose_1.default.model('Notification', exports.notificationSchema);
