import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { regExpUrl } from '../utils/utils';
import {
  getUsers, getUserById, updateProfile, updateAvatar, getProfile,
} from '../controllers/users';

const router = Router();

router.get('/users', getUsers);

router.get('/users/me', getProfile);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
}), getUserById);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regExpUrl),
  }),
}), updateAvatar);

export default router;
