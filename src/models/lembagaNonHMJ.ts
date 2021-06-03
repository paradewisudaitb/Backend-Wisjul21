import conn from '../connections/db';
import { DataTypes } from 'sequelize';
import Wisudawan from '../models/wisudawan';

const lembagaNonHMJ = conn.define('lembagaNonHMJ',{
  nim : {
    type : DataTypes.STRING(8),
    allowNull : false,
    primaryKey: true,
    references: {
      model: Wisudawan,
      key: 'nim',
    }
  },
  lembaga : {
    type : DataTypes.STRING,
    allowNull : false,
  }
});

export default lembagaNonHMJ;