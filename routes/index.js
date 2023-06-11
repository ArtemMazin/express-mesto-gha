import { Router } from 'express';
import checkAuth from '../middlewares/auth';
import userRoutes from './users';
import cardRoutes from './cards';
import { register, login } from '../controllers/users';

const router = Router();

router.post('/signin', login);
router.post('/signup', register);

router.use(checkAuth);

router.use(userRoutes);
router.use(cardRoutes);

router.use('*', (req, res) => res.status(404).send({
  message: 'Указан некорректный маршрут',
}));

export default router;
