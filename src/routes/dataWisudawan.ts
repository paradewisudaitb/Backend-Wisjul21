import { Router } from 'express';
import { getDataToShow, getDataWisudawanToShow }  from '../models/wisudawan';

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
      try{
        const a = await getDataToShow(namaHimpunan);
        res.json(a);
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
      res.status(400).send('Tidak bisa melakukan GET request tanpa namaHimpunan atau nim');
    }
  }
)};
