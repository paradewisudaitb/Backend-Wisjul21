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
   * Dapetin array string nama berdasarkan id himpunan.
   * Melemparkan HttpExecption
   * @returns JSON: {
   *    jurusan: array of (model) string berisi nama semua jurusan di ITB
   * }
   */
  router.get('/get', async (req, res, next) => {
    const namaHimpunan = req.query.nama?.toString();
    if (!namaHimpunan) {
      const e = new HttpException(400, 'Tidak bisa mencari jurusan tanpa nama himpunan');
      // kasih ke error handler
      next(e);
    } else {
      try {
        const jurusan = await getJurusan(namaHimpunan);
        res.json({
          jurusan: jurusan,
        });
      } catch (e) {
        console.error(e);
        next(e);
      }
    }
  });
};
