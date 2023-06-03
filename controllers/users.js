import User from '../models/user.js';

const ERROR_CODE = 400;

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
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

const getUsers = (req, res) => {
  User.find({})
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

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => new Error('NotFound'))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(ERROR_CODE).send({
          message: 'Переданы некорректные данные',
        });
      } else if (err.message === 'NotFound') {
        return res.status(404).send({
          message: 'Такого пользователя не существует',
        });
      } else {
        return res.status(500).send({ message: 'Произошла ошибка сервера' });
      }
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(
    owner,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: true, // если пользователь не найден, он будет создан
    }
  )
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

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(
    owner,
    { avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: true, // если пользователь не найден, он будет создан
    }
  )
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

export { createUser, getUsers, getUserById, updateProfile, updateAvatar };
