import { Router } from 'express';
import { getKontribusi } from '../services/kontribusi';
import HttpException from './middleware/HttpException';

const router = Router();

export default (app: Router): void => {
  app.use('/kontribusi', router);

  /**
   * @returns JSON: {
   *    jurusan: array of (model) string berisi nama semua karya yang dimiliki 
   *    mahasiswa dengan nim tertentu
   * }
   */
  router.get('/getAll', async (req, res, next) => {
    try {
      const allKontribusi = await getKontribusi();
      console.log(allKontribusi);
      res.json({
        kontribusi: allKontribusi,
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
    let idMahasiswa: string | undefined;
    if (req.query.nim) {
      idMahasiswa = String(req.query.nim);
    }

    let kontribusi: Array<string> = [];
    try {
      // cek ID dulu
      if (idMahasiswa) {
        kontribusi = await getKontribusi(idMahasiswa);
        if (kontribusi.length == 0) {
          throw new HttpException(400, `nim ${idMahasiswa} tidak valid`);
        }
      }

      if (kontribusi.length == 0) {
        throw new HttpException(400, 'Nama atau id salah.');
      }
      res.json({
        kontribusi: kontribusi,
      });
    } catch (e) {
      console.error(e);
      next(e);
    }
  });
};