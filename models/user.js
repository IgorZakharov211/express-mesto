const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  "name": {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  "about": {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  "avatar": {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /(http|https):\/\/?[a-z0-9-\._~:\/?#[\]@!$&'\(\)*\+,;=]+/gi.test(v);
      },
      message: props => `${props.value} неправильно указана ссылка!`
    }
  }
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
