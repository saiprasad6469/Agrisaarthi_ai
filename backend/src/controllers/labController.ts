import { Response, Request } from 'express';
import { DEMO_SOIL_LABS } from '../services/mockData';

export const getSoilLabs = async (req: Request, res: Response) => {
  try {
    const { district } = req.query;

    let labs = DEMO_SOIL_LABS;
    if (district) {
      labs = labs.filter((l) => l.district.toLowerCase() === (district as string).toLowerCase());
    }

    return res.json({
      success: true,
      labs,
      isMockData: true,
      disclaimer: 'Laboratories listed include ICAR/Government & University partner centers.'
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getSoilLabById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const lab = DEMO_SOIL_LABS.find((l) => l.id === id);
    if (!lab) return res.status(404).json({ success: false, message: 'Soil lab not found' });
    return res.json({ success: true, lab });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
