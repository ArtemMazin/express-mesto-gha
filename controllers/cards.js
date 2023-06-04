import Card from '../models/card';
import { handleCardErrors } from '../utils/utils';

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => handleCardErrors(err, res));
};

const getCards = (req, res) => {
  Card.find({})
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => handleCardErrors(err, res));
};

const deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => new Error('NotFound'))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => handleCardErrors(err, res));
};

const likeCard = (req, res) => {
  const owner = req.user._id;

  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: owner } }, { new: true })
    .orFail(() => new Error('NotFound'))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => handleCardErrors(err, res));
};

const dislikeCard = (req, res) => {
  const owner = req.user._id;

  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: owner } }, { new: true })
    .orFail(() => new Error('NotFound'))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => handleCardErrors(err, res));
};

export {
  createCard, getCards, deleteCardById, likeCard, dislikeCard,
};
