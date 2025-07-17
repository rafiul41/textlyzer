import { Request, Response } from 'express';
import { saveTextService } from '../services/text.service';

declare module 'express' {
  interface Request {
    kauth?: any;
  }
}

export async function saveTextController(req: Request, res: Response) {
  try {
    const { content, title } = req.body;
    if (!content || !title) {
      return res.status(400).json({ error: 'content and title are required' });
    }
    const userId = req.kauth?.grant?.access_token?.content?.sub;
    if (!userId) {
      return res.status(401).json({ error: 'User ID not found in token' });
    }
    const saved = await saveTextService({ content, title, userId });
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error saving text:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
} 