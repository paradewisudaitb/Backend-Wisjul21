import config from './config';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import db from './models';
import routes from './routes';
import HttpException from './routes/middleware/HttpException';

const app = express();

const corsWhitelist = ['https://wisjulitb.comm', 'http://staging.wisjulitb.com'];

// katanya bagus kalo pake reverse proxy
app.enable('trust proxy');
app.use(cors({
  origin: (origin, callback) => {
    if (origin && corsWhitelist.indexOf(origin) != -1) {
      callback(null, true);
    } else {
      callback(new HttpException(403, 'Not allowed by CORS'));
    }
  },
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes());

// health check
app.get('/status', (_, res) => res.status(200).end());
app.head('/status', (_, res) => res.status(200).end());

db.sequelize.sync().then(() => {
  app.listen(config.PORT, () => {
    console.log(`Server started on port ${config.PORT}`);
  });
});
