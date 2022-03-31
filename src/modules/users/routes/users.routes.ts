import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import { celebrate, Joi, Segments } from 'celebrate';
import autenticado from '@shared/http/middlewares/autenticado';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', autenticado, usersController.index);

usersRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      senha: Joi.string().required()
    }
  }),
  usersController.create);

  export default usersRouter;
