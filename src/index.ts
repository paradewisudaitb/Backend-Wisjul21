import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (_, res) => res.send('Hewwwo'));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});