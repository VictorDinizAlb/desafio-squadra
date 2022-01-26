import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';


const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

// Middleware:
app.use((error: Error, resquest: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.status).json({
      status: 'error',
      message: error.message,
    });
  } else {
    return response.status(404).json({
      status: 404,
      message: 'Nao foi possivel conectar com o servidor.',
    });
  };
});

app.listen(3333, () => {
  console.log('Conectou na porta 3333');
});
