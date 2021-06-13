import { ValidationError } from 'sequelize/types';
import
{ selectAll as getAllPrestasi, getPrestasiFromNIM}
  from '../models/prestasi';
import HttpException from '../routes/middleware/HttpException';

/**
 * Fungsi untuk mengembalikan array yang berisi karya, apabila
 * parameter fungsi kosong maka akan mengembalikan semua karya,
 * apabila fungsi diberikan parameter nim maka akan mengembalikan 
 * semua karya yang dimiliki oleh mahasiswa tersebut 
 * @param nim nama himpunan "pemilik" jurusan
 * @returns array of jurusan sesuai pencarian
 * @throws HttpExceptionn
 * @async
 */
export const getPrestasi = async (nim?: string): Promise<string[]> => {
  // ga dikasih parameter
  const hasil: Array<string> = [];
  if (!nim) {
    (await getAllPrestasi()).forEach(e => hasil.push(e.prestasi));
    return hasil;
  }

  try {
    (await getPrestasiFromNIM(nim)).forEach(e => hasil.push(e.prestasi));
    return hasil;
  } catch (_) {
    console.error(_);
    const err : ValidationError = _;
    if (err.errors) {
      let str = '';
      for (const eDetail of err.errors) {
        str += eDetail.message;
        str += '\n';
      }
      console.error(str);
      throw new HttpException(400, str);
    } else {
      // unknown error
      console.error(_);
      throw new HttpException(500, 'Something bad happened. Call the admins at jspmarcello@live.com');
    }
  }
};