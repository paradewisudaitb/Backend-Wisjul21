import { ValidationError } from 'sequelize/types';
import
{ selectAll as getAllHimpunan, getHimpunanFromIDHimpunan }
  from '../models/himpunan';
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
export const getHimpunan = async (idHimpunan?: number): Promise<string[]> => {
  // ga dikasih parameter
  const hasil: Array<string> = [];
  if (!idHimpunan) {
    (await getAllHimpunan()).forEach(e => hasil.push(e.namaHimpunan));
    return hasil;
  }

  try {
    if (idHimpunan) {
      (await getHimpunanFromIDHimpunan(idHimpunan)).forEach(e => hasil.push(e.namaHimpunan));
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
