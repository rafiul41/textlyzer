import 'dotenv/config';
import express, { Request, Response } from 'express';
import session from 'express-session';
import Keycloak from 'keycloak-connect';
import mongoose, { Schema, Document, model } from 'mongoose';

declare global {
  namespace Express {
    interface Request {
      kauth?: any;
    }
  }
}

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
} else {
  console.log(databaseUrl);
}

// --- MongoDB Connection ---
mongoose.connect(databaseUrl)
  .then(() => console.log('Connected to MongoDB database'))
  .catch((err: unknown) => {
    console.error('Failed to connect to MongoDB database:', err);
    process.exit(1);
  });

// --- Mongoose Model ---
interface IText extends Document {
  content: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

const textSchema = new Schema<IText>({
  content: { type: String, required: true },
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  userId: { type: String, required: true },
});

const TextModel = model<IText>('Text', textSchema);

// Session and Keycloak setup
const memoryStore = new session.MemoryStore();
app.use(session({
  secret: 'session-secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore,
}));

const keycloak = new Keycloak({ store: memoryStore });
app.use(keycloak.middleware());

// --- Service Layer ---
async function saveTextService({ content, title, userId }: { content: string; title: string; userId: string }) {
  const now = new Date();
  const text = new TextModel({ content, title, createdAt: now, updatedAt: now, userId });
  await text.save();
  return text;
}

// --- Controller Layer ---
async function saveTextController(req: Request, res: Response) {
  try {
    console.log("IN THE CONTROLLER");
    const { content, title } = req.body;
    if (!content || !title) {
      return res.status(400).json({ error: 'content and title are required' });
    }
    // Keycloak attaches token info to req.kauth.grant.access_token.content
    // userId is typically in the sub claim
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

// --- Route Layer ---
app.post('/api/text', keycloak.protect(), saveTextController);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express + TypeScript!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 