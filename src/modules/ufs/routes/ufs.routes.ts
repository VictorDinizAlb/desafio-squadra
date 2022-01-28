import { Router } from 'express';
import UfsController from '../controllers/UfsController';

const ufsRouter = Router();
const ufsController = new UfsController();

ufsRouter.post('/', ufsController.gravar);
ufsRouter.get('/', ufsController.listar);
<<<<<<< HEAD
// ufsRouter.get('/teste', ufsController.teste);
// ufsRouter.get('/:codigoUF', ufsController.show);
ufsRouter.put('/:id', ufsController.alterar);
// ufsRouter.delete('/:id', ufsController.deletar);
=======
ufsRouter.put('/', ufsController.alterar);
ufsRouter.delete('/:CODIGO_UF', ufsController.deletar);
>>>>>>> 69abe566496a0a7f944769f66392f22632dcdb3b

export default ufsRouter;
