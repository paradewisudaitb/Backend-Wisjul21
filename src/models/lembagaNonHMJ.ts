import{
  Model,
  DataTypes,
  Optional,
} from 'sequelize';
import conn from '../connections/db';
/**
 * Atribut yang ada di model lembaga
 */
interface LembagaAttributes {
  nim: string,
  lembaga: string,
}

/**
 * Atribut optional di `User.build` dan `User.create`
 */
type LembagaCreationAttributes = Optional<LembagaAttributes, 'nim'>

class Lembaga extends Model<LembagaAttributes, LembagaCreationAttributes>
  implements LembagaAttributes {
  // atribut-atribut
  public nim!: string;
  public lembaga!: string;

  // data pembuatan dan update
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Lembaga.init(
  {
    nim: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    lembaga: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'lembaga',
    sequelize: conn,
  }
);

export default Lembaga;