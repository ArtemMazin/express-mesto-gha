import { Router } from 'express';
import { createUser, getUsers, getUserById, updateProfile, updateAvatar } from '../controllers/users.js';

const router = Router();

router.post('/users', createUser);

router.get('/users', getUsers);

router.get('/users/:userId', getUserById);

router.patch('/users/me', updateProfile);

router.patch('/users/me/avatar', updateAvatar);

export default router;
