import config from '../config';
import db from '../models';
import expressLoader from './express';
import logger from './logger';
import { Application } from 'express';

export default async (app: Application) => {
  expressLoader(app);

  await db.sequelize.sync();

  app.listen(config.PORT, () => {
    logger.info(`
    =============================
    #Server started on port ${config.PORT}#
    =============================
    `);
  });
}