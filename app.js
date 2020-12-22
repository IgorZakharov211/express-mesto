const express = require('express');
const app = express();
const path = require('path');
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000} = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb',{
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});
app.use((req, res, next) => {
  req.user = {
    _id: '5fdc85c7526088316013aced'
  };
  next();
});
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use(function(req, res, next){
  res.status(404).send({message: "Запрашиваемый ресурс не найден"})
});


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})