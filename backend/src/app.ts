require('dotenv').config()

import express from 'express';
import config from 'config';
import cors from 'cors';

import log from './logger';
import db from './models';
import routes from './routes';

declare global {
  namespace Express {
    interface Request {
      user?: any,
    }
  }
}

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();

// Parses incoming requests with JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

db.sequelize.sync().then(() => {
  app.listen(port, host, () => {
    log.info(`Server listing at http://${host}:${port}`);

    routes(app);
  });
});
