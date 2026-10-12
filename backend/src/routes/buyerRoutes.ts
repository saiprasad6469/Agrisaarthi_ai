import { Router } from 'express';
import { getBuyers } from '../controllers/buyerController';

const router = Router();

router.get('/', getBuyers);

export default router;
