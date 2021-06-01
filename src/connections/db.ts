import config from '../config';
import { Sequelize } from 'sequelize';

export default new Sequelize(
  config.db.NAME,
  config.db.USER,
  config.db.PASS,
  {
    host: config.db.HOST,
    dialect: config.db.DIALECT,
    pool: config.db.POOL,
  }
);