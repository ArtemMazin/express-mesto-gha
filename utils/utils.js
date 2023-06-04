const handleUserErrors = (err, res) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(400).send({
      message: 'Переданы некорректные данные',
    });
  } else if (err.message === 'NotFound') {
    return res.status(404).send({
      message: 'Такого пользователя не существует',
    });
  } else {
    return res.status(500).send({ message: 'Произошла ошибка сервера' });
  }
};

const handleCardErrors = (err, res) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(400).send({
      message: 'Переданы некорректные данные',
    });
  } else if (err.message === 'NotFound') {
    return res.status(404).send({
      message: 'Такой карточки не существует',
    });
  } else {
    return res.status(500).send({ message: 'Произошла ошибка сервера' });
  }
};

export { handleUserErrors, handleCardErrors };
