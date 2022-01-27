import { response, Router } from 'express';
import ufsRouter from '@modules/ufs/routes/ufs.routes';
import testeRouter from '@modules/testes/routes/testes.routes';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello World! 🤑' });
});

routes.use('/uf', ufsRouter);
routes.use('/teste', testeRouter);

export default routes;
