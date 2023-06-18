import NotFoundError from './NotFoundError';
import IncorrectDataError from './IncorrectDataError';
import ServerError from './ServerError';
import EmailIsExist from './EmailIsExist';
import IncorrectData from './IncorrectEmailOrPassword';

const handleErrors = (err, req, res, next) => {
  let error;
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  if (err.statusCode === 400) {
    error = new IncorrectDataError('Переданы некорректные данные');
    console.log(error);
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
