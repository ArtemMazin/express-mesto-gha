import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError';
import { SECRET_KEY } from '../dotenv';

const checkAuth = (req, res, next) => {
  if (req.cookies.jwt) {
    const token = req.cookies.jwt;
    const payload = jwt.verify(token, SECRET_KEY);
    req.user = payload;
  } else {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  next();
};

export default checkAuth;
