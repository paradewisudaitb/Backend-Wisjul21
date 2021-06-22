import { Router } from 'express';
import form from './form';
import jurusan from './jurusan';
import pesan from './pesan';
import wisudawan from './dataWisudawan';
<<<<<<< HEAD
import kontenApresiasi from './kontenApresiasi';
=======
import himpunan from './himpunan';

>>>>>>> c905767310a43f7bfb24faec15c8cbf7589038e9
export default (): Router => {
  const app = Router();

  form(app);
  jurusan(app);
  pesan(app);
  wisudawan(app);
<<<<<<< HEAD
  kontenApresiasi(app);
=======
  himpunan(app);

>>>>>>> c905767310a43f7bfb24faec15c8cbf7589038e9
  return app;
};
