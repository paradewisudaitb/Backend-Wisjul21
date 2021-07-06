import { Router } from 'express';
import { getDataOfHimpunan, getDataOfNonHimpunan, getDataWisudawanToShow }  from '../models/wisudawan';
import HttpException from './middleware/HttpException';

const router = Router();

export default (app: Router): void => {
  app.use('/wisudawan', router);

  /**
   * Dapetin array string nama berdasarkan nama himpunan atau id himpunan.
   * Jika diberikan id dan nama, maka prioritas pencarian berdasarkan id.
   * Jika diberikan keduanya dan id salah, maka dicari berdasarkan nama.
   * Melemparkan HttpExecption
   * @returns JSON: {
   *    jurusan: array of json berisi nama semua jurusan di ITB
   * }
   */
  router.get('/get', async (req, res, next) => {
    const namaHimpunan = req.query.namaHimpunan?.toString();
    const nim = req.query.nim?.toString();
    if (namaHimpunan) {
      try {
        if (namaHimpunan.toLowerCase() == 'non-himpunan') {
          const a = await getDataOfNonHimpunan();
          res.json(a);
        } else {
          const a = await getDataOfHimpunan(namaHimpunan);
          res.json(a);
        }
      } catch(err) {
        next(err);
      }
    } else if (nim) {
      try{
        const dataWisudawan = await getDataWisudawanToShow(nim);
        res.json(dataWisudawan);
      } catch(err) {
        next(err);
      }
    } else {
      next(new HttpException(400, 'Tidak bisa melakukan GET request tanpa namaHimpunan atau nim'));
    }
  });
};
