import {
  Model,
  Association,
  Optional,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  DataTypes,
} from 'sequelize';
import conn from '../connections/db';
import Jurusan from './jurusan';

/**
 * Atribut yang ada di model himpunan
 */
interface HimpunanAttributes {
  idHimpunan: number;
  namaHimpunan: string;
  singkatanHimpunan: string;
}

/**
 * Attribut "idHimpunan" jadi optional pas manggil
 * `User.build` dan `User.create`
 */
type HimpunanCreationAttributes = Optional<HimpunanAttributes, 'idHimpunan'>

class Himpunan extends Model<HimpunanAttributes, HimpunanCreationAttributes>
  implements HimpunanAttributes {
  // atribut-atribut
  public idHimpunan!: number; // null assertion, `!`
  public namaHimpunan!: string;
  public singkatanHimpunan!: string;

  // data pembuatan dan update
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getJurusans!: HasManyGetAssociationsMixin<Jurusan>;
  public addJurusans!: HasManyAddAssociationMixin<Jurusan, number>;
  public hasJurusan!: HasManyHasAssociationMixin<Jurusan, number>;
  public countJurusan!: HasManyCountAssociationsMixin;
  public createJurusan!: HasManyCreateAssociationMixin<Jurusan>;

  public readonly jurusans?: Jurusan[];

  public static associations: {
    jurusan: Association<Himpunan, Jurusan>;
  };
}

Himpunan.init(
  {
    idHimpunan: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    namaHimpunan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    singkatanHimpunan: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
  },
  {
    tableName: 'himpunan',
    sequelize: conn,
  }
);

Himpunan.hasMany(Jurusan, {
  foreignKey: 'idHimpunan',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

export default Himpunan;