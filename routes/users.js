import { Router } from 'express';
import {
  getUserByIdValidation, updateAvatarValidation, updateProfileValidation,
} from '../utils/validationConfig';
import {
  getUsers, getUserById, updateProfile, updateAvatar, getProfile,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);

router.get('/me', getProfile);

router.get('/:userId', getUserByIdValidation, getUserById);

router.patch('/me', updateProfileValidation, updateProfile);

router.patch('/me/avatar', updateAvatarValidation, updateAvatar);

export default router;
