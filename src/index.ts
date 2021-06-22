import express from 'express';
import loader from './loaders';

const main = async () => {
  const app = express();
  loader(app);
};

main();