import { Router } from 'express';
import form from './form';
import jurusan from './jurusan';
import wisudawan from './dataWisudawan';

export default (): Router => {
  const app = Router();

  form(app);
  jurusan(app);
  wisudawan(app);

  return app;
};
