import express from 'express';
import { registerUser, getUsers } from '../modules/accounts/service.js';
import { provisionWallet, getWallet } from '../modules/wallets/service.js';
import { orchestrateDeposit, getTransactions } from '../modules/transactions/service.js';

export const restRouter = express.Router();

restRouter.post('/users', async (req, res, next) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

restRouter.get('/users', async (_req, res, next) => {
  try {
    res.json(await getUsers());
  } catch (error) {
    next(error);
  }
});

restRouter.post('/wallets', async (req, res, next) => {
  try {
    const wallet = await provisionWallet(req.body);
    res.status(201).json(wallet);
  } catch (error) {
    next(error);
  }
});

restRouter.get('/wallets/:id', async (req, res, next) => {
  try {
    const wallet = await getWallet(req.params.id);
    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }
    res.json(wallet);
  } catch (error) {
    next(error);
  }
});

restRouter.post('/transactions/deposit', async (req, res, next) => {
  try {
    const result = await orchestrateDeposit(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

restRouter.get('/wallets/:id/transactions', async (req, res, next) => {
  try {
    const transactions = await getTransactions({ walletId: req.params.id });
    res.json(transactions);
  } catch (error) {
    next(error);
  }
});
