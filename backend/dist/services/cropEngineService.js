"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recommendCrops = recommendCrops;
const mockData_1 = require("./mockData");
function recommendCrops(soil, season = 'Kharif', waterAvailability = 'Moderate', district = 'Nizamabad') {
    const results = mockData_1.DEMO_CROPS.map((crop) => {
        // 1. Soil pH compatibility (30%)
        let soilScore = 0;
        if (soil.pH >= crop.pHRange.min && soil.pH <= crop.pHRange.max) {
            soilScore = 30;
        }
        else {
            const diff = Math.min(Math.abs(soil.pH - crop.pHRange.min), Math.abs(soil.pH - crop.pHRange.max));
            soilScore = Math.max(5, 30 - diff * 15);
        }
        // 2. Nutrient compatibility (20%)
        let nutrientScore = 15;
        if (soil.nitrogen > 60 && soil.potassium > 150)
            nutrientScore += 5;
        if (soil.organicCarbon >= 0.8)
            nutrientScore += 3;
        // 3. Water availability compatibility (15%)
        let waterScore = 15;
        if (crop.waterRequirement.toLowerCase().includes('high') && waterAvailability.toLowerCase().includes('low')) {
            waterScore = 5;
        }
        // 4. Season compatibility (15%)
        let seasonScore = 15;
        // 5. Location compatibility (10%)
        let locationScore = 10;
        // 6. Market demand (10%)
        let marketScore = crop.marketDemand === 'High' || crop.marketDemand === 'Very High' ? 10 : 7;
        const totalScore = Math.round(soilScore + nutrientScore + waterScore + seasonScore + locationScore + marketScore);
        const estimatedProfit = crop.estimatedRevenue - crop.cultivationCost;
        let explanation = '';
        if (crop.name === 'Tomato') {
            explanation = `Tomato is recommended because your soil pH (${soil.pH}), nutrient profile, and available water are reasonably suitable for this crop. Market demand in ${district} is currently strong.`;
        }
        else if (crop.name === 'Chilli') {
            explanation = `Chilli is well-suited for your ${soil.pH} pH soil and organic carbon levels (${soil.organicCarbon}%). It offers high net profit per acre with moderate water needs.`;
        }
        else if (crop.name === 'Maize (Corn)') {
            explanation = `Maize is a safe, low-risk crop suitable for your nutrient levels. Provides stable yield and assured demand from regional poultry feeds.`;
        }
        else {
            explanation = `${crop.name} matches your soil parameters and local climatic conditions. High expected yield under proper irrigation and fertilizer schedule.`;
        }
        return {
            cropId: crop.id,
            cropName: crop.name,
            category: crop.category,
            suitabilityScore: totalScore,
            duration: crop.duration,
            waterRequirement: crop.waterRequirement,
            expectedYield: crop.expectedYield,
            estimatedCost: crop.cultivationCost,
            estimatedRevenue: crop.estimatedRevenue,
            estimatedProfit,
            risk: crop.risks[0] || 'Low to Moderate',
            marketDemand: crop.marketDemand,
            whyThisCrop: explanation
        };
    });
    // Sort descending by suitability score
    return results.sort((a, b) => b.suitabilityScore - a.suitabilityScore);
}
