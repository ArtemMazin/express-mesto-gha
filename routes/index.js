import { Router } from 'express';
import {
  celebrate, Joi, errors, Segments,
} from 'celebrate';
import checkAuth from '../middlewares/auth';
import userRoutes from './users';
import cardRoutes from './cards';
import { register, login } from '../controllers/users';

const router = Router();

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), register);

router.use(checkAuth);

router.use(userRoutes);
router.use(cardRoutes);

router.use('*', (req, res) => res.status(404).send({
  message: 'Указан некорректный маршрут',
}));

export default router;
