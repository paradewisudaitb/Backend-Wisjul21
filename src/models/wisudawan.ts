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
import Prestasi from './prestasi';
import Pesan from './pesan';
import Lembaga from './lembagaNonHMJ';
import Kontribusi from './kontribusi';
import Karya from './karya';

/**
 * Atribut yang ada di model himpunan
 */
interface WisudawanAttributes {
  nim: string;
  idJurusan: number;
  namaLengkap: string;
  namaPanggilan: string;
  pasfoto: string;
  judulTA: string;
  funFact: string;
  tipsSukses: string;
  email: string;
  kotaAsal: string;
  tanggalLahir: Date;//gatau date di ts apa
  angkatan: number;
}

/**
 * Attribut "idHimpunan" jadi optional pas manggil
 * `User.build` dan `User.create`
 */
type WisudawanCreationAttributes = Optional<WisudawanAttributes, 'nim'>

class Wisudawan extends Model<WisudawanAttributes, WisudawanCreationAttributes>
  implements WisudawanAttributes {
  // atribut-atribut
  public nim!: string;
  public idJurusan!: number;
  public namaLengkap!: string;
  public namaPanggilan!: string;
  public pasfoto!: string;
  public judulTA!: string;
  public funFact!: string;
  public tipsSukses!: string;
  public email!: string;
  public kotaAsal!: string;
  public tanggalLahir!: Date;//gatau date di ts apa
  public angkatan!: number;

  // data pembuatan dan update
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getPrestasis!: HasManyGetAssociationsMixin<Prestasi>;
  public addPrestasis!: HasManyAddAssociationMixin<Prestasi, number>;
  public hasPrestasi!: HasManyHasAssociationMixin<Prestasi, number>;
  public countPrestasi!: HasManyCountAssociationsMixin;
  public createPrestasi!: HasManyCreateAssociationMixin<Prestasi>;

  public getPesans!: HasManyGetAssociationsMixin<Pesan>;
  public addPesans!: HasManyAddAssociationMixin<Pesan, number>;
  public hasPesan!: HasManyHasAssociationMixin<Pesan, number>;
  public countPesan!: HasManyCountAssociationsMixin;
  public createPesan!: HasManyCreateAssociationMixin<Pesan>;

  public getLembagas!: HasManyGetAssociationsMixin<Lembaga>;
  public addLembagas!: HasManyAddAssociationMixin<Lembaga, number>;
  public hasLembaga!: HasManyHasAssociationMixin<Lembaga, number>;
  public countLembaga!: HasManyCountAssociationsMixin;
  public createLembaga!: HasManyCreateAssociationMixin<Lembaga>;

  public getKontribusis!: HasManyGetAssociationsMixin<Kontribusi>;
  public addKontribusis!: HasManyAddAssociationMixin<Kontribusi, number>;
  public hasKontribusi!: HasManyHasAssociationMixin<Kontribusi, number>;
  public countKontribusi!: HasManyCountAssociationsMixin;
  public createKontribusi!: HasManyCreateAssociationMixin<Kontribusi>;

  public getKaryas!: HasManyGetAssociationsMixin<Karya>;
  public addKaryas!: HasManyAddAssociationMixin<Karya, number>;
  public hasKarya!: HasManyHasAssociationMixin<Karya, number>;
  public countKarya!: HasManyCountAssociationsMixin;
  public createKarya!: HasManyCreateAssociationMixin<Karya>;

  public readonly prestasis?: Prestasi[];
  public readonly pesans?: Pesan[];
  public readonly lembagas?: Lembaga[];
  public readonly kontribusis?: Kontribusi[];
  public readonly karyas?: Karya[];

  public static associations: {
    prestasi: Association<Wisudawan, Prestasi>;
    pesan: Association<Wisudawan, Pesan>;
    lembaga: Association<Wisudawan, Lembaga>;
    kontribusi: Association<Wisudawan, Kontribusi>;
    karya: Association<Wisudawan, Karya>;
  };
}

Wisudawan.init(
  {
    nim: {
      type: DataTypes.STRING(8),
      allowNull: false,
      primaryKey: true
    },
    idJurusan: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    namaLengkap: {
      type: DataTypes.STRING,
      allowNull: false
    },
    namaPanggilan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pasfoto: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    judulTA: {
      type: DataTypes.STRING,
      allowNull: false
    },
    funFact: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tipsSukses: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    kotaAsal: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tanggalLahir: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    angkatan: {
      type: DataTypes.TINYINT, // 16, 17, 18, ...
      allowNull: false
    },
  },
  {
    tableName: 'Wisudawan',
    sequelize: conn,
  }
);

Wisudawan.hasMany(Prestasi, {
  foreignKey: 'nim',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

Wisudawan.hasMany(Pesan, {
  foreignKey: 'nim',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

Wisudawan.hasMany(Lembaga, {
  foreignKey: 'nim',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

Wisudawan.hasMany(Kontribusi, {
  foreignKey: 'nim',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

Wisudawan.hasMany(Karya, {
  foreignKey: 'nim',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

export default Wisudawan;