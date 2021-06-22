import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import routes from '../routes';
import { LoggerStream } from './logger';

export default (app: express.Application) => {
  // katanya bagus kalo pake reverse proxy
  app.enable('trust proxy');

  if (process.env.NODE_ENV == 'production') {
    app.use(cors({
      origin: /\.?wisjulitb.com$/,
    }));
    app.use(morgan('combined', { stream: new LoggerStream() }));
  } else {
    app.use(cors());
    app.use(morgan('dev', { stream: new LoggerStream() }));
  }
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/', routes());

  // health check
  app.get('/status', (_, res) => res.status(200).end());
  app.head('/status', (_, res) => res.status(200).end());
}