import { Router } from 'express';
import { calculateProfit } from '../controllers/profitController';

const router = Router();

router.post('/calculate', calculateProfit);

export default router;
