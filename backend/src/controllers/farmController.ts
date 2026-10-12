import { Response } from 'express';
import { AuthRequest } from '../types';
import { Farm } from '../models/Farm';
import { memoryFarms, defaultFarmerId } from './authController';

export const getFarm = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId || defaultFarmerId;

    let farmObj: any = null;
    try {
      farmObj = await Farm.findOne({ userId });
    } catch (dbErr) {
      farmObj = memoryFarms.get(userId);
    }

    if (!farmObj && memoryFarms.has(userId)) {
      farmObj = memoryFarms.get(userId);
    }

    if (!farmObj) {
      farmObj = {
        userId,
        farmSize: 5,
        location: {
          latitude: 18.6725,
          longitude: 78.0941,
          village: 'Peddapur',
          district: 'Nizamabad',
          state: 'Telangana'
        },
        soilType: 'Loam',
        currentCrop: 'Tomato',
        currentStage: 'Vegetative',
        sowingDate: new Date(Date.now() - 25 * 86400000)
      };
      memoryFarms.set(userId, farmObj);
    }

    return res.json({ success: true, farm: farmObj });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateFarm = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId || defaultFarmerId;
    const { farmSize, soilType, currentCrop, currentStage, village, district, state, latitude, longitude } = req.body;

    try {
      let farm = await Farm.findOne({ userId });
      if (farm) {
        if (farmSize !== undefined) farm.farmSize = Number(farmSize);
        if (soilType) farm.soilType = soilType;
        if (currentCrop) farm.currentCrop = currentCrop;
        if (currentStage) farm.currentStage = currentStage;
        if (village || district || state || latitude || longitude) {
          farm.location = {
            village: village || (farm.location ? farm.location.village : 'Peddapur'),
            district: district || (farm.location ? farm.location.district : 'Nizamabad'),
            state: state || (farm.location ? farm.location.state : 'Telangana'),
            latitude: latitude ? Number(latitude) : (farm.location ? farm.location.latitude : 18.6725),
            longitude: longitude ? Number(longitude) : (farm.location ? farm.location.longitude : 78.0941)
          };
        }
        await farm.save();
        return res.json({ success: true, message: 'Farm details updated', farm });
      }
    } catch (dbErr) {
      // Memory fallback
    }

    let memFarm = memoryFarms.get(userId) || {
      userId,
      farmSize: 5,
      location: { village: 'Peddapur', district: 'Nizamabad', state: 'Telangana', latitude: 18.6725, longitude: 78.0941 },
      soilType: 'Loam',
      currentCrop: 'Tomato',
      currentStage: 'Vegetative'
    };

    if (farmSize !== undefined) memFarm.farmSize = Number(farmSize);
    if (soilType) memFarm.soilType = soilType;
    if (currentCrop) memFarm.currentCrop = currentCrop;
    if (currentStage) memFarm.currentStage = currentStage;

    if (village || district || state || latitude || longitude) {
      memFarm.location = {
        village: village || memFarm.location.village,
        district: district || memFarm.location.district,
        state: state || memFarm.location.state,
        latitude: latitude ? Number(latitude) : memFarm.location.latitude,
        longitude: longitude ? Number(longitude) : memFarm.location.longitude
      };
    }

    memoryFarms.set(userId, memFarm);
    return res.json({ success: true, message: 'Farm details updated', farm: memFarm });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateLocation = async (req: AuthRequest, res: Response) => {
  try {
    return updateFarm(req, res);
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
