import { Request, Response } from 'express';
import { getTextAnalysisService } from '../services/textAnalysis.service';

export async function getTextAnalysisController(req: Request, res: Response) {
  const userId = req.user?.sub;
  const { textId } = req.params;
  if (!userId) {
    return res.status(401).json({ error: 'User ID not found in token' });
  }
  if (!textId) {
    return res.status(400).json({ error: 'textId is required' });
  }
  const analysis = await getTextAnalysisService(textId, userId);
  if (!analysis) {
    return res.status(404).json({ error: 'Text analysis not found' });
  }
  res.json(analysis);
} 