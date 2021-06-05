import {
  Model,
  DataTypes,
  Optional,
} from 'sequelize';
import conn from '../connections/db';
import { JurusanAttributes } from '../interfaces/IJurusan';

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
      unique: true,
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

export const create = async (namaJurusan: string, idHimpunan: number): Promise<Jurusan> => {
  return await Jurusan.create({ namaJurusan, idHimpunan });
};

export const destroy = async (namaJurusan: string, idHimpunan: string): Promise<void> => {
  await Jurusan.destroy({
    where: {
      namaJurusan,
      idHimpunan
    }
  });
};

export const selectAll = async (): Promise<Jurusan[]> => {
  return await Jurusan.findAll();
};

export default Jurusan;
