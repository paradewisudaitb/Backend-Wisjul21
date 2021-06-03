/**
 * idJurusan -> TINYINT, Auto Increment, PK
 * namaJurusan -> string, unique, not null
 * idHimpunan -> TINYINT, FK ke himpunan.idHimpunan
 */

import conn from '../connections/db';
import Himpunan from './himpunan';
import { DataTypes } from 'sequelize';

const Jurusan = conn.define('jurusan', {
  idJurusan: {
    type: DataTypes.TINYINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  namaJurusan: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  idHimpunan: {
    type: DataTypes.TINYINT,
    unique: true,
    allowNull: false,
    references: {
      model: Himpunan,
      key: 'idHimpunan'
    }
  }
});

export default Jurusan;