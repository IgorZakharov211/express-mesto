const path = require('path');
const getDataFromFile = require('../helpers/files');

const dataPath = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = (req, res) => {
  return getDataFromFile(dataPath)
    .then(users => res.send(users))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка сервера'}));
};

const getProfile = (req, res) => {
  return getDataFromFile(dataPath)
    .then(users => users.find(user => user._id === req.params._id))
    .then((user) => {
      if(!user){
        return res.status(404).send({message: 'Нет пользователя с таким id'})
      }
      return res.send(user);
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка сервера'}));
};


module.exports = {getUsers, getProfile};