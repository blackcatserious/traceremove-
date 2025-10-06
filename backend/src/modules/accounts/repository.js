import { query } from '../../db/postgres.js';

export const createUser = async ({ email, name, status }) => {
  const { rows } = await query(
    `INSERT INTO users (email, name, status)
     VALUES ($1, $2, $3)
     RETURNING id, email, name, status, created_at`,
    [email, name, status]
  );
  return rows[0];
};

export const findUserByEmail = async (email) => {
  const { rows } = await query(
    `SELECT id, email, name, status, created_at
     FROM users
     WHERE email = $1`,
    [email]
  );
  return rows[0];
};

export const listUsers = async () => {
  const { rows } = await query(
    'SELECT id, email, name, status, created_at FROM users ORDER BY created_at DESC'
  );
  return rows;
};
