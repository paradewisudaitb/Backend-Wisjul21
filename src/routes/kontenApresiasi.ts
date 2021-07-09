import { Router } from 'express';
import { uploader, multerUpload as upload } from './middleware/uploader';
import HttpException from './middleware/HttpException';
import {
  create as createKarya,
  getApresiasiByNamaHimpunan,
} from '../models/kontenApresiasi';
import { getHimpunanFromNamaHimpunan } from '../models/himpunan';

const router = Router();

export default (app: Router): void => {
  app.use('/kontenApresiasi', router);

  router.post(
    '/upload',
    upload.single('kontenApresiasi'),
    async (req, res, next) => {
      const namaHimpunan = req.body.namaHimpunan;
      const tipeApresiasi = req.body.tipeApresiasi;
      const idHimpunan = (await getHimpunanFromNamaHimpunan(namaHimpunan))
        .idHimpunan;

      if (
        namaHimpunan &&
        tipeApresiasi &&
        (req.file || req.body.kontenApresiasi)
      ) {
        if (req.file && tipeApresiasi != 'website') {
          const fname = `[${Date.now()}]${req.file.originalname}`;
          const path = `kontenApresiasi/${fname}`;
          const fullPath = `https://wisjul21.sgp1.cdn.digitaloceanspaces.com/${path}`;

          try {
            uploader(req.file, path);
            createKarya(idHimpunan, fullPath, fullPath, tipeApresiasi);
            res.status(201).send({ konten: fname });
          } catch (err) {
            next(err);
          }
        } else if (req.body.kontenApresiasi && tipeApresiasi == 'website') {
          try {
            createKarya(
              idHimpunan,
              req.body.kontenApresiasi,
              req.body.kontenApresiasi,
              tipeApresiasi
            );
            res.status(201).send({ konten: req.body.kontenApresiasi });
          } catch (err) {
            next(err);
          }
        } else {
          throw new HttpException(400, 'Konten apresiasi tidak bisa kosong');
        }
      } else {
        throw new HttpException(
          400,
          'Tidak bisa melakukan upload konten apresiasi tanpa nama himpunan, tipe apresiasi, dan id himpunan'
        );
      }
    }
  );

  router.get('/get', async (req, res, next) => {
    const namaHimpunan = req.query.namaHimpunan?.toString();
    if (!namaHimpunan) {
      const e = new HttpException(
        400,
        'Tidak bisa mencari konten apresiasi tanpa nama himpunan.'
      );
      next(e);
    } else {
      try {
        const kontenApresiasi = await getApresiasiByNamaHimpunan(namaHimpunan);
        res.json(kontenApresiasi);
      } catch (err) {
        next(err);
      }
    }
  });
};
