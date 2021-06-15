import { Router } from 'express';
import { getJurusan } from '../services/jurusan';
import HttpException from './middleware/HttpException';

const router = Router();

export default (app: Router): void => {
  app.use('/jurusan', router);

  /**
   * @returns JSON: {
   *    jurusan: array of (model) string berisi nama semua jurusan di ITB
   * }
   */
  router.get('/getAll', async (req, res, next) => {
    try {
      const allJurusan = await getJurusan();
      console.log(allJurusan);
      res.json({
        jurusan: allJurusan,
      });
    } catch (e) {
      console.error(e);
      next(e);
    }
  });

  /**
   * Dapetin array string nama berdasarkan nama himpunan atau id himpunan.
   * Jika diberikan id dan nama, maka prioritas pencarian berdasarkan id.
   * Jika diberikan keduanya dan id salah, maka dicari berdasarkan nama.
   * Melemparkan HttpExecption
   * @returns JSON: {
   *    jurusan: array of (model) string berisi nama semua jurusan di ITB
   * }
   */
  router.get('/get', async (req, res, next) => {
    // /jurusan/get?namaHimmpunan=...
    // ATAU
    // /jurusan/get?idHimpunan=...
    let idHimpunan: number | undefined;
    if (req.query.id) {
      idHimpunan = parseInt(req.query.id.toString());
    }
    const namaHimpunan = req.query.nama?.toString();
    if (!idHimpunan && !namaHimpunan) {
      const e = new HttpException(400, 'Tidak bisa mencari jurusan tanpa nama ataupun id himpunan.');
      // kasih ke error handler
      next(e);
    }
    let jurusan: Array<string> = [];
    try {
      // cek ID dulu
      if (idHimpunan) {
        jurusan = await getJurusan(idHimpunan);
        if (jurusan.length == 0 && !namaHimpunan) {
          throw new HttpException(400, `idHimpunan ${idHimpunan} tidak valid`);
        }
      }

      // cek nama kalo id belom ada
      if (jurusan.length == 0 && namaHimpunan) {
        jurusan = await getJurusan(undefined, namaHimpunan);
      }

      if (jurusan.length == 0) {
        throw new HttpException(400, 'Nama atau id salah.');
      }
      res.json({
        jurusan: jurusan,
      });
    } catch (e) {
      console.error(e);
      next(e);
    }
  });
};