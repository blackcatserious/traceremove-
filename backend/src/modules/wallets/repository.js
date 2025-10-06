import { query } from '../../db/postgres.js';

export const createWallet = async ({ userId, network }) => {
  const { rows } = await query(
    `INSERT INTO wallets (user_id, network)
     VALUES ($1, $2)
     RETURNING id, user_id, network, balance, created_at`,
    [userId, network]
  );
  return rows[0];
};

export const getWalletById = async (id) => {
  const { rows } = await query(
    `SELECT id, user_id, network, balance, created_at
     FROM wallets WHERE id = $1`,
    [id]
  );
  return rows[0];
};

export const updateWalletBalance = async ({ walletId, delta }) => {
  const { rows } = await query(
    `UPDATE wallets
     SET balance = balance + $2
     WHERE id = $1
     RETURNING id, user_id, network, balance, created_at`,
    [walletId, delta]
  );
  return rows[0];
};
