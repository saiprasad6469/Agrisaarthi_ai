"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateProfit = void 0;
const calculateProfit = async (req, res) => {
    try {
        const { farmSize = 5, cropName = 'Tomato', seedCost = 4000, fertilizerCost = 8000, laborCost = 10000, waterCost = 3000, pesticideCost = 4000, otherCost = 3000, expectedYieldPerAcre = 12, // in tons or quintals
        expectedMarketPrice = 19000 // per ton or ₹19/kg = ₹19,000/ton
         } = req.body;
        const acres = Number(farmSize) || 5;
        const seedTotal = Number(seedCost) * acres;
        const fertilizerTotal = Number(fertilizerCost) * acres;
        const laborTotal = Number(laborCost) * acres;
        const waterTotal = Number(waterCost) * acres;
        const pesticideTotal = Number(pesticideCost) * acres;
        const otherTotal = Number(otherCost) * acres;
        const totalExpenses = seedTotal + fertilizerTotal + laborTotal + waterTotal + pesticideTotal + otherTotal;
        const costPerAcre = Math.round(totalExpenses / acres);
        const totalProduction = Number(expectedYieldPerAcre) * acres; // e.g. 60 tons
        const expectedRevenue = totalProduction * Number(expectedMarketPrice);
        const revenuePerAcre = Math.round(expectedRevenue / acres);
        const estimatedProfit = expectedRevenue - totalExpenses;
        const profitPerAcre = Math.round(estimatedProfit / acres);
        const breakEvenPrice = totalProduction > 0 ? Math.round(totalExpenses / totalProduction) : 0;
        const expensesBreakdown = [
            { category: 'Seeds / Saplings', amount: seedTotal },
            { category: 'Fertilizers & Nutrients', amount: fertilizerTotal },
            { category: 'Labor & Weeding', amount: laborTotal },
            { category: 'Irrigation & Power', amount: waterTotal },
            { category: 'Crop Protection & Pesticides', amount: pesticideTotal },
            { category: 'Machinery & Other', amount: otherTotal }
        ];
        return res.json({
            success: true,
            cropName,
            farmSize: acres,
            totalExpenses,
            costPerAcre,
            totalProduction,
            expectedRevenue,
            revenuePerAcre,
            estimatedProfit,
            profitPerAcre,
            breakEvenPrice,
            riskLevel: estimatedProfit > 0 ? 'Low to Moderate' : 'High',
            expensesBreakdown,
            disclaimer: 'Profit estimates are indicative and may change due to yield, weather, market prices and input costs.'
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.calculateProfit = calculateProfit;
