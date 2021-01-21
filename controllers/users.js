const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getUsers = (req, res) => {
  User.find({})
    .then(users => res.send(users))
    .catch(err => {return res.status(500).send({message: 'Произошла ошибка сервера'})});
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
    .catch(err => {
      const ERROR_CODE = 400;
      if(err.name === 'CastError') return res.status(ERROR_CODE).send({message: 'Переданы некорректные данные'})
      return res.status(500).send({message: 'Произошла ошибка сервера'})
    });
};

const createUser = (req, res) =>{
  bcrypt.hash(req.body.password, 10)
  .then((hash) =>{
  return User.countDocuments()
    .then(count =>{
      return User.create({
        id: count,
        name: req.body.name,
        about: req.body.about,
        avatar: req.body.avatar,
        email: req.body.email,
        password: hash
      })
        .then(user =>{
          res.send(user)
        })
        .catch(err => {
          console.log(err)
          const ERROR_CODE = 400;
          if(err.name === 'ValidationError') return res.status(ERROR_CODE).send({message: 'Переданы некорректные данные'})
          else return res.status(500).send({ message: 'Произошла ошибка сервера'})
        });
    })
  })
}

const updateProfile = (req, res) =>{
  return User.findByIdAndUpdate(req.user._id, {name: req.body.name, about: req.body.about}, {new: true})
  .then(user =>{
    if(!user){
      return res.status(404).send({message: "Пользователь с таким id не найден"})
    } else{
      return res.send({data: user})
    }
  })
  .catch(err => {
    const ERROR_CODE = 400;
    if(err.name === 'ValidationError' || err.name === 'CastError') return res.status(ERROR_CODE).send({message: 'Переданы некорректные данные'})
    else return res.status(500).send({ message: 'Произошла ошибка сервера'})
  });
}

const updateAvatar = (req, res) =>{
  return User.findByIdAndUpdate(req.user._id, {avatar: req.body.avatar}, {new: true})
  .then(user =>{
    if(!user){
      return res.status(404).send({message: "Пользователь с таким id не найден"})
    } else{
      res.send({data: user})
    }
  })
  .catch(err => {
    const ERROR_CODE = 400;
    if(err.name === 'ValidationError' || err.name === 'CastError') return res.status(ERROR_CODE).send({message: 'Переданы некорректные данные'})
    else return res.status(500).send({ message: 'Произошла ошибка сервера'})
  });
}

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        '316c7c36e8ec989fa03ca0b25e0526db',
        {expiresIn: '7d'}
        );
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
}

module.exports = {getUsers, getProfile, createUser, updateProfile, updateAvatar, login};