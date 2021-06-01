import { Router } from 'express';
import example from './example';

export default (): Router => {
  const app = Router();

  example(app);

  return app;
};
