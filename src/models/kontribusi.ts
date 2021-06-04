import {
  Model,
  DataTypes,
  Optional,
} from 'sequelize';
import conn from '../connections/db';
/**
 * Atribut yang ada di model kontribusi
 */
interface KontribusiAttributes {
  nim: string;
  kontribusi: string;
}

/**
 * Atribut optional di `User.build` dan `User.create`
 */
type KontribusiCreationAttributes = Optional<KontribusiAttributes, 'nim'>

class Kontribusi extends Model<KontribusiAttributes, KontribusiCreationAttributes>
  implements KontribusiAttributes {
  // atribut-atribut
  public nim!: string;
  public kontribusi!: string;

  // data pembuatan dan update
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

}

Kontribusi.init(
  {
    nim: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    kontribusi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'kontribusi',
    sequelize: conn,
  }
);


export default Kontribusi;
