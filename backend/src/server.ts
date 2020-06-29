import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import router from './routes/index';
import './database';
import 'reflect-metadata';
import multerconfig from './config/MulterConfig';
import AppError from './errors/AppError';

const app = express();
const port = 3030;

app.use(express.json());
app.use('/files', express.static(multerconfig.directory));
app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.error(err);
  return res.status(500).json({
    status: 'error',
    message: 'Internal server Error',
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
