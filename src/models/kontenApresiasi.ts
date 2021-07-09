import { Model, DataTypes, Optional, where, fn, col } from 'sequelize';
import conn from '../connections/db';
import Himpunan from './himpunan';
import {
  kontenApresiasiAttributes,
  tipeApresiasi,
} from '../interfaces/IKontenApresiasi';
import HttpException from '../routes/middleware/HttpException';
import logger from '../loaders/logger';

/**
 * Attribut optional di `User.build` dan `User.create`
 */
type apresiasiCreationAttributes = Optional<
  kontenApresiasiAttributes,
  'idApresiasi'
>;

class kontenApresiasi
  extends Model<kontenApresiasiAttributes, apresiasiCreationAttributes>
  implements kontenApresiasiAttributes
{
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
        values: ['poster', 'website', 'video', 'lagu', 'puisi', 'other'],
      }),
      allowNull: false,
    },
  },
  {
    tableName: 'kontenApresiasi',
    sequelize: conn,
  }
);

export const create = async (
  idHimpunan: number,
  linkKonten: string,
  linkThumbnail: string,
  tipeKonten: tipeApresiasi
): Promise<kontenApresiasi> => {
  return await kontenApresiasi.create({
    idHimpunan,
    linkKonten,
    linkThumbnail,
    tipeKonten,
  });
};

export const destroy = async (
  idHimpunan: number,
  linkKonten: string,
  linkThumbnail: string,
  tipeKonten: tipeApresiasi
): Promise<void> => {
  await kontenApresiasi.destroy({
    where: {
      idHimpunan,
      linkKonten,
      linkThumbnail,
      tipeKonten,
    },
  });
};

export const selectAll = async (): Promise<kontenApresiasi[]> => {
  return await kontenApresiasi.findAll();
};

export const getApresiasiByidHimpunan = async (
  idHimpunan: number
): Promise<kontenApresiasi[] | null> => {
  return await kontenApresiasi.findAll({
    where: {
      idHimpunan: idHimpunan,
    },
  });
};

export const getApresiasiByNamaHimpunan = async (
  namaHimpunanVanilla: string
): Promise<kontenApresiasi[]> => {
  const namaHimpunan = namaHimpunanVanilla.replace(/-/g, ' ').toLowerCase();
  try {
    const res = await Himpunan.findAll({
      where: {
        namaHimpunan: where(fn('LOWER', col('namaHimpunan')), namaHimpunan),
      },
      include: [kontenApresiasi],
    });
    // Ini belum yakin sih res[0]nya
    return await res[0].getKontenApresiasis();
  } catch (err) {
    throw new HttpException(
      500,
      `Gagal mendapatkan konten apresiasi himpunan ${namaHimpunanVanilla}`
    );
  }
};

export default kontenApresiasi;
