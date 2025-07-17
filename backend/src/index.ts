import express, { Request, Response } from 'express';
import { Client } from 'pg';

const app = express();
const PORT = process.env.PORT || 3001;

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

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express + TypeScript!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 