import conn from '../connections/db';
import Wisudawan from './wisudawan';
import { DataTypes } from 'sequelize';

const Prestasi = conn.define('pretasi', {
  nim: {
    type: DataTypes.STRING(8),
    primaryKey: true,
    allowNull: false,
    references: {
      model: Wisudawan,
      key: 'nim',
    }
  },
  prestasi: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  }
});

export default Prestasi;