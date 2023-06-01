import { Router } from 'express';
import { createCard, getCards, deleteCardById } from '../controllers/cards.js';

const router = Router();

router.post('/cards', createCard);

router.get('/cards', getCards);

router.delete('/cards/:cardId', deleteCardById);

export default router;
