const handleErrors = (err, req, res, next) => {
  const { statusCode = 500 } = err;

  // if (err.code === 11000) {
  //   error = new EmailIsExist('Пользователь с таким email уже существует');
  // }

  res.status(err.statusCode).send({
    message: statusCode === 500 && err.code !== 11000
      ? 'На сервере произошла ошибка'
      : err.message,
  });
  next();
};

export default handleErrors;
