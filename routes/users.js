import { Router } from 'express';
import { createUser, getUsers, getUserById } from '../controllers/users.js';

const router = Router();

router.post('/users', createUser);

router.get('/users', getUsers);

router.get('/users/:userId', getUserById);

export default router;
