import conn from '../connections/db';
import Wisudawan from './wisudawan';
import { DataTypes } from 'sequelize';

const Karya = conn.define('karya', {
  nim: {
    type: DataTypes.STRING(8),
    allowNull: false,
    primaryKey: true,
    references: {
      model: Wisudawan,
      key: 'nim',
    }
  },
  karya: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
});

export default Karya;