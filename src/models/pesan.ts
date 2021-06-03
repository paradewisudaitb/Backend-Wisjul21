/**
 * idPesan -> pake yang bawaan di sequelize
 * nim -> string(8), not null // buat penerima, FK -> wisudawan.nim
 * namaPengirim -> string
 * pesan -> string (atau TEXT), not null
 */

import conn from '../connections/db';
import Wisudawan from './wisudawan';
import { DataTypes } from 'sequelize';

const Pesan = conn.define('pesan', {
  nim: { // penerima
    type: DataTypes.STRING(8),
    allowNull: false,
    comment: 'Penerima pesan',
    references: {
      model: Wisudawan,
      key: 'nim',
    }
  },
  namaPengirim: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pesan: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

Wisudawan.hasMany(Pesan, { foreignKey: 'nim' });
Pesan.belongsTo(Wisudawan, { foreignKey: 'nim' });

export default Pesan;