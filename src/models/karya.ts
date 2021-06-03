import conn from '../connections/db';
import Wisudawan from './wisudawan';
import { DataTypes } from 'sequelize';

const Karya = conn.define('karya', {
  nim: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  karya: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
});

// wkwkwkwkk

Wisudawan.hasMany(Karya, { foreignKey: 'nim' });
Karya.belongsTo(Wisudawan, { foreignKey: 'nim' });

export default Karya;