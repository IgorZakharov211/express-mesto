const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  "name": {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто'
  },
  "about": {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь'
  },
  "avatar": {
    type: String,
    validate: {
      validator: function(v) {
        return /(http|https):\/\/?[a-z0-9-\._~:\/?#[\]@!$&'\(\)*\+,;=]+/gi.test(v);
      },
      message: props => `${props.value} неправильно указана ссылка!`
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'
  },
  "email": {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    unique: true,
    validate: {
      validator: function(v){
        return validator.isEmail(v);
      }
    }
  },
  "password": {
    type: String,
    minlength: 6,
    maxlength: 360,
    required: true,
    select: false
  }
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
