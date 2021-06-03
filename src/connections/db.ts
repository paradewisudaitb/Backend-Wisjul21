import config from '../config';
import { Sequelize } from 'sequelize';

const conn = new Sequelize(
  config.db.NAME,
  config.db.USER,
  config.db.PASS,
  {
    host: config.db.HOST,
    dialect: config.db.DIALECT,
    pool: config.db.POOL,
  }
);

export default conn;