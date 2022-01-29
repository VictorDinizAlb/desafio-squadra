import { Router } from 'express';
import BairrosController from '../controllers/BairrosController';

const bairrosRouter = Router();
const bairrosController = new BairrosController();

bairrosRouter.post('/', bairrosController.gravar);
bairrosRouter.get('/', bairrosController.listar);
bairrosRouter.put('/', bairrosController.alterar);
bairrosRouter.delete('/:CODIGO_BAIRRO', bairrosController.deletar);

export default bairrosRouter;
