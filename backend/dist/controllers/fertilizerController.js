"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recommendFertilizers = void 0;
const mockData_1 = require("../services/mockData");
const recommendFertilizers = async (req, res) => {
    try {
        const { cropName = 'Tomato', farmSize = 5, soilData = mockData_1.DEFAULT_SOIL_DATA } = req.body;
        const acres = Number(farmSize) || 5;
        const fertilizers = [
            {
                id: 'f-1',
                nutrientDeficiency: 'Nitrogen (N)',
                fertilizerType: 'Urea',
                quantityPerAcre: '25 kg/acre',
                totalQuantity: `${25 * acres} kg`,
                applicationSchedule: 'Before planting & 30 days post-sowing'
            },
            {
                id: 'f-2',
                nutrientDeficiency: 'Phosphorus (P)',
                fertilizerType: 'DAP (Di-ammonium Phosphate)',
                quantityPerAcre: '15 kg/acre',
                totalQuantity: `${15 * acres} kg`,
                applicationSchedule: 'At land preparation / planting'
            },
            {
                id: 'f-3',
                nutrientDeficiency: 'Potassium (K)',
                fertilizerType: 'MOP (Muriate of Potash)',
                quantityPerAcre: '10 kg/acre',
                totalQuantity: `${10 * acres} kg`,
                applicationSchedule: '30 & 60 days post-sowing'
            },
            {
                id: 'f-4',
                nutrientDeficiency: 'Zinc (Zn)',
                fertilizerType: 'Zinc Sulphate 21%',
                quantityPerAcre: '2 kg/acre',
                totalQuantity: `${2 * acres} kg`,
                applicationSchedule: 'Basal dose'
            }
        ];
        return res.json({
            success: true,
            cropName,
            farmSize: acres,
            fertilizers,
            disclaimer: 'These recommendations are estimates based on available soil and crop information. Follow local agricultural expert guidance and fertilizer product labels before application.'
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.recommendFertilizers = recommendFertilizers;
