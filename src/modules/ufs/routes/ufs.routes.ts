import { Router } from 'express';
import UfsController from '../controllers/UfsController';

const ufsRouter = Router();
const ufsController = new UfsController();

ufsRouter.post('/', ufsController.gravar);
ufsRouter.get('/', ufsController.listar);
ufsRouter.put('/', ufsController.alterar);
ufsRouter.delete('/:codigoUF', ufsController.deletar);

export default ufsRouter;
