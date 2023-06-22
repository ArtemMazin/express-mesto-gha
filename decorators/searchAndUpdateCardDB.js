import Card from '../models/card';
import NotFoundError from '../errors/NotFoundError';

// возможно, лучше сделать универсальный декоратор для моделей User и Card
// в таком случае придется передавать больше параметров возвращаемой функции
export default function searchAndUpdateCardDB(req, res, next) {
  return function (newData) {
    Card.findByIdAndUpdate(req.params.cardId, newData, { new: true })
      .orFail(() => new NotFoundError('Карточка не найдена'))
      .then((card) => res.send({ data: card }))
      .catch(next);
  };
}
