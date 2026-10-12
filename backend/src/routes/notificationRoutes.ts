import { Router } from 'express';
import { getNotifications, markRead } from '../controllers/notificationController';
import { protectFarmer } from '../middleware/authMiddleware';

const router = Router();

router.get('/', protectFarmer, getNotifications);
router.put('/:id/read', protectFarmer, markRead);

export default router;
