import express from 'express';
import config from './config';

const app = express();

app.get('/', (_, res) => res.send('Hewwwo'));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});