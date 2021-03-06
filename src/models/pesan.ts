import{
  Model,
  DataTypes,
  Optional,
} from 'sequelize';
import conn from '../connections/db';
import { PesanAttributes } from '../interfaces/IPesan';

/**
 * Atribut optional di `User.build` dan `User.create`
 */
type PesanCreationAttributes = Optional<PesanAttributes, 'idPesan'>

class Pesan extends Model<PesanAttributes, PesanCreationAttributes>
  implements PesanAttributes {
  // atribut-atribut
  public idPesan!: number;
  public nim!: string;
  public namaPengirim!: string|undefined;
  public pesan!: string;

  // data pembuatan dan update
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Pesan.init(
  {
    idPesan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nim: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    namaPengirim: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pesan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'pesan',
    sequelize: conn,
  }
);

export const create = async (nim: string, pesan: string, namaPengirim?: string): Promise<Pesan> => {
  namaPengirim = namaPengirim || 'Anonymous';
  return await Pesan.create({ nim, pesan, namaPengirim });
};

export const destroy = async (nim: string, pesan: string, namaPengirim?: string): Promise<void> => {
  await Pesan.destroy({
    where: {
      nim, pesan, namaPengirim
    }
  });
};

export const selectAll = async (): Promise<Pesan[]> => {
  return await Pesan.findAll();
};


/**
 * buat fungsi mencari pesan untuk NIM tertentu
 * @param nim NIM tujuan
 * @return a promise of array of Pesan
 * @async
 */
export const getPesanForNIM = async (nim: string): Promise<Pesan[]> =>{
  // SELECT * FROM pesan INNER JOIN wisudawan WHERE nim = $nim;
  return await Pesan.findAll({
    where: {
      nim,
    },
  });
};

export default Pesan;
