"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoilReport = exports.soilReportSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.soilReportSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    fileUrl: { type: String, default: '' },
    fileType: { type: String, default: 'pdf' },
    extractedValues: {
        pH: Number,
        nitrogen: Number,
        phosphorus: Number,
        potassium: Number,
        organicCarbon: Number,
        sulfur: Number,
        zinc: Number,
        iron: Number
    },
    verifiedValues: {
        pH: Number,
        nitrogen: Number,
        phosphorus: Number,
        potassium: Number,
        organicCarbon: Number,
        sulfur: Number,
        zinc: Number,
        iron: Number
    },
    verificationStatus: { type: String, enum: ['pending', 'verified'], default: 'verified' },
    uploadedAt: { type: Date, default: Date.now }
});
exports.SoilReport = mongoose_1.default.model('SoilReport', exports.soilReportSchema);
