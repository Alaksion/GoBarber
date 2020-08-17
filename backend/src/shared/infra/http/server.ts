import 'reflect-metadata';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import AppError from '@shared/errors/AppError';
import router from '@shared/infra/http/routes/index';
import '@shared/infra/typeorm';
import multerconfig from '@config/MulterConfig';
import '@shared/container';
import { errors } from 'celebrate';

const app = express();
const port = 3030;
app.use(cors());
app.use(express.json());
app.use('/files', express.static(multerconfig.directory));
app.use(router);
app.use(errors());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server Error',
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
