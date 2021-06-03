import conn from '../connections/db';
import Wisudawan from './wisudawan';
import { DataTypes } from 'sequelize';

const Prestasi = conn.define('pretasi', {
  nim: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  prestasi: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  }
});

Wisudawan.hasMany(Prestasi, { foreignKey: 'nim' });
Prestasi.belongsTo(Wisudawan, { foreignKey: 'nim' });

export default Prestasi;