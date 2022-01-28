import { response, Router } from 'express';
import ufsRouter from '@modules/ufs/routes/ufs.routes';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello World! 🤑' });
});

routes.use('/uf', ufsRouter);

export default routes;
