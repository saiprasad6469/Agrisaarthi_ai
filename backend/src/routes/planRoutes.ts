import { Router } from 'express';
import { createCropPlan, getCropPlans, updateTaskStatus } from '../controllers/planController';
import { protectFarmer } from '../middleware/authMiddleware';

const router = Router();

router.post('/', protectFarmer, createCropPlan);
router.get('/', protectFarmer, getCropPlans);
router.put('/tasks/:taskId', protectFarmer, updateTaskStatus);

export default router;
