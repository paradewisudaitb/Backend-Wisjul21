import config from './config';
import cors from 'cors';
import express from 'express';
import db from './models';
import routes from './routes';

const app = express();

// katanya bagus kalo pake reverse proxy
app.enable('trust proxy');
if (process.env.NODE_ENV == 'production') {
  app.use(cors({
    origin: 'https://wisjulitb.com',
  }));
} else {
  app.use(cors());
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes());

// health check
app.get('/status', (_, res) => res.status(200).end());
app.head('/status', (_, res) => res.status(200).end());

db.sequelize.sync().then(() => {
  app.listen(config.PORT, () => {
    console.log(`Server started on port ${config.PORT}`);
  });
});
