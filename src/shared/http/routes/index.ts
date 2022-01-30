import { response, Router } from 'express';
import ufsRouter from '@modules/ufs/routes/ufs.routes';
import municipiosRouter from '@modules/municipios/routes/municipios.routes';
import bairrosRouter from '@modules/bairros/routes/bairros.routes';
import pessoasRouter from '@modules/pessoas/routes/pessoas.routes';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello World! 🤑' });
});

routes.use('/uf', ufsRouter);
routes.use('/municipio', municipiosRouter);
routes.use('/bairro', bairrosRouter);
routes.use('/pessoa', pessoasRouter);

export default routes;
