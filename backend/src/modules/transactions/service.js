import { createTransaction, listTransactions, updateTransactionStatus } from './repository.js';
import { creditWallet } from '../wallets/service.js';
import { logger } from '../../logger.js';

export const orchestrateDeposit = async ({ walletId, amount, metadata }) => {
  const pending = await createTransaction({
    walletId,
    amount,
    status: 'pending',
    metadata,
  });

  const { wallet, settlementId } = await creditWallet({ walletId, amount });
  const settled = await updateTransactionStatus({ transactionId: pending.id, status: 'settled' });
  logger.info('Settled transaction', { transactionId: settled.id, settlementId });
  return { transaction: settled, wallet, settlementId };
};

export const getTransactions = async ({ walletId }) => listTransactions({ walletId });
