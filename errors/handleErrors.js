import NotFoundError from './NotFoundError';
import IncorrectDataError from './IncorrectDataError';
import ServerError from './ServerError';
import EmailIsExist from './EmailIsExist';

const handleErrors = (err, res) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    throw new IncorrectDataError('Переданы некорректные данные');
  }
  if (err.message === 'NotFound') {
    throw new NotFoundError('Объект не найден');
  }
  if (err.code === 11000) {
    throw new EmailIsExist('Пользователь с таким email уже существует');
  }
  throw new ServerError('Произошла ошибка сервера');
};

export default handleErrors;
