import { Router } from 'express';
const router = Router();
import userRoutes from './users.js';
import cardRoutes from './cards.js';

router.use(userRoutes);
router.use(cardRoutes);

export default router;
