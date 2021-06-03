import conn from '../connections/db';
import { DataTypes } from 'sequelize';


const Wisudawan = conn.define('wisudawan', {
  nim: {
    type: DataTypes.STRING(8),
    allowNull: false,
    primaryKey: true
  },
  idHimpunan: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  jurusan: {
    type: DataTypes.STRING,
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
    allowNull: false
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
    type: DataTypes.INTEGER,
    allowNull: false
  },
});


export default Wisudawan;