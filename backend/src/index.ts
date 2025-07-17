import 'dotenv/config';
import express, { Request, Response } from 'express';
import session from 'express-session';
import Keycloak from 'keycloak-connect';
import mongoose from 'mongoose';
import textRoutes from './routes/text.routes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

// --- MongoDB Connection ---
mongoose.connect(databaseUrl)
  .then(() => console.log('Connected to MongoDB database'))
  .catch((err: unknown) => {
    console.error('Failed to connect to MongoDB database:', err);
    process.exit(1);
  });

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

// --- Route Layer ---
app.use('/api', textRoutes(keycloak));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express + TypeScript!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});