import { Router } from 'express';
const router = Router();
import userRoutes from './users.js';

router.use(userRoutes);

export default router;
