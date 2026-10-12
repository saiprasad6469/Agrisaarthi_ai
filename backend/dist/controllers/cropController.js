"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recommendCropList = exports.getCropById = exports.getCrops = void 0;
const mockData_1 = require("../services/mockData");
const cropEngineService_1 = require("../services/cropEngineService");
const getCrops = async (req, res) => {
    try {
        return res.json({ success: true, crops: mockData_1.DEMO_CROPS });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.getCrops = getCrops;
const getCropById = async (req, res) => {
    try {
        const { id } = req.params;
        const crop = mockData_1.DEMO_CROPS.find((c) => c.id === id || c.name.toLowerCase() === id.toLowerCase());
        if (!crop)
            return res.status(404).json({ success: false, message: 'Crop details not found' });
        return res.json({ success: true, crop });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.getCropById = getCropById;
const recommendCropList = async (req, res) => {
    try {
        const { soilData, season = 'Kharif', waterAvailability = 'Moderate', district = 'Nizamabad' } = req.body;
        const nutrients = soilData || mockData_1.DEFAULT_SOIL_DATA;
        const recommendations = (0, cropEngineService_1.recommendCrops)(nutrients, season, waterAvailability, district);
        return res.json({
            success: true,
            recommendations,
            disclaimer: 'Recommendations are estimates based on deterministic agronomical matching rules and local soil data.'
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.recommendCropList = recommendCropList;
