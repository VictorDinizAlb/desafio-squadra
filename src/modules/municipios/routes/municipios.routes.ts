import { Router } from 'express';
import MunicipiosController from '../controllers/MunicipiosController';

const municipiosRouter = Router();
const municipiosController = new MunicipiosController();

municipiosRouter.post('/', municipiosController.gravar);
municipiosRouter.get('/', municipiosController.listar);
municipiosRouter.put('/', municipiosController.alterar);
municipiosRouter.delete('/:CODIGO_MUNICIPIO', municipiosController.deletar);

export default municipiosRouter;
