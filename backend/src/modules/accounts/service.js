import { createUser, findUserByEmail, listUsers } from './repository.js';
import { redis } from '../../cache/redis.js';
import { logger } from '../../logger.js';

const USER_CACHE_TTL = 300; // seconds

export const registerUser = async ({ email, name }) => {
  const cached = await redis.get(`user:${email}`);
  if (cached) {
    return JSON.parse(cached);
  }

  const existing = await findUserByEmail(email);
  if (existing) {
    return existing;
  }

  const user = await createUser({ email, name, status: 'pending' });
  await redis.set(`user:${email}`, JSON.stringify(user), 'EX', USER_CACHE_TTL);
  logger.info('Registered user', { userId: user.id });
  return user;
};

export const getUsers = async () => {
  const users = await listUsers();
  return users;
};
