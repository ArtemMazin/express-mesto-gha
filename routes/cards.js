import { Router } from 'express';
import { createCard, getCards, deleteCardById, likeCard, dislikeCard } from '../controllers/cards.js';

const router = Router();

router.post('/cards', createCard);

router.get('/cards', getCards);

router.delete('/cards/:cardId', deleteCardById);

router.put('/cards/:cardId/likes', likeCard);

router.delete('/cards/:cardId/likes', dislikeCard);

export default router;
