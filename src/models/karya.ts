import {
  Model,
  DataTypes,
  Optional,
} from 'sequelize';
import conn from '../connections/db';
/**
 * Atribut yang ada di model karya
 */
interface KaryaAttributes { 
  nim: string;
  karya: string;
}

/**
 * Atribut optional di `User.build` dan `User.create`
 */
type KaryaCreationAtrributes = Optional<KaryaAttributes, 'nim'>


class Karya extends Model<KaryaAttributes, KaryaCreationAtrributes>
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


export default Karya;