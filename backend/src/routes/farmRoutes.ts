import { Router } from 'express';
import { getFarm, updateFarm, updateLocation } from '../controllers/farmController';
import { protectFarmer } from '../middleware/authMiddleware';

const router = Router();

router.get('/', protectFarmer, getFarm);
router.put('/', protectFarmer, updateFarm);
router.put('/location', protectFarmer, updateLocation);

export default router;
