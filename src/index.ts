import express from 'express';
import config from './config';
import routes from './routes';
import db from './models';

const app = express();

app.use('/', routes());
app.get('/', (_, res) => res.send('Root'));

db.sequelize.sync().then(() => {
  app.listen(config.PORT, () => {
    console.log(`Server started on port ${config.PORT}`);
  });
});