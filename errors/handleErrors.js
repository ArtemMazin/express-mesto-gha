import NotFoundError from './NotFoundError';
import IncorrectDataError from './IncorrectDataError';
import ServerError from './ServerError';
import EmailIsExist from './EmailIsExist';
import IncorrectEmailOrPassword from './IncorrectEmailOrPassword';
import NotEnoughRights from './NotEnoughRights';

const handleErrors = (err, req, res, next) => {
  let error;

  if (err.statusCode === 500) {
    error = new ServerError('На сервере произошла ошибка');
  } else if (err.statusCode === 400) {
    error = new IncorrectDataError('Переданы некорректные данные');
  } else if (err.statusCode === 401) {
    error = new IncorrectEmailOrPassword('Неправильные почта или пароль');
  } else if (err.statusCode === 409) {
    error = new EmailIsExist('Пользователь с таким email уже существует');
  } else if (err.statusCode === 404) {
    error = new NotFoundError('Объект не найден');
  } else if (err.statusCode === 403) {
    error = new NotEnoughRights('Недостаточно прав для удаления');
  }
  // if (err.name === 'ValidationError' || err.name === 'CastError') {
  //   throw new IncorrectDataError('Переданы некорректные данные');
  // }
  // if (err.message === 'NotFound') {
  //   throw new NotFoundError('Объект не найден');
  // }
  // if (err.code === 11000) {
  //   throw new EmailIsExist('Пользователь с таким email уже существует');
  // }
  // if (err.message === 'IncorrectEmailOrPassword') {
  //   throw new IncorrectData('Неправильные почта или пароль');
  // }

  res.status(err.statusCode).send({ message: error.message });
  next();
};

export default handleErrors;
