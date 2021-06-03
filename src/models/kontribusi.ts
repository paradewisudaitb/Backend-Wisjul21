import conn from '../connections/db';
import { DataTypes } from 'sequelize';
import Wisudawan from '../models/wisudawan';

const kontribusi = conn.define('kontribusi',{
  nim : {
    type : DataTypes.STRING(8),
    allowNull : false,
    primaryKey: true,
  },
  kontribusi : {
    type : DataTypes.STRING,
    allowNull : false,
  }
});

Wisudawan.hasMany(kontribusi, {foreignKey: 'nim'});
kontribusi.belongsTo(Wisudawan, {foreignKey : 'nim'});

export default kontribusi;
