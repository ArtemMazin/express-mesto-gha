const handleUserErrors = (err, res) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(400).send({
      message: 'Переданы некорректные данные',
    });
  } if (err.message === 'NotFound') {
    return res.status(404).send({
      message: 'Такого пользователя не существует',
    });
  }
  return res.status(500).send({ message: 'Произошла ошибка сервера' });
};

const handleCardErrors = (err, res) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(400).send({
      message: 'Переданы некорректные данные',
    });
  } if (err.message === 'NotFound') {
    return res.status(404).send({
      message: 'Такой карточки не существует',
    });
  }
  return res.status(500).send({ message: 'Произошла ошибка сервера' });
};

export { handleUserErrors, handleCardErrors };
