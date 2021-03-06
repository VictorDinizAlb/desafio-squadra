import { Router } from 'express';
import PessoasController from '../controllers/PessoasController';

const pessoasRouter = Router();
const pessoasController = new PessoasController();

pessoasRouter.post('/', pessoasController.gravar);
pessoasRouter.get('/', pessoasController.listar);
pessoasRouter.put('/', pessoasController.alterar);
pessoasRouter.delete('/:codigoPessoa', pessoasController.deletar);

export default pessoasRouter;
