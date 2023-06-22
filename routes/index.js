import { Router } from 'express';
import checkAuth from '../middlewares/auth';
import userRoutes from './users';
import cardRoutes from './cards';
import { register, login } from '../controllers/users';
import NotFoundError from '../errors/NotFoundError';
import { loginValidation, registerValidation } from '../utils/validationConfig';

const router = Router();

router.post('/signin', loginValidation, login);

router.post('/signup', registerValidation, register);

router.use(checkAuth);

router.use('/users', userRoutes);

router.use('/cards', cardRoutes);

router.use('*', (req, res, next) => next(new NotFoundError('Указан некорректный маршрут')));

export default router;
