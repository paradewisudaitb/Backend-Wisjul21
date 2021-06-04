import{
  Model,
  DataTypes,
  Optional,
} from 'sequelize';
import conn from '../connections/db';
/**
 * Atribut yang ada di model lembaga
 */
interface PesanAttributes {
  nim: string,
  namaPengirim: string,
  pesan: string,
}

/**
 * Atribut optional di `User.build` dan `User.create`
 */
type PesanCreationAttributes = Optional<PesanAttributes, 'nim'>

class Pesan extends Model<PesanAttributes, PesanCreationAttributes>
  implements PesanAttributes {
  // atribut-atribut
  public nim!: string;
  public namaPengirim!: string;
  public pesan!: string;

  // data pembuatan dan update
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Pesan.init(
  {
    nim: {
      type: DataTypes.STRING,
      primaryKey: true,
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
  return Pesan.findAll();
};

export default Pesan;