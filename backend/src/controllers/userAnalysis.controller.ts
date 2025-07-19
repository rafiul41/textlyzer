import { Request, Response } from 'express';
import { getUserAnalysisService } from '../services/userAnalysis.service';
import { createClient } from 'redis';

// Use localhost for Redis when running backend on host machine
const redisClient = createClient({
  url: 'redis://localhost:6379'
});
redisClient.connect().catch(console.error);

export async function getUserAnalysisController(req: Request, res: Response) {
  const userId = req.kauth?.grant?.access_token?.content?.sub;
  if (!userId) {
    return res.status(401).json({ error: 'User ID not found in token' });
  }

  const cacheKey = `user-analysis:${userId}`;
  try {
    // Try to get cached data
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return res.json(JSON.parse(cached));
    }
  } catch (err) {
    console.error('Redis get error:', err);
    // Proceed to fetch from DB if Redis fails
  }

  const analysis = await getUserAnalysisService(userId);
  if (!analysis) {
    return res.status(404).json({ error: 'User analysis not found' });
  }

  // Cache the result for 10 minutes
  try {
    await redisClient.set(cacheKey, JSON.stringify(analysis), { EX: 600 });
  } catch (err) {
    console.error('Redis set error:', err);
  }

  res.json(analysis);
} 