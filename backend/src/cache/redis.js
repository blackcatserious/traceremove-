import Redis from 'ioredis';
import { config } from '../config.js';
import { logger } from '../logger.js';

export const redis = new Redis(config.redis.url);

redis.on('error', (error) => {
  logger.error('Redis connection error', { error });
});

redis.on('connect', () => {
  logger.info('Connected to Redis cache');
});
