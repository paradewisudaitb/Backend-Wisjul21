import conn from '../connections/db';
import { DataTypes } from 'sequelize';
import Wisudawan from '../models/wisudawan';

const kontribusi = conn.define('kontribusi',{
  nim : {
    type : DataTypes.STRING(8),
    allowNull : false,
    primaryKey: true,
    references: {
      model: Wisudawan,
      key: 'nim'
    }
  },
  kontribusi : {
    type : DataTypes.STRING,
    allowNull : false,
  }
});

export default kontribusi;
