import {
  Model,
  DataTypes,
} from 'sequelize';
import conn from '../connections/db';
import { KontribusiAttributes } from '../interfaces/IKontribusi';

/**
 * Atribut optional di `User.build` dan `User.create`
 */
class Kontribusi extends Model<KontribusiAttributes>
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
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    tableName: 'kontribusi',
    sequelize: conn,
  }
);

export const create = async (nim: string, kontribusi: string): Promise<Kontribusi> => {
  return await Kontribusi.create({nim, kontribusi});
};

export const destroy = async (nim: string, kontribusi: string): Promise<void> => {
  await Kontribusi.destroy({
    where: {
      nim,
      kontribusi
    }
  });
};

export const selectAll = async (): Promise<Kontribusi[]> => {
  return Kontribusi.findAll();
};

export const getKontribusiFromNIM = async (nim: string): Promise<Kontribusi[]> => {
  return await Kontribusi.findAll({
    where: {
      nim,
    }
  });
};

export default Kontribusi;
