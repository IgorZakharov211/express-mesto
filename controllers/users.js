const User = require('../models/user');

const checkErr= (res, err) => {
  const ERROR_CODE = 400;
  if(err.name === 'ErrorName') return res.status(ERROR_CODE).send({message: 'Переданы некорректные данные'})
  else return res.status(500).send({ message: 'Произошла ошибка сервера'})
}

const getUsers = (req, res) => {
  User.find({})
    .then(users => res.send(users))
    .catch(err => checkErr(res, err));
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
    .catch(err => checkErr(res, err));
};

const createUser = (req, res) =>{
  return User.countDocuments()
    .then(count =>{
      return User.create({id: count, ...req.body})
        .then(user =>{
          res.status(200).send(user)
        })
        .catch(err => checkErr(res, err));
    })
}

const updateProfile = (req, res) =>{
  return User.findByIdAndUpdate(req.user._id, {name: req.body.name, about: req.body.about})
  .then(user => res.send({ data: user }))
  .catch(err => checkErr(res, err));
}

const updateAvatar = (req, res) =>{
  return User.findByIdAndUpdate(req.user._id, {avatar: req.body.avatar})
  .then(user => res.send({ data: user }))
  .catch(err => checkErr(res, err));
}


module.exports = {getUsers, getProfile, createUser, updateProfile, updateAvatar};