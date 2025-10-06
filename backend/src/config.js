import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  postgres: {
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/digital_asset',
  },
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },
};
