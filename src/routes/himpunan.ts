import { Router } from 'express';
import IHimJur from '../interfaces/IHimJur';
import Himpunan, { getHimpunanFromNamaHimpunan, selectAll } from '../models/himpunan';
import HttpException from './middleware/HttpException';
import FakultasHMJ from  '../data/FakultasHMJ.json';

const router = Router();

export default (app: Router): void => {
  app.use('/himpunan', router);


  router.get('/getAll', async (req, res, next) => {
    const himp = await selectAll()
      .catch(() => {
        next(new HttpException(500, 'Gagal mencari nama database'));
      });
    res.json(himp);
  });

  router.get('/get', async (req, res, next) => {
    const fakultas = req.query.fakultas?.toString().toUpperCase();
    if (!fakultas)
      next(new HttpException(400, 'Tidak dapat mencari jurusan tanpa nama himpunan'));

    else {
      const hasil: IHimJur[] =[];
      const tmpFakultasHMJ: {[k: string]: string[];} = FakultasHMJ;

      try {
        for (const namaHimpunan of tmpFakultasHMJ[fakultas]) {
          const him: Himpunan = await getHimpunanFromNamaHimpunan(namaHimpunan);
          const tmp = {
            namaHimpunan: him.namaHimpunan,
            singkatanHimpunan: him.singkatanHimpunan,
            linkFoto: him.linkFoto,
            jurusan: (await him.getJurusans()).map(e => e.namaJurusan),
          };
          hasil.push(tmp);
        }
        res.json(hasil);
      } catch (err) {
        next(err);
      }
    }

  });
};