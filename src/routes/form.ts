import { Router } from 'express';
import { newWisudawan } from '../services/form';
import HttpException from './middleware/HttpException';
import { uploader, multerUpload as upload } from './middleware/uploader';

const route = Router();

/**
 * Router untuk database terpusat
 * @param app Express app
 */
export default (app: Router): void => {
  app.use('/form', route);

  /**
   * @returns JSON: {
   *    name: nama lengkap wisudawan,
   *    nim: NIM wisudawan
   * }
   */
  route.post('/create', async (req, res, next) => {
    try {
      const w = await newWisudawan(req.body);
      res.status(201).json({
        nama: w.namaLengkap,
        nim: w.nim,
      });
    } catch (error) {
      next(error);
    }
  });

  route.post('/uploadFoto', upload.single('foto'), (req, res, next) => {
    if (req.file) {
      const fname = `[${Date.now()}]${req.file.originalname}`;
      const path = `fotoWisudawan/${fname}`;
      try {
        uploader(req.file, path);
        res.status(201).send({ filename: fname });
      } catch (err) {
        next(err);
      }
    } else {
      next(new HttpException(400, 'Tidak ada file yang diupload.'))
    }
  });
};
