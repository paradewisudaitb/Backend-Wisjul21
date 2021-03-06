import{
  Model,
  DataTypes,
} from 'sequelize';
import conn from '../connections/db';
import { LembagaAttributes } from '../interfaces/ILembaga';
class Lembaga extends Model<LembagaAttributes>
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
      type: DataTypes.STRING(8),
      primaryKey: true,
    },
    lembaga: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    tableName: 'lembaga',
    freezeTableName: true,
    sequelize: conn,
  }
);

export const create = async (nim: string, lembaga: string): Promise<Lembaga> => {
  return await Lembaga.create({ nim, lembaga });
};

export const destroy = async (nim: string, lembaga: string): Promise<void> => {
  await Lembaga.destroy({
    where: {
      nim,
      lembaga
    }
  });
};

export const selectAll = async (): Promise<Lembaga[]> => {
  return Lembaga.findAll();
};

export const getLembagaFromNIM = async (nim: string): Promise<Lembaga[]> => {
  return await Lembaga.findAll({
    where: {
      nim,
    }
  });
};

export default Lembaga;