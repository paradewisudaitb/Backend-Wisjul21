/**
 * Contoh buat routing
 */

import { Router, Request, Response } from 'express';

const route = Router();

export default (app: Router) => {
  app.use('/example', route);

  // diakses lewat /example/anjay
  route.get('/anjay', (req: Request, res: Response) => {
    return res.json({
      message: 'Hewwwwooo wooowwddd',
    })
  });
};