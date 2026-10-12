import { Response, Request } from 'express';
import { DEMO_MARKETS } from '../services/mockData';

export const getMarkets = async (req: Request, res: Response) => {
  try {
    const { crop, district } = req.query;

    let markets = DEMO_MARKETS;
    if (district) {
      markets = markets.filter((m) => m.district.toLowerCase().includes((district as string).toLowerCase()));
    }

    return res.json({
      success: true,
      markets,
      isDemoData: true,
      label: 'Demo Market Data'
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getPrices = async (req: Request, res: Response) => {
  try {
    return res.json({
      success: true,
      cropPrices: DEMO_MARKETS.map((m) => ({
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
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
