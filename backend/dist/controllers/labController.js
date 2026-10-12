"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSoilLabById = exports.getSoilLabs = void 0;
const mockData_1 = require("../services/mockData");
const getSoilLabs = async (req, res) => {
    try {
        const { district } = req.query;
        let labs = mockData_1.DEMO_SOIL_LABS;
        if (district) {
            labs = labs.filter((l) => l.district.toLowerCase() === district.toLowerCase());
        }
        return res.json({
            success: true,
            labs,
            isMockData: true,
            disclaimer: 'Laboratories listed include ICAR/Government & University partner centers.'
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.getSoilLabs = getSoilLabs;
const getSoilLabById = async (req, res) => {
    try {
        const { id } = req.params;
        const lab = mockData_1.DEMO_SOIL_LABS.find((l) => l.id === id);
        if (!lab)
            return res.status(404).json({ success: false, message: 'Soil lab not found' });
        return res.json({ success: true, lab });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.getSoilLabById = getSoilLabById;
