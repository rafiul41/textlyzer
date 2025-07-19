import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import textRoutes from './routes/text.routes';
import userAnalysisRoutes from './routes/userAnalysis.routes';
import textAnalysisRoutes from './routes/textAnalysis.routes';
import { createClient } from 'redis';
import cors from 'cors';
import { UserInfo } from './types/userinfo';

// Augment Express Request type to include user
// (keep this for type safety in controllers)
declare global {
  namespace Express {
    interface Request {
      user?: UserInfo;
    }
  }
}

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://frontend:5173'],
  credentials: true
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.use(express.json());

// Use MONGO_URL from environment or default to Docker Compose service name
const databaseUrl = process.env.MONGO_URL || 'mongodb://mongo:27017/textlyzer';

if (!databaseUrl) {
  console.error('MONGO_URL is not set');
  process.exit(1);
}

// --- MongoDB Connection ---
mongoose.connect(databaseUrl)
  .then(() => console.log('Connected to MongoDB database'))
  .catch((err: unknown) => {
    console.error('Failed to connect to MongoDB database:', err);
    process.exit(1);
  });

// Redis client setup
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://redis:6379'
});
redisClient.connect()
  .then(() => console.log('Connected to Redis'))
  .catch((err) => console.error('Redis connection error:', err));

// --- Route Layer ---
app.use('/api', textRoutes);
app.use('/api', userAnalysisRoutes);
app.use('/api', textAnalysisRoutes);

// Health check or welcome route
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export redisClient for use in controllers
export { redisClient };