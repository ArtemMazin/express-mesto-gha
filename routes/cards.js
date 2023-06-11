import { Router } from 'express';
import { createCard, getCards, deleteCardById, likeCard, dislikeCard } from '../controllers/cards';
import auth from '../middlewares/auth';

const router = Router();

router.use(auth);

router.post('/cards', createCard);

router.get('/cards', getCards);

router.delete('/cards/:cardId', deleteCardById);

router.put('/cards/:cardId/likes', likeCard);

router.delete('/cards/:cardId/likes', dislikeCard);

export default router;
