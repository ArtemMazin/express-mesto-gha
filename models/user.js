import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import isEmail from 'validator/lib/isEmail';
import isURL from 'validator/lib/isURL';
import IncorrectEmailOrPassword from '../errors/IncorrectEmailOrPassword';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильный формат ссылки',
    },
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    select: false,
  },
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;

  return user;
};

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new IncorrectEmailOrPassword('Неправильные почта или пароль');
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new IncorrectEmailOrPassword('Неправильные почта или пароль');
        }

        return user;
      });
    });
};

export default mongoose.model('user', userSchema);
