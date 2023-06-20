import { Router } from 'express';
import {
  getUserByIdValidation, updateAvatarValidation, updateProfileValidation,
} from '../utils/validationConfig';
import {
  getUsers, getUserById, updateProfile, updateAvatar, getProfile,
} from '../controllers/users';

const router = Router();

router.get('/users', getUsers);

router.get('/users/me', getProfile);

router.get('/users/:userId', getUserByIdValidation, getUserById);

router.patch('/users/me', updateProfileValidation, updateProfile);

router.patch('/users/me/avatar', updateAvatarValidation, updateAvatar);

export default router;
