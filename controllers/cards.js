import Card from '../models/card';
import handleErrors from '../errors/handleErrors';

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => handleErrors(err, res))
    .catch(next);
};

const getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => handleErrors(err, res))
    .catch(next);
};

const deleteCardById = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => new Error('NotFound'))
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        res.send({ data: card });
      } else {
        Promise.reject(new Error()).catch((err) => res.status(403).send({
          message: 'Недостаточно прав для удаления',
        }));
      }
    })
    .catch((err) => handleErrors(err, res))
    .catch(next);
};

const likeCard = (req, res, next) => {
  const owner = req.user._id;

  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: owner } }, { new: true })
    .orFail(() => new Error('NotFound'))
    .then((card) => res.send({ data: card }))
    .catch((err) => handleErrors(err, res))
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const owner = req.user._id;

  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: owner } }, { new: true })
    .orFail(() => new Error('NotFound'))
    .then((card) => res.send({ data: card }))
    .catch((err) => handleErrors(err, res))
    .catch(next);
};

export {
  createCard, getCards, deleteCardById, likeCard, dislikeCard,
};
