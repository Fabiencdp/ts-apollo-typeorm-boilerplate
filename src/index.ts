import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';

import dotenv from 'dotenv';
dotenv.config();

import schema from './graphql';
import initConnection from './connection';
import initCron from './cron';

const app = express();

const {
  NODE_ENV: env = 'development',
  PORT: port = 4000,
} = process.env;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Apollo server
const server = new ApolloServer({
  schema,
  context: ({ req, res }) => {
    let headers = {};

    if (req && req.headers) {
      ({ headers } = req);
    }

    return { headers };
  },
});
server.applyMiddleware({ app });

// Http serer
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);


httpServer.listen(port, () => {
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
  console.log(`Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`);

  // Init db connection
  initConnection().then(() => {
    initCron();
  });
});
