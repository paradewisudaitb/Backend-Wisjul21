import { Router } from 'express';
import { newWisudawan } from '../services/form';

const route = Router();

/**
 * Router untuk database terpusat
 * @param app Express app
 */
export default (app: Router): void => {
  app.use('/form', route);

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
};
