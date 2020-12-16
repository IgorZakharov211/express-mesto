const express = require('express');
const app = express();
const path = require('path');
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');
const notFoundRouter = require('./routes/notFound.js');
const mongoose = require('mongoose');

const { PORT = 3000} = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb',{
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use('/', notFoundRouter);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})