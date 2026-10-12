import { Router } from 'express';
import { getSoilLabs, getSoilLabById } from '../controllers/labController';

const router = Router();

router.get('/', getSoilLabs);
router.get('/nearby', getSoilLabs);
router.get('/:id', getSoilLabById);

export default router;
