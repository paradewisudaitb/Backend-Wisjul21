import {
  Model,
  DataTypes,
} from 'sequelize';
import conn from '../connections/db';
import { KaryaAttributes } from '../interfaces/IKarya';

class Karya extends Model<KaryaAttributes>
  implements KaryaAttributes {
  // atribut-atribut
  public nim!: string;
  public karya!: string;

  // data pembuatan dan update
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Karya.init(
  {
    nim: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    karya: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    tableName: 'karya',
    sequelize: conn,
  }
);

export const create = async (nim: string, karya: string): Promise<Karya> => {
  return await Karya.create({nim, karya});
};

export const destroy = async (nim: string, karya: string): Promise<void> => {
  await Karya.destroy({
    where: {
      nim,karya
    }
  });
};

// export const update = async (nim: string, karya: string, karyaBaru: string) => {
//   Karya.update({karya: karyaBaru}, {
//     where: {
//       nim, karya
//     }
//   });
// };

export const selectAll = async (): Promise<Karya[]> => {
  return Karya.findAll();
};

export const getKaryaFromNIM = async (nim: string): Promise<Karya[]> => {
  return await Karya.findAll({
    where: {
      nim,
    }
  });
};


export default Karya;