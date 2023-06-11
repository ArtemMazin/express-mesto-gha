import { Router } from 'express';
import userRoutes from './users';
import cardRoutes from './cards';
import auth from '../middlewares/auth';
import { register, login } from '../controllers/users';

const router = Router();

router.use('/', auth, userRoutes);
router.use('/', auth, cardRoutes);

router.post('/signin', login);
router.post('/signup', register);

router.use('/', (req, res) =>
  res.status(404).send({
    message: 'Указан некорректный маршрут',
  })
);

export default router;
