import User from '../models/user.js';
import { handleUserErrors } from '../utils/utils.js';

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => handleUserErrors(err, res));
};

const getUsers = (req, res) => {
  User.find({})
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => handleUserErrors(err, res));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => new Error('NotFound'))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => handleUserErrors(err, res));
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
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => handleUserErrors(err, res));
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
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => handleUserErrors(err, res));
};

export { createUser, getUsers, getUserById, updateProfile, updateAvatar };
