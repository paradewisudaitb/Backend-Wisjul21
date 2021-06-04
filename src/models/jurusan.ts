import {
  Model,
  DataTypes,
  Optional,
} from 'sequelize';
import conn from '../connections/db';
/**
 * Atribut yang ada di model himpunan
 */
interface JurusanAttributes {
  idJurusan: number;
  namaJurusan: string;
  idHimpunan: number;
}

/**
 * Attribut optional di `User.build` dan `User.create`
 */
type JurusanCreationAttributes = Optional<JurusanAttributes, 'idJurusan'>

class Jurusan extends Model<JurusanAttributes, JurusanCreationAttributes>
  implements JurusanAttributes {
  // atribut-atribut
  public idJurusan!: number; // null assertion, `!`
  public namaJurusan!: string;
  public idHimpunan!: number;

  // data pembuatan dan update
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Jurusan.init(
  {
    idJurusan: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    namaJurusan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idHimpunan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'jurusan',
    sequelize: conn,
  }
);

export default Jurusan;