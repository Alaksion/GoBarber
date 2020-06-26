import express from 'express';
import router from './routes/index';
import './database';
import 'reflect-metadata';

const app = express();
const port = 3030;

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
