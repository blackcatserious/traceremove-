import { query } from '../../db/postgres.js';

export const createTransaction = async ({ walletId, amount, status, metadata }) => {
  const { rows } = await query(
    `INSERT INTO transactions (wallet_id, amount, status, metadata)
     VALUES ($1, $2, $3, $4)
     RETURNING id, wallet_id, amount, status, metadata, created_at`,
    [walletId, amount, status, metadata]
  );
  return rows[0];
};

export const updateTransactionStatus = async ({ transactionId, status }) => {
  const { rows } = await query(
    `UPDATE transactions SET status = $2
     WHERE id = $1
     RETURNING id, wallet_id, amount, status, metadata, created_at`,
    [transactionId, status]
  );
  return rows[0];
};

export const listTransactions = async ({ walletId }) => {
  const { rows } = await query(
    `SELECT id, wallet_id, amount, status, metadata, created_at
     FROM transactions
     WHERE wallet_id = $1
     ORDER BY created_at DESC`,
    [walletId]
  );
  return rows;
};
