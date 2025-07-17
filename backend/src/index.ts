import 'dotenv/config';
import express, { Request, Response } from 'express';
import session from 'express-session';
import Keycloak from 'keycloak-connect';
import { Client } from 'pg';

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
}

const client = new Client({
  connectionString: databaseUrl,
});

client.connect()
  .then(() => console.log('Connected to Postgres database'))
  .catch((err: unknown) => {
    console.error('Failed to connect to Postgres database:', err);
    process.exit(1);
  });

// Session and Keycloak setup
const memoryStore = new session.MemoryStore();
app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore,
}));

const keycloak = new Keycloak({ store: memoryStore });
app.use(keycloak.middleware());

// --- Service Layer ---
async function saveTextService({ content, title, userId }: { content: string; title: string; userId: string }) {
  const now = new Date();
  const query = `
    INSERT INTO text (content, title, createdAt, updatedAt, userId)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, content, title, createdAt, updatedAt, userId
  `;
  const values = [content, title, now, now, userId];
  const result = await client.query(query, values);
  return result.rows[0];
}

// --- Controller Layer ---
async function saveTextController(req: Request, res: Response) {
  try {
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