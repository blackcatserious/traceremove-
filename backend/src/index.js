import express from 'express';
import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import { config } from './config.js';
import { logger } from './logger.js';
import { restRouter } from './api/rest.js';
import { typeDefs, resolvers } from './api/graphql.js';

const app = express();
app.use(express.json());

app.use('/api', restRouter);

const startServer = async () => {
  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });

  app.use((err, _req, res, _next) => {
    logger.error('Unhandled error', { error: err });
    res.status(500).json({ message: 'Internal server error' });
  });

  const server = http.createServer(app);
  server.listen(config.port, () => {
    logger.info(`Backend service listening on port ${config.port}`);
  });
};

startServer().catch((error) => {
  logger.error('Failed to bootstrap backend service', { error });
  process.exit(1);
});
