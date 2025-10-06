import { v4 as uuid } from 'uuid';
import { createWallet, getWalletById, updateWalletBalance } from './repository.js';
import { logger } from '../../logger.js';

export const provisionWallet = async ({ userId, network }) => {
  const wallet = await createWallet({ userId, network });
  logger.info('Provisioned wallet', { walletId: wallet.id, userId });
  return wallet;
};

export const creditWallet = async ({ walletId, amount }) => {
  const settlementId = uuid();
  const wallet = await updateWalletBalance({ walletId, delta: amount });
  logger.info('Credited wallet balance', { walletId, amount, settlementId });
  return { wallet, settlementId };
};

export const getWallet = async (walletId) => {
  return getWalletById(walletId);
};
