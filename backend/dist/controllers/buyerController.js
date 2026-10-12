"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBuyers = void 0;
const mockData_1 = require("../services/mockData");
const getBuyers = async (req, res) => {
    try {
        const { crop, district } = req.query;
        let buyers = mockData_1.DEMO_BUYERS;
        if (district) {
            buyers = buyers.filter((b) => b.district.toLowerCase().includes(district.toLowerCase()));
        }
        return res.json({
            success: true,
            buyers,
            isDemoData: true,
            label: 'Verified Buyer Directory (Demo Data)'
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.getBuyers = getBuyers;
