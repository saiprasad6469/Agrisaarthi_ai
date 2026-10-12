import { Response, Request } from 'express';
import { DEMO_CROPS, DEFAULT_SOIL_DATA } from '../services/mockData';
import { recommendCrops } from '../services/cropEngineService';

export const getCrops = async (req: Request, res: Response) => {
  try {
    return res.json({ success: true, crops: DEMO_CROPS });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getCropById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const crop = DEMO_CROPS.find((c) => c.id === id || c.name.toLowerCase() === id.toLowerCase());
    if (!crop) return res.status(404).json({ success: false, message: 'Crop details not found' });
    return res.json({ success: true, crop });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const recommendCropList = async (req: Request, res: Response) => {
  try {
    const { soilData, season = 'Kharif', waterAvailability = 'Moderate', district = 'Nizamabad' } = req.body;
    const nutrients = soilData || DEFAULT_SOIL_DATA;

    const recommendations = recommendCrops(nutrients, season, waterAvailability, district);

    return res.json({
      success: true,
      recommendations,
      disclaimer: 'Recommendations are estimates based on deterministic agronomical matching rules and local soil data.'
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
