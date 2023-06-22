import { Router } from 'express';
import {
  createCard, getCards, deleteCardById, likeCard, dislikeCard,
} from '../controllers/cards';
import {
  createCardValidation, deleteCardByIdValidation, dislikeCardValidation, likeCardValidation,
} from '../utils/validationConfig';

const router = Router();

router.post('/', createCardValidation, createCard);

router.get('/', getCards);

router.delete('/:cardId', deleteCardByIdValidation, deleteCardById);

router.put('/:cardId/likes', likeCardValidation, likeCard);

router.delete('/:cardId/likes', dislikeCardValidation, dislikeCard);

export default router;
