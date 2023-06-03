import Card from '../models/card.js';

const ERROR_CODE = 400;

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({
          message: 'Переданы некорректные данные',
        });
      } else {
        return res.status(500).send({ message: 'Произошла ошибка сервера' });
      }
    });
};

const getCards = (req, res) => {
  Card.find({})
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({
          message: 'Переданы некорректные данные',
        });
      } else {
        return res.status(500).send({ message: 'Произошла ошибка сервера' });
      }
    });
};

const deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({
          message: 'Переданы некорректные данные',
        });
      } else {
        return res.status(500).send({ message: 'Произошла ошибка сервера' });
      }
    });
};

const likeCard = (req, res) => {
  const owner = req.user._id;
  console.log(req.params.cardId);

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: owner } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({
          message: 'Переданы некорректные данные',
        });
      } else if (err.name === 'CastError') {
        return res.status(404).send({
          message: 'Такой карточки не существует',
        });
      } else {
        return res.status(500).send({ message: 'Произошла ошибка сервера' });
      }
    });
};

const dislikeCard = (req, res) => {
  const owner = req.user._id;

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: owner } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({
          message: 'Переданы некорректные данные',
        });
      } else if (err.name === 'CastError') {
        return res.status(404).send({
          message: 'Такой карточки не существует',
        });
      } else {
        return res.status(500).send({ message: 'Произошла ошибка сервера' });
      }
    });
};

export { createCard, getCards, deleteCardById, likeCard, dislikeCard };
