import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '../controllers/UsersController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticade';
import UserAvatarController from '../controllers/UserAvatarController';
import multer from 'multer';
import uploadConfig from '@config/upload';

 const usersRouters = Router();
 const usersConstroller = new UsersController();
 const usersAvatarController = new UserAvatarController();

 const upload = multer(uploadConfig);

 usersRouters.get('/', isAuthenticated, usersConstroller.index);

 usersRouters.post(
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

  usersRouters.patch(
    '/avatar',
    isAuthenticated,
    upload.single('avatar'),
    usersAvatarController.update
  );

  export default usersRouters;
