import { Router } from 'express';
import TestesController from '../controllers/TestesController';

const testesRouter = Router();
const testesController = new TestesController();

testesRouter.post('/', testesController.gravar);
testesRouter.get('/', testesController.listar);
// testesRouter.get('/:id', ufsController.show);
// testesRouter.put('/:id', ufsController.alterar);
// testesRouter.delete('/:id', ufsController.deletar);

export default testesRouter;
