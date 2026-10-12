"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrices = exports.getMarkets = void 0;
const mockData_1 = require("../services/mockData");
const getMarkets = async (req, res) => {
    try {
        const { crop, district } = req.query;
        let markets = mockData_1.DEMO_MARKETS;
        if (district) {
            markets = markets.filter((m) => m.district.toLowerCase().includes(district.toLowerCase()));
        }
        return res.json({
            success: true,
            markets,
            isDemoData: true,
            label: 'Demo Market Data'
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.getMarkets = getMarkets;
const getPrices = async (req, res) => {
    try {
        return res.json({
            success: true,
            cropPrices: mockData_1.DEMO_MARKETS.map((m) => ({
                marketName: m.name,
                crop: m.crop,
                currentPrice: m.currentPrice,
                trend: m.trend,
                distance: m.distance,
                demand: m.demand,
                lastUpdated: m.lastUpdated
            })),
            isDemoData: true,
            label: 'Demo Market Prices'
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.getPrices = getPrices;
