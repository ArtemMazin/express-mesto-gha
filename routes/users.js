import { Router } from 'express';
import { createUser, getUsers, getUserById, updateProfile, updateAvatar, login } from '../controllers/users';
import auth from '../middlewares/auth';

const router = Router();

router.post('/signin', login);

router.post('/signup', createUser);

router.use(auth);

router.get('/users', getUsers);

router.get('/users/:userId', getUserById);

router.patch('/users/me', updateProfile);

router.patch('/users/me/avatar', updateAvatar);

export default router;
