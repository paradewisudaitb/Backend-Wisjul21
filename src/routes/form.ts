import { Router } from 'express';
import { newWisudawan } from '../services/form';

const route = Router();

export default (app: Router): void => {
  app.use('/form', route);

  route.post('/create', async (req, res, next) => {
    try {
      const wisudawan = await newWisudawan(req.body);
      res.json({
        nim: wisudawan.nim,
        name: wisudawan.namaLengkap,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  });
};
