import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ForgotPasswordController from '../controllers/ForgotPasswordController';

 const passwordRouters = Router();
 const forgotPasswordController = new ForgotPasswordController();



 passwordRouters.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    }
  }),
  forgotPasswordController.create,
  );

  export default passwordRouters;
