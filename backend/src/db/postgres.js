import pkg from 'pg';
import { config } from '../config.js';
import { logger } from '../logger.js';

const { Pool } = pkg;

export const pool = new Pool({
  connectionString: config.postgres.connectionString,
});

pool.on('error', (error) => {
  logger.error('Unexpected Postgres client error', { error });
});

export const query = async (text, params) => {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  logger.debug('Executed query', { text, duration, rows: res.rowCount });
  return res;
};
