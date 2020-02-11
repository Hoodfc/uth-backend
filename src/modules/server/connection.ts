import * as http from 'http';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as Redis from 'ioredis';
import * as cors from 'cors';
import context from './context';
import Context from '../types/Context';
import buildSchema from '../schema/buildSchema';
import session from './session';

export default async (
  PORT: string,
  emitSchema = false,
): Promise<void> => {
  //    create typeORM connection
  await createConnection();

  // express and redis declaration
  const app = express();
  const redisClient = new Redis();

  // allow cors requests from client
  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:3000',
    }),
  );

  // create session through redis client
  app.use(session(redisClient));

  const server = new ApolloServer({
    schema: await buildSchema(emitSchema),
    context: ({ req, res }): Context => context(req, res),
  });
  server.applyMiddleware({ app });

  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  await httpServer.listen(PORT);
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  console.log(
    `Subscriptions ready at http://localhost:${PORT}${
      server.subscriptionsPath
    }`,
  );
};
