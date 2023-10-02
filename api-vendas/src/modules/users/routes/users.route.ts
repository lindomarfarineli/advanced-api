import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '../constrollers/UsersController';

 const usersRouter = Router();
 const usersConstroller = new UsersController();

 usersRouter.get('/', usersConstroller.index);

 usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }
  }),
  usersConstroller.create,
  );

  export default usersRouter;
