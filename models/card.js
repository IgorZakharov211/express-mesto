const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  "name": {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  "link": {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /(http|https):\/\/?[a-z0-9-\._~:\/?#[\]@!$&'\(\)*\+,;=]+/gi.test(v);
      },
      message: props => `${props.value} неправильно указана ссылка!`
    }
  },
  "owner": {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  "likes": [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: []
  }],
  "createdAt":{
    type: Date,
    default: Date.now
  }
});

const cardModel = mongoose.model('card', cardSchema);

module.exports = cardModel;