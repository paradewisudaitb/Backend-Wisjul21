import conn from '../connections/db';
import { DataTypes } from 'sequelize';

const Wisudawan = conn.define('wisudawan', {
  nim: {
    type: DataTypes.STRING(8),
    allowNull: false,
    primaryKey: true
  },
  idJurusan: {
    type: DataTypes.TINYINT,
    allowNull: false
  },
  namaLengkap: {
    type: DataTypes.STRING,
    allowNull: false
  },
  namaPanggilan: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pasfoto: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  judulTA: {
    type: DataTypes.STRING,
    allowNull: false
  },
  funFact: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipsSukses: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  kotaAsal: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tanggalLahir: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  angkatan: {
    type: DataTypes.TINYINT, // 16, 17, 18, ...
    allowNull: false
  },
});

export default Wisudawan;