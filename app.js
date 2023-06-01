import express from 'express';
import mongoose from 'mongoose';
import User from './models/user.js';

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '647884f2468bb0be2b612ae9',
  };

  next();
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.post('/users', (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка', err: `${err.message}` }));
});

app.get('/users', (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
});

app.get('/users/:userId', (req, res) => {
  User.findById(req.params._id)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
