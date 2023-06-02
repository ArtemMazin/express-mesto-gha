import Card from '../models/card.js';

const createCard = (req, res) => {
  const { name, link } = req.body;

  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка', err: `${err.message}` }));
};

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

const deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

const likeCard = (req, res) => {
  const owner = req.user._id;
  console.log(req.params.cardId);

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: owner } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

const dislikeCard = (req, res) => {
  const owner = req.user._id;
  console.log(req.params.cardId);

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: owner } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

export { createCard, getCards, deleteCardById, likeCard, dislikeCard };
