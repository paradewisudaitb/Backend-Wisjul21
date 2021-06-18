import { Router } from 'express';
import form from './form';
import jurusan from './jurusan';
import pesan from './pesan';
import wisudawan from './dataWisudawan';

export default (): Router => {
  const app = Router();

  form(app);
  jurusan(app);
  pesan(app);
  wisudawan(app);

  return app;
};
