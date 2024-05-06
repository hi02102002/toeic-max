import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from '@/config';
import { logger } from '@/utils/logger';
import type { LogWriter } from 'drizzle-orm/logger';
import { DefaultLogger } from 'drizzle-orm/logger';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client, Pool } from 'pg';
import * as schema from './schema';

class Logger implements LogWriter {
  write(message: string): void {
    logger.info(`[DATABASE] ${message}`);
  }
}

export const client = new Pool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: Number(DB_PORT || 54235),
  database: DB_NAME,
});

export const db = drizzle(client, {
  schema,
  logger: true,
});

export type DB = typeof db;
