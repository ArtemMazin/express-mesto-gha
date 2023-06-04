import { Router } from 'express';
import userRoutes from './users';
import cardRoutes from './cards';

const router = Router();

router.use(userRoutes);
router.use(cardRoutes);

router.use('/', (req, res) => res.status(404).send({
  message: 'Указан некорректный маршрут',
}));

export default router;
