import { Router } from 'express';
import {
  createCard, getCards, deleteCardById, likeCard, dislikeCard,
} from '../controllers/cards';
import {
  createCardValidation, deleteCardByIdValidation, dislikeCardValidation, likeCardValidation,
} from '../utils/validationConfig';

const router = Router();

router.post('/cards', createCardValidation, createCard);

router.get('/cards', getCards);

router.delete('/cards/:cardId', deleteCardByIdValidation, deleteCardById);

router.put('/cards/:cardId/likes', likeCardValidation, likeCard);

router.delete('/cards/:cardId/likes', dislikeCardValidation, dislikeCard);

export default router;
