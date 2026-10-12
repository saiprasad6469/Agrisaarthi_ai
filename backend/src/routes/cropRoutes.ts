import { Router } from 'express';
import { getCrops, getCropById, recommendCropList } from '../controllers/cropController';

const router = Router();

router.get('/', getCrops);
router.get('/:id', getCropById);
router.post('/recommend', recommendCropList);

export default router;
