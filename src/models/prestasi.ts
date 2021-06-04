import{
  Model,
  DataTypes,
  Optional,
} from 'sequelize';
import conn from '../connections/db';
/**
 * Atribut yang ada di model lembaga
 */
interface PrestasiAttributes {
  nim: string,
  prestasi: string,
}

/**
 * Atribut optional di `User.build` dan `User.create`
 */
type PrestasiCreationAttributes = Optional<PrestasiAttributes, 'nim'>

class Prestasi extends Model<PrestasiAttributes, PrestasiCreationAttributes>
  implements PrestasiAttributes {
  // atribut-atribut
  public nim!: string;
  public prestasi!: string;

  // data pembuatan dan update
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Prestasi.init(
  {
    nim: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    prestasi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'prestasi',
    sequelize: conn,
  }
);

export const create = async (nim: string, prestasi: string): Promise<Prestasi> => {
  return await Prestasi.create({ nim, prestasi });
};

export const destroy = async (nim: string, prestasi: string): Promise<void> => {
  await Prestasi.destroy({
    where: {
      nim,
      prestasi
    }
  });
};

export const selectAll = async (): Promise<Prestasi[]> => {
  return Prestasi.findAll();
};

export default Prestasi;