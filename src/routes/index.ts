import { Router } from 'express';
import example from './example';

export default () => {
  const app = Router();

  example(app);

  return app;
}