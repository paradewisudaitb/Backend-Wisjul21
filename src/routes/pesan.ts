import { Router } from 'express';
import { getPesanForNIM, create as createPesan } from '../models/pesan';
import HttpException from './middleware/HttpException';

const router = Router();

export default (app: Router): void => {
  app.use('/pesan', router);

  router.get('/get', async (req, res, next) => {
    // /pesan/get?nim=...
    const nim = req.query.nim?.toString();
    if (!nim) {
      const e = new HttpException(400, 'Tidak bisa mencari pesan tanpa NIM wisudawan.');
      next(e);
    } else {
      try {
        const pesan = await getPesanForNIM(nim);
        res.json(pesan);
      } catch (err) {
        next(err);
      }
    }
  });

  router.post('/new', async (req, res, next) => {
    try {
      // harusnya ga bakal masuk ke sini
      if (!req.body.nim || !req.body.pesan) {
        const e = new HttpException(400, `
Gagal membuat pesan karena parameter nim atau pesan tidak ada.
nim: ${req.body.nim}
pesan: ${req.body.pesan}
        `);
        next(e);
      }
      await createPesan(req.body.nim, req.body.pesan, req.body.namaPengirim);
      res.status(201).json({
        penerima: req.body.nim,
        isi: req.body.pesan,
        pengirim: req.body.pengirim || 'Anonymous'
      });
    } catch (err) {
      next(err);
    }
  });
};