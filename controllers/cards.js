import Card from '../models/card';
import NotFoundError from '../errors/NotFoundError';
import NotEnoughRights from '../errors/NotEnoughRights';

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch(next);
};

const getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(next);
};

const deleteCardById = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => new NotFoundError())
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        res.send({ data: card });
      } else {
        throw new NotEnoughRights();
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const owner = req.user._id;

  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: owner } }, { new: true })
    .orFail(() => new NotFoundError())
    .then((card) => res.send({ data: card }))
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const owner = req.user._id;

  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: owner } }, { new: true })
    .orFail(() => new NotFoundError())
    .then((card) => res.send({ data: card }))
    .catch(next);
};

export {
  createCard, getCards, deleteCardById, likeCard, dislikeCard,
};
