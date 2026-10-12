import { Response, Request } from 'express';
import { DEMO_BUYERS } from '../services/mockData';

export const getBuyers = async (req: Request, res: Response) => {
  try {
    const { crop, district } = req.query;

    let buyers = DEMO_BUYERS;
    if (district) {
      buyers = buyers.filter((b) => b.district.toLowerCase().includes((district as string).toLowerCase()));
    }

    return res.json({
      success: true,
      buyers,
      isDemoData: true,
      label: 'Verified Buyer Directory (Demo Data)'
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
