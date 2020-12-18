const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then(users => res.send(users))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка сервера'}));
};

const getProfile = (req, res) => {
  const _id = req.params;
  User.findOne({_id})
    .then((user) => {
      if(!user){
        return res.status(404).send({message: 'Нет пользователя с таким id'})
      }
      return res.send(user);
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка сервера'}));
};

const createUser = (req, res) =>{
  return User.countDocuments()
    .then(count =>{
      return User.create({id: count, ...req.body})
        .then(user =>{
          res.status(200).send(user)
        })
        .catch(err => res.status(400).send({err}))
    })
}


module.exports = {getUsers, getProfile, createUser};