import { Router } from 'express';
import { getUserAnalysisController } from '../controllers/userAnalysis.controller';
import { verifyToken } from '../middleware/verifyToken';

const router = Router();

router.get('/user-analysis', verifyToken, getUserAnalysisController);

export default router; 