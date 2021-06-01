import express from 'express';
import config from './config';
import routes from './routes';

const app = express();

app.use('/', routes());
app.get('/', (_, res) => res.send('Root'));

app.listen(config.PORT, () => {
  console.log(`Server started on port ${config.PORT}`);
});