import User from '../models/user';
import NotFoundError from '../errors/NotFoundError';

export default function searchDB(req, res, next) {
  return function (id) {
    User.findById(id)
      .orFail(() => new NotFoundError('Пользователь не найден'))
      .then((user) => res.send({ data: user }))
      .catch(next);
  };
}
