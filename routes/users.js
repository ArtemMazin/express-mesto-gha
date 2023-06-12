import { Router } from 'express';
import {
  getUsers, getUserById, updateProfile, updateAvatar, getProfile,
} from '../controllers/users';

const router = Router();

router.get('/users', getUsers);

router.get('/users/me', getProfile);

router.get('/users/:userId', getUserById);

router.patch('/users/me', updateProfile);

router.patch('/users/me/avatar', updateAvatar);

export default router;
