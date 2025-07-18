import { Request, Response } from 'express';
import { getUserAnalysisService } from '../services/userAnalysis.service';

export async function getUserAnalysisController(req: Request, res: Response) {
  const userId = req.kauth?.grant?.access_token?.content?.sub;
  if (!userId) {
    return res.status(401).json({ error: 'User ID not found in token' });
  }
  const analysis = await getUserAnalysisService(userId);
  if (!analysis) {
    return res.status(404).json({ error: 'User analysis not found' });
  }
  res.json(analysis);
} 