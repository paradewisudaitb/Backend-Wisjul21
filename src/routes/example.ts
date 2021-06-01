/**
 * Contoh buat routing
 */

import { Router } from 'express';
import services from '../services';

const route = Router();

export default (app: Router): void => {
  app.use('/example', route);

  // diakses lewat /example/anjay
  route.get('/anjay', (req, res) => {
    return res.json({
      message: 'Hewwwwooo wooowwddd',
    });
  });

  route.get('/db', (req, res) => {
    services.dbService().then(
      hasil => hasil == 0 ? res.send('Berhasil buka koneksi ke DB')
        : res.send('Gagal buka koneksi ke DB')
    ).catch(
      err => console.error(err)
    );
  });
};
