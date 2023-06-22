import User from '../models/user';

export default function searchAndUpdateUserDB(req, res, next) {
  return function (newData) {
    User.findByIdAndUpdate(req.user._id, newData, {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    })
      .then((user) => res.send({ data: user }))
      .catch(next);
  };
}
