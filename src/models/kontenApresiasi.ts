import {
  Model,
  DataTypes,
  Optional,
} from 'sequelize';
import conn from '../connections/db';
import Himpunan from './himpunan';
import { kontenApresiasiAttributes, tipeApresiasi } from '../interfaces/IKontenApresiasi';

/**
 * Attribut optional di `User.build` dan `User.create`
 */
type apresiasiCreationAttributes = Optional<kontenApresiasiAttributes, 'idApresiasi'>

class kontenApresiasi extends Model<kontenApresiasiAttributes, apresiasiCreationAttributes>
  implements kontenApresiasiAttributes {
    // Atribut atribut kontenApresiasi
    public idApresiasi!: number;
    public idHimpunan!: number;
    public linkKonten!: string;
    public linkThumbnail!: string;
    public tipeKonten!: tipeApresiasi;

    // data pembuatan dan update
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

kontenApresiasi.init(
  {
    idApresiasi: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idHimpunan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    linkKonten: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    linkThumbnail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipeKonten: {
      type: DataTypes.ENUM({
        values: ['poster', 'website', 'video', 'lagu', 'puisi', 'other']
      }),
      allowNull: false,
    }
  },
  {
    tableName: 'kontenApresiasi',
    sequelize: conn,
  }
);

export const create = async (idHimpunan: number, linkKonten: string, linkThumbnail: string, tipeKonten: tipeApresiasi): Promise<kontenApresiasi> => {
  return await kontenApresiasi.create({ idHimpunan, linkKonten, linkThumbnail, tipeKonten });
};

export const destroy = async (idHimpunan: number, linkKonten: string, linkThumbnail: string, tipeKonten: tipeApresiasi): Promise<void> => {
  await kontenApresiasi.destroy({
    where: {
      idHimpunan,
      linkKonten,
      linkThumbnail,
      tipeKonten
    }
  });
};

export const selectAll = async (): Promise<kontenApresiasi[]> => {
  return await kontenApresiasi.findAll();
};

export const getApresiasiByidHimpunan = async (idHimpunan: number): Promise<kontenApresiasi[] | null> => {
  return await kontenApresiasi.findAll({
    where: {
      idHimpunan: idHimpunan,
    }
  });
};

export const getApresiasiByNamaHimpunan = async (namaHimpunan: string): Promise<kontenApresiasi[]> => {
  const res = await Himpunan.findAll({
    where: {
      namaHimpunan
    },
    include: [
      kontenApresiasi
    ],
  });
  // Ini belum yakin sih res[0]nya
  return res[0].getKontenApresiasis();
};

export default kontenApresiasi;