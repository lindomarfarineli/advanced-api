import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import { celebrate, Joi, Segments } from 'celebrate';

const productsRouter = Router();
const producstController = new ProductsController();

productsRouter.get('/', producstController.index);


productsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]:{
      id: Joi.string().uuid().required,
    }
  }),
   producstController.show);

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]:{
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    }
  }),
   producstController.create);

productsRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]:{
      id: Joi.string().uuid().required,
    }
  }),
  celebrate({
    [Segments.BODY]:{
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    }
  }),
   producstController.update);

productsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]:{
      id: Joi.string().uuid().required,
    }
  }),
   producstController.delete);

export default productsRouter;

