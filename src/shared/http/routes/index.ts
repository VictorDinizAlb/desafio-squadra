import { response, Router } from 'express';
import ufsRouter from '@modules/ufs/routes/ufs.routes';
import municipiosRouter from '@modules/municipios/routes/municipios.routes';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello World! 🤑' });
});

routes.use('/uf', ufsRouter);
routes.use('/municipio', municipiosRouter);

export default routes;
