import { ValidationError } from 'sequelize/types';
import
Jurusan,
{ selectAll as getAllJurusan, getJurusanFromIDHimpunan, getJurusanFromNamaHimpunan }
  from '../models/jurusan';
import HttpException from '../routes/middleware/HttpException';

/**
 * Fungsi untuk mendapatka semua jurusan atau jurusan yg dimiliki oleh sebuah
 * himpnuan. Jika tidak diberikan namaHimpunan ataupun idHimpunan, akan
 * dikembalikan semua jurusan. Melemparkan HTTP Exception 400 jika idHimpunan
 * dan namaHimpunan tidak vlid.
 * @param namaHimpunan nama himpunan "pemilik" jurusan
 * @param idHimpunan id himpunan "pemilik" jurusan
 * @returns array of jurusan sesuai pencarian
 * @throws HttpExceptionn
 * @async
 */
export const getJurusan = async (idHimpunan?: number, namaHimpunan?:string): Promise<string[]> => {
  // ga dikasih parameter
  let hasil: Array<string> = [];
  if (!namaHimpunan && !idHimpunan) {
    (await getAllJurusan()).forEach(e => hasil.push(e.namaJurusan));
    return hasil;
  }

  try {
    if (idHimpunan) {
      (await getJurusanFromIDHimpunan(idHimpunan)).forEach(e => hasil.push(e.namaJurusan));
    } else if (namaHimpunan) {
      (await getJurusanFromNamaHimpunan(namaHimpunan)).forEach(e => hasil.push(e.namaJurusan));
    }

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