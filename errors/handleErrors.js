import NotFoundError from './NotFoundError';
import IncorrectDataError from './IncorrectDataError';
import ServerError from './ServerError';

const handleErrors = (err, res) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    throw new IncorrectDataError('Переданы некорректные данные');
  }
  if (err.message === 'NotFound') {
    throw new NotFoundError('Объект не найден');
  }
  throw new ServerError('Произошла ошибка сервера');
};

export default handleErrors;
