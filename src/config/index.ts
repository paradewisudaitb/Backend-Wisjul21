const envFound = require('dotenv').config();

if (envFound.error) {
  throw new Error("Gagal me-load config dari .env");
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
    HOST: process.env.HOST || 'localhost',
    /**
     * Port ke database
     * @default 5432
     * @type {number}
     */
    PORT: parseInt(process.env.PORT || '5432'),
    /**
     * Nama database yang digunakan
     * @default db
     * @type {string}
     */
    NAME: process.env.NAME || 'db',
    /**
     * Username untuk mengakses database
     * @default root
     * @type {string}
     */
    USER: process.env.USER  || 'root',
    /**
     * Password untuk mengakses database
     * @default root
     * @type {string}
     */
    PASS: process.env.PASS || 'root',
    /**
     * DBMS yang digunakan
     * @default postgres
     * @type {string}
     */
    DIALECT: process.env.DIALECT || 'postgres',
  },
};
