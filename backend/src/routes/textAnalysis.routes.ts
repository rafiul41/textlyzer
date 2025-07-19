import { Router } from 'express';
import { getTextAnalysisController } from '../controllers/textAnalysis.controller';
import { verifyToken } from '../middleware/verifyToken';

const router = Router();

router.get('/text-analysis/:textId', verifyToken, getTextAnalysisController);

export default router; 