import NotFoundError from './NotFoundError';
import IncorrectDataError from './IncorrectDataError';
import EmailIsExist from './EmailIsExist';
import IncorrectEmailOrPassword from './IncorrectEmailOrPassword';
import NotEnoughRights from './NotEnoughRights';

const handleErrors = (err, req, res, next) => {
  const { statusCode = 500 } = err;
  let error;

  if (statusCode === 400) {
    error = new IncorrectDataError('Переданы некорректные данные');
  } else if (statusCode === 401) {
    error = new IncorrectEmailOrPassword('Неправильные почта или пароль');
  } else if (statusCode === 404) {
    error = new NotFoundError('Объект не найден');
  } else if (statusCode === 403) {
    error = new NotEnoughRights('Недостаточно прав для удаления');
  } else if (err.code === 11000) {
    error = new EmailIsExist('Пользователь с таким email уже существует');
  }

  res.status(error.statusCode).send({
    message: statusCode === 500 && err.code !== 11000
      ? 'На сервере произошла ошибка'
      : error.message,
  });
  next();
};

export default handleErrors;
