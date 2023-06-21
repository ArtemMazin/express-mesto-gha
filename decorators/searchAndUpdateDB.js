import User from '../models/user';

export default function searchAndUpdateDB(req, res, next) {
  return function (newData) {
    const owner = req.user._id;

    User.findByIdAndUpdate(owner, newData, {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    })
      .then((user) => res.send({ data: user }))
      .catch(next);
  };
}
