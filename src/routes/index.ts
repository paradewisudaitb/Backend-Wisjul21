import { Router } from 'express';
import form from './form';
import jurusan from './jurusan';

export default (): Router => {
  const app = Router();

  form(app);
  jurusan(app);

  return app;
};
