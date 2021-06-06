import { Router } from 'express';
import { newWisudawan } from '../services/form';
import * as uploader from '../connections/cdn';
import { ManagedUpload } from 'aws-sdk/clients/s3';

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
        name: w.namaLengkap,
        nim: w.nim,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

  route.post('/uploadFoto', uploader.uploader.single('foto'), (req, res, next) => {
    const uploadParams = {
      Bucket: 'wisjul21',
      Body: req.file.buffer,
      ACL: 'public-read',
      Key: `fotoWisudawan/${req.file.originalname}`,
    };
    uploader.s3.upload(uploadParams, (err: Error, _: ManagedUpload.SendData) => {
      if (err) {
        console.error(err);
        next(err);
      }

      console.log(`A file (${req.file.originalname}) has been uploaded to fotoWisudawan`);
      res.set(201).json({ message: 'OK' });
    });
  });
};
