import { Router } from 'express';
import { register, login, getMe, updateProfile, deleteAccount } from '../controllers/authController';
import { protectFarmer } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protectFarmer, getMe);
router.put('/profile', protectFarmer, updateProfile);
router.delete('/account', protectFarmer, deleteAccount);

export default router;
