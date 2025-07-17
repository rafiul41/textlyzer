import { Request, Response } from 'express';
import {
  saveTextService,
  listTextsService,
  getTextService,
  updateTextService,
  deleteTextService
} from '../services/text.service';

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

export async function listTextsController(req: Request, res: Response) {
  try {
    const userId = req.kauth?.grant?.access_token?.content?.sub;
    if (!userId) {
      return res.status(401).json({ error: 'User ID not found in token' });
    }
    const texts = await listTextsService(userId);
    res.json(texts);
  } catch (err) {
    console.error('Error listing texts:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getTextController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const userId = req.kauth?.grant?.access_token?.content?.sub;
    if (!userId) {
      return res.status(401).json({ error: 'User ID not found in token' });
    }
    const text = await getTextService(id, userId);
    console.log(text);
    if (!text) {
      return res.status(404).json({ error: 'Text not found' });
    }
    res.json(text);
  } catch (err) {
    console.error('Error getting text:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function updateTextController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { content, title } = req.body;
    const userId = req.kauth?.grant?.access_token?.content?.sub;
    if (!userId) {
      return res.status(401).json({ error: 'User ID not found in token' });
    }
    const updated = await updateTextService(id, userId, { content, title });
    if (!updated) {
      return res.status(404).json({ error: 'Text not found' });
    }
    res.json(updated);
  } catch (err) {
    console.error('Error updating text:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function deleteTextController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const userId = req.kauth?.grant?.access_token?.content?.sub;
    if (!userId) {
      return res.status(401).json({ error: 'User ID not found in token' });
    }
    const deleted = await deleteTextService(id, userId);
    if (!deleted) {
      return res.status(404).json({ error: 'Text not found' });
    }
    res.json({ message: 'Text deleted' });
  } catch (err) {
    console.error('Error deleting text:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
} 