import { Router } from 'express';
import { uploadReport, getReports, verifySoilData, analyzeSoil } from '../controllers/soilController';
import { protectFarmer } from '../middleware/authMiddleware';
import { uploadSoilReport } from '../middleware/uploadMiddleware';

const router = Router();

router.post('/reports', protectFarmer, uploadSoilReport.single('reportFile'), uploadReport);
router.get('/reports', protectFarmer, getReports);
router.post('/verify', protectFarmer, verifySoilData);
router.post('/analyze', analyzeSoil);

export default router;
