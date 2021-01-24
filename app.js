const express = require('express');
const app = express();
const path = require('path');
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {createUser, login} = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err');
const { PORT = 3000} = process.env;
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://localhost:27017/mestodb',{
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(requestLogger);
app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use(errorLogger);
app.use(function(req, res){
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});
app.use(errors());
app.use((err, req, res, next) =>{
  if(err.statusCode){
    res.status(err.statusCode).send({ message: err.message });
  } else{
    const { statusCode = 500, message } = err;

  res.status(statusCode).send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message
    });
  }
})


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})