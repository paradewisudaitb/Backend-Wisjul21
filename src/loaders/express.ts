import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import morganBody from 'morgan-body';
import logger, { loggerStream } from './logger';
import HttpException from '../routes/middleware/HttpException';
import routes from '../routes';

export default (app: express.Application) => {
  // katanya bagus kalo pake reverse proxy
  app.enable('trust proxy');

  if (process.env.NODE_ENV == 'production') {
    app.use(cors({
      origin: /\.?wisjulitb.com$/,
    }));
  } else {
    app.use(cors());
  }
  morganBody(app, {
    logIP: true,
    timezone: 'Asia/Jakarta',
    prettify: true,
    stream: loggerStream,
  });
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/', routes());

  // health check
  app.get('/status', (_, res) => res.status(200).end());
  app.head('/status', (_, res) => res.status(200).end());

  // error handling
  app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status).json({
      message: err.message,
      status: err.status,
    });
    logger.error(err.stack);
  })
}