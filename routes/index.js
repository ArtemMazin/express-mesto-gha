import { Router } from 'express';
const router = Router();
import userRoutes from './users.js';
import cardRoutes from './cards.js';

router.use(userRoutes);
router.use(cardRoutes);

router.use('/', (req, res) => {
  return res.status(404).send({
    message: 'Указан некорректный маршрут',
  });
});

export default router;
