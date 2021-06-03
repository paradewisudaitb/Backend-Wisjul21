/**
 * idHimpunan -> TINYNINT, Auto Increment, PK
 * namaHimpunan -> string, unique, not null
 * singkatanHimpunan -> sting, unique, not null
 */

import conn from '../connections/db';
import { DataTypes } from 'sequelize';

const Himpunan = conn.define('himpunan', {
  idHimpunan: {
    type: DataTypes.TINYINT,
    autoIncrement: true,
    primaryKey: true,
  },
  namaHimpunan: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  singkatanHimpunan: {
    type: DataTypes.STRING(16),
    unique: true,
    allowNull: false,
  }
});

export default Himpunan;