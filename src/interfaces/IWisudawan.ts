/**
 * Atribut yang ada di model himpunan
 */
export interface WisudawanAttributes {
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
  tanggalLahir: Date;
  angkatan: number;
}

export interface WisudawanForm {
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
  tanggalLahir: Date;
  angkatan: number;
  pretasi?: string[];
  karya?: string[];
  kontribusi?: string[];
  lembaga?: string[];
}