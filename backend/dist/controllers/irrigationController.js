"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recommendIrrigation = void 0;
const recommendIrrigation = async (req, res) => {
    try {
        const { cropName = 'Tomato', soilType = 'Loam', waterAvailability = 'Moderate' } = req.body;
        const schedule = [
            { day: 'Day 1 - 10', frequency: 'Every 2 days', waterAmount: '25 mm / week', stage: 'Germination & Nursery' },
            { day: 'Day 11 - 35', frequency: 'Every 3-4 days', waterAmount: '35 mm / week', stage: 'Vegetative Growth' },
            { day: 'Day 36 - 65', frequency: 'Every 3 days', waterAmount: '45 mm / week', stage: 'Flowering & Fruit Set' },
            { day: 'Day 66 - 90', frequency: 'Every 4 days', waterAmount: '30 mm / week', stage: 'Fruit Ripening & Harvest' }
        ];
        return res.json({
            success: true,
            cropName,
            soilType,
            recommendedFrequency: 'Every 3 days',
            totalWaterRequirement: '450 - 550 mm',
            currentWeather: {
                temp: '28°C',
                condition: 'Partly Cloudy',
                humidity: '62%',
                rainfallProb: '10%',
                isDemoData: true
            },
            schedule,
            tips: [
                'Prefer drip irrigation in morning hours to minimize evaporation losses.',
                'Ensure proper drainage during heavy rain to avoid root rot.'
            ]
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.recommendIrrigation = recommendIrrigation;
