import { Router } from 'express';
import form from './form';

export default (): Router => {
  const app = Router();

  form(app);

  return app;
};
