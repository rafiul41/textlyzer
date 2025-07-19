import { Router } from 'express';
import {
  saveTextController,
  listTextsController,
  getTextController,
  updateTextController,
  deleteTextController
} from '../controllers/text.controller';
import { verifyToken } from '../middleware/verifyToken';

const router = Router();

router.post('/text', verifyToken, saveTextController);
router.get('/text/:id', verifyToken, getTextController);
router.get('/text', verifyToken, listTextsController);
router.put('/text/:id', verifyToken, updateTextController);
router.delete('/text/:id', verifyToken, deleteTextController);

export default router; 