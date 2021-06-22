import  {
  Model,
  Association,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  DataTypes,
  QueryTypes,
} from 'sequelize';
import conn from '../connections/db';
import Prestasi, {
  create as prestasiCreate
} from './prestasi';
import Pesan from './pesan';
import Lembaga, {
  create as lembagaCreate
} from './lembaga';
import Kontribusi, {
  create as kontribusiCreate
} from './kontribusi';
import Karya, {
  create as karyaCreate
} from './karya';
import Jurusan  from './jurusan';
import { WisudawanAttributes } from '../interfaces/IWisudawan';
import HttpException from '../routes/middleware/HttpException';

class Wisudawan extends Model<WisudawanAttributes>
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
  public nonhim!: boolean;

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
      type: DataTypes.INTEGER,
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
      type: DataTypes.INTEGER, // 16, 17, 18, ...
      allowNull: false
    },
    nonhim: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  {
    tableName: 'wisudawan',
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

Wisudawan.hasOne  (Jurusan, {
  foreignKey: 'idJurusan',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

export const create = async (
  nim: string,
  idJurusan: number,
  namaLengkap: string,
  namaPanggilan: string,
  pasfoto: string,
  judulTA: string,
  funFact: string,
  tipsSukses: string,
  email: string,
  kotaAsal: string,
  tanggalLahir: Date,
  angkatan: number,
  nonhim: boolean,
  karya?: string[],
  kontribusi?: string[],
  lembaga?: string[],
  prestasi?: string[]
): Promise<Wisudawan> => {
  const wisudawan = await Wisudawan.create({
    nim,
    idJurusan,
    namaLengkap,
    namaPanggilan,
    pasfoto,
    judulTA,
    funFact,
    tipsSukses,
    email,
    kotaAsal,
    tanggalLahir,
    angkatan,
    nonhim
  });

  if (!lembaga) {// ga ada karya
    wisudawan.addLembagas(await lembagaCreate(nim, '-'));
  } else {
    for (const lem of lembaga) {
      if (lem == '') continue;
      wisudawan.addLembagas(await lembagaCreate(nim, lem));
    }
  }

  if (!kontribusi) {// ga ada karya
    wisudawan.addKontribusis(await kontribusiCreate(nim, '-'));
  } else {
    for (const lem of kontribusi) {
      if (lem == '') continue;
      wisudawan.addKontribusis(await kontribusiCreate(nim, lem));
    }
  }

  if (!karya) {// ga ada karya
    wisudawan.addKaryas(await karyaCreate(nim, '-'));
  } else {
    for (const lem of karya) {
      if (lem == '') continue;
      wisudawan.addKaryas(await karyaCreate(nim, lem));
    }
  }

  if (!prestasi) { // ga ada prestasi
    wisudawan.addPrestasis(await prestasiCreate(nim, '-'));
  } else {
    for (const pres of prestasi) {
      if (pres == '') continue;
      wisudawan.addPrestasis(await prestasiCreate(nim, pres));
    }
  }
  return wisudawan;
};

export const selectAll = async (): Promise<Wisudawan[]> => {
  return Wisudawan.findAll();
};

export const getWisudawanFromNIM = async (nim: string): Promise<Wisudawan[]> => {
  return await Wisudawan.findAll({
    where: {
      nim,
    }
  });
};

export const getDataOfHimpunan = async (namaHimpunan: string): Promise<any> => {
  try {
    const res = await conn.query(`
  SELECT nim,
      jurusan."namaJurusan",
      wisudawan."namaLengkap",
      wisudawan."judulTA",
      wisudawan.pasfoto
    FROM ((wisudawan
      JOIN jurusan USING ("idJurusan"))
      JOIN himpunan USING ("idHimpunan"))
    WHERE himpunan."namaHimpunan" = ? AND wisudawan.nonhim = false
    GROUP BY nim, jurusan."namaJurusan",  wisudawan."namaLengkap", wisudawan."judulTA", wisudawan.pasfoto
    ORDER BY nim;
    `, {
      replacements: [namaHimpunan],
      type: QueryTypes.SELECT,
    });
    return res;
  } catch (err) {
    throw new HttpException(500, err);
  }
};

export const getDataOfNonHimpunan = async (namaHimpunan: string): Promise<any> => {
  try {
    const res = await conn.query(`
  SELECT nim,
      jurusan."namaJurusan",
      wisudawan."namaLengkap",
      wisudawan."judulTA",
      wisudawan.pasfoto
    FROM ((wisudawan
      JOIN jurusan USING ("idJurusan"))
      JOIN himpunan USING ("idHimpunan"))
    WHERE wisudawan.nonhim = true
    GROUP BY nim, jurusan."namaJurusan",  wisudawan."namaLengkap", wisudawan."judulTA", wisudawan.pasfoto
    ORDER BY nim;
    `, {
      replacements: [namaHimpunan],
      type: QueryTypes.SELECT,
    });
    return res;
  } catch (err) {
    throw new HttpException(500, err);
  }
};


export const getDataWisudawanToShow = async (nim: string): Promise<any> => {
  try {
    const res = await conn.query(`
     SELECT nim,
         jurusan."namaJurusan",
         himpunan."namaHimpunan",
         wisudawan."namaLengkap",
         wisudawan."namaPanggilan",
         wisudawan.email,
         wisudawan.angkatan,
         wisudawan."tipsSukses",
         wisudawan."kotaAsal",
         wisudawan."tanggalLahir",
         wisudawan."judulTA",
         wisudawan."funFact",
         wisudawan.pasfoto,
         array_agg(DISTINCT karya.karya) AS "karya",
         array_agg(DISTINCT kontribusi.kontribusi) AS "kontribusi",
         array_agg(DISTINCT lembaga.lembaga) AS "lembaga",
         array_agg(DISTINCT prestasi.prestasi) AS "prestasi"
        FROM ((((((wisudawan
          JOIN jurusan USING ("idJurusan"))
          JOIN himpunan ON ((wisudawan.nonhim = himpunan.nonhim AND wisudawan.nonhim = true) OR (jurusan."idHimpunan" = himpunan."idHimpunan" AND wisudawan.nonhim = false)))
          JOIN karya USING (nim))
          JOIN prestasi USING(nim))
          JOIN kontribusi USING (nim))
          JOIN lembaga USING (nim))
         WHERE nim = ?
       GROUP BY nim, jurusan."namaJurusan", himpunan."namaHimpunan", wisudawan."namaLengkap", wisudawan."namaPanggilan", wisudawan.email, wisudawan.angkatan, wisudawan."tipsSukses", wisudawan."kotaAsal", wisudawan."tanggalLahir", wisudawan."judulTA", wisudawan."funFact", wisudawan.pasfoto, wisudawan."createdAt", wisudawan.nonhim
       ORDER BY wisudawan."createdAt";
    `, {
      replacements: [nim],
      type: QueryTypes.SELECT,
    });
    return res;
  } catch (err) {
    throw new HttpException(500, err);
  }
};

export default Wisudawan;
