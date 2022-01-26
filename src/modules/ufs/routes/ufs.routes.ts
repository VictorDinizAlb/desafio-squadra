import { Router } from 'express';
import UfsController from '../controllers/UfsController';

const ufsRouter = Router();
const ufsController = new UfsController();

ufsRouter.post('/', ufsController.gravar);
// ufsRouter.get('/', ufsController.listar);
// ufsRouter.get('/:id', ufsController.show);
// ufsRouter.put('/:id', ufsController.alterar);
// ufsRouter.delete('/:id', ufsController.deletar);

export default ufsRouter;
