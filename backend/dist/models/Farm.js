"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Farm = exports.farmSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.farmSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    farmSize: { type: Number, required: true, default: 5 },
    location: {
        latitude: { type: Number, default: 18.6725 },
        longitude: { type: Number, default: 78.0941 },
        village: { type: String, default: 'Peddapur' },
        district: { type: String, default: 'Nizamabad' },
        state: { type: String, default: 'Telangana' }
    },
    soilType: { type: String, default: 'Loam' },
    currentCrop: { type: String, default: 'Tomato' },
    currentStage: { type: String, default: 'Vegetative' },
    sowingDate: { type: Date, default: () => new Date(Date.now() - 25 * 86400000) }
});
exports.Farm = mongoose_1.default.model('Farm', exports.farmSchema);
