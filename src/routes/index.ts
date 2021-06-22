import { Router } from 'express';
import form from './form';
import jurusan from './jurusan';
import pesan from './pesan';
import wisudawan from './dataWisudawan';
import kontenApresiasi from './kontenApresiasi';
import himpunan from './himpunan';

export default (): Router => {
  const app = Router();

  form(app);
  jurusan(app);
  pesan(app);
  wisudawan(app);
  kontenApresiasi(app);
  himpunan(app);

  return app;
};
