import {
  Model,
  DataTypes,
  Optional,
} from 'sequelize';
import conn from '../connections/db';
import Himpunan from './himpunan';
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

export const getJurusanFromNama = async (nama: string): Promise<Jurusan | null> => {
  return await Jurusan.findOne({
    where: {
      namaJurusan: nama,
    }
  });
};

export const getJurusanFromIDHimpunan = async (idHimpunan: number): Promise<Jurusan[]> => {
  return await Jurusan.findAll({
    where: {
      idHimpunan,
    }
  });
};

export const getJurusanFromIDJurusan = async (idJurusan: number): Promise<Jurusan[]> => {
  return await Jurusan.findAll({
    where: {
      idJurusan,
    }
  });
};

export const getJurusanFromNamaHimpunan = async (namaHimpunan: string): Promise<Jurusan[]> => {
  const res = await Himpunan.findAll({
    where: {
      namaHimpunan,
    },
    include: [
      Jurusan
    ],
  });

  // harusnya cmn 1 hasilnya
  return res[0].getJurusans();
};

export default Jurusan;
