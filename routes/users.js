import { Router } from 'express';
import {
  celebrate, Joi, errors, Segments,
} from 'celebrate';
import {
  getUsers, getUserById, updateProfile, updateAvatar, getProfile,
} from '../controllers/users';

const router = Router();

router.get('/users', getUsers);

router.get('/users/me', getProfile);

router.get('/users/:userId', getUserById);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);

router.patch('/users/me/avatar', updateAvatar);

export default router;
