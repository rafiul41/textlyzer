import 'dotenv/config';
import { Client } from 'pg';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

const client = new Client({
  connectionString: databaseUrl,
});

async function migrate() {
  try {
    await client.connect();
    // Check if table exists
    const checkTable = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'text'
      );
    `);
    const exists = checkTable.rows[0].exists;
    if (!exists) {
      console.log('Creating text table...');
      await client.query(`
        CREATE TABLE text (
          id SERIAL PRIMARY KEY,
          content TEXT NOT NULL,
          title VARCHAR(255) NOT NULL,
          createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
          updatedAt TIMESTAMP NOT NULL DEFAULT NOW(),
          userId VARCHAR(255) NOT NULL
        );
      `);
      console.log('text table created.');
    } else {
      console.log('text table already exists.');
    }
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

migrate(); 