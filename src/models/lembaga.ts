import conn from '../connections/db';
import { DataTypes } from 'sequelize';
import Wisudawan from '../models/wisudawan';

const lembagaNonHMJ = conn.define('lembagaNonHMJ',{
  nim : {
    type : DataTypes.STRING,
    allowNull : false,
    primaryKey: true,
  },
  lembaga : {
    type : DataTypes.STRING,
    allowNull : false,
  }
});

Wisudawan.hasMany(lembagaNonHMJ, {foreignKey: 'nim'});
lembagaNonHMJ.belongsTo(Wisudawan, {foreignKey : 'nim'});

export default lembagaNonHMJ;