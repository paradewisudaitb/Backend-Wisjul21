import { Dialect } from 'sequelize';
import dotenv from 'dotenv';

const envFound = dotenv.config();

/**
 * Fungsi untu memfilter nama dbms menjadi dialect sequelize.
 * @param name nama dbms yang ingin digunakan
 * @returns dialect dbms untuk sequelize, default adalah postgresql
 */
const filterDBMS = (name?: string): Dialect => {
  if (!name) {
    return 'postgres';
  }

  switch (name) {
    case 'mysql':
      return 'mysql';
    case 'mariadb':
      return 'mariadb';
    case 'mssql':
      return 'mssql';
    case 'sqlite':
      return 'sqlite';
    default:
      return 'postgres';
  }
};

if (envFound.error) {
  console.log('Gagal me-load config dari .env');
}

export default {
  /*** Express configs ***/
  /**
   * Port untuk express
   * @default 5000
   * @type {number}
   */
  PORT: parseInt(process.env.PORT || '5000'),

  /*** Database configs ***/
  /**
   * Konfigurasi-konfigurasi database
   */
  db: {
    /**
     * Host ke database
     * @default localhost
     * @type {string}
     */
    HOST: process.env.DB_HOST || 'localhost',
    /**
     * Port ke database
     * @default 5432
     * @type {number}
     */
    PORT: parseInt(process.env.DB_PORT || '5432'),
    /**
     * Nama database yang digunakan
     * @default db
     * @type {string}
     */
    NAME: process.env.DB_NAME || 'db',
    /**
     * Username untuk mengakses database
     * @default root
     * @type {string}
     */
    USER: process.env.DB_USER  || 'root',
    /**
     * Password untuk mengakses database
     * @default root
     * @type {string}
     */
    PASS: process.env.DB_PASS || 'root',
    /**
     * DBMS yang digunakan
     * @default postgres
     * @type { import('sequelize').Dialect }
     */
    DIALECT: filterDBMS(process.env.DB_DIALECT),
    /**
     * Pool untuk koneksi ke database
     * @type {{ max: number, min: number, acquire: number, idle: number }}
     */
    POOL: {
      max: 20,
      min: 0,
      acquire: 30000,
      idle: 10000,
    }
  },
};
