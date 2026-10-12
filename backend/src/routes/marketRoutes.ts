import { Router } from 'express';
import { getMarkets, getPrices } from '../controllers/marketController';

const router = Router();

router.get('/', getMarkets);
router.get('/prices', getPrices);

export default router;
