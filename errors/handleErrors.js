import NotFoundError from './NotFoundError';
import IncorrectDataError from './IncorrectDataError';
import ServerError from './ServerError';
import EmailIsExist from './EmailIsExist';
import IncorrectData from './IncorrectEmailOrPassword';

const handleErrors = (err) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    throw new IncorrectDataError('Переданы некорректные данные');
  }
  if (err.message === 'NotFound') {
    throw new NotFoundError('Объект не найден');
  }
  if (err.code === 11000) {
    throw new EmailIsExist('Пользователь с таким email уже существует');
  }
  if (err.message === 'IncorrectEmailOrPassword') {
    throw new IncorrectData('Неправильные почта или пароль');
  }
  throw new ServerError('Произошла ошибка сервера');
};

export default handleErrors;
