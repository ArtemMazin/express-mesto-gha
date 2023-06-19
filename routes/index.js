import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import checkAuth from '../middlewares/auth';
import userRoutes from './users';
import cardRoutes from './cards';
import { register, login } from '../controllers/users';
import { regExpEmail, regExpUrl } from '../utils/utils';
import NotFoundError from '../errors/NotFoundError';

const router = Router();

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(regExpEmail),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    email: Joi.string().required().pattern(regExpEmail),
    password: Joi.string().required(),
    avatar: Joi.string().pattern(regExpUrl),
  }).unknown(true),
}), register);

router.use(checkAuth);

router.use(userRoutes);
router.use(cardRoutes);

router.use('*', (req, res, next) => next(new NotFoundError('Указан некорректный маршрут')));

export default router;
