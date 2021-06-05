import { Router } from 'express';
import * as Wisudawan from '../models/wisudawan';
import { newWisudawan } from '../services/form';

const route = Router();

export default (app: Router): void => {
  app.use('/wisudawan', route);

  route.get('/', (_, res) => {
    res.json({
      wisudawan: Wisudawan.selectAll()
    });
  });

  route.post('/new', async (req, res, next) => {
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
