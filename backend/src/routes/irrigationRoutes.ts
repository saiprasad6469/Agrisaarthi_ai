import { Router } from 'express';
import { recommendIrrigation } from '../controllers/irrigationController';

const router = Router();

router.post('/recommend', recommendIrrigation);

export default router;
