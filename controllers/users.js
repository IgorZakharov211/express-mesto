const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/not-found-err');
const AuthError = require('../errors/auth-error');

const getUsers = (req, res, next) => {
  User.find({})
    .then(users => res.send(users))
    .catch(next);
};

const getUser = (req, res, next) => {
  const _id = req.user._id;
  User.findOne({_id})
    .then((user) => {
      if(!user){
        throw new NotFoundError('Нет пользователя с таким id');
      }
      return res.send(user);
    })
    .catch(next);
}

const getProfile = (req, res, next) => {
  const _id = req.params;
  User.findOne({_id})
    .then((user) => {
      if(!user){
        throw new NotFoundError('Нет пользователя с таким id');
      }
      return res.send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) =>{
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
        .catch(next);
    })
  })
}

const updateProfile = (req, res, next) =>{
  return User.findByIdAndUpdate(req.user._id, {name: req.body.name, about: req.body.about}, {new: true})
  .then(user =>{
    if(!user){
      throw new NotFoundError('Нет пользователя с таким id');
    } else{
      return res.send({data: user})
    }
  })
  .catch(next);
}

const updateAvatar = (req, res, next) =>{
  return User.findByIdAndUpdate(req.user._id, {avatar: req.body.avatar}, {new: true})
  .then(user =>{
    if(!user){
      throw new NotFoundError('Нет пользователя с таким id');
    } else{
      res.send({data: user})
    }
  })
  .catch(next);
}

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if(!user){
        throw new AuthError('Возникли проблемы с авторизацией');
      }
      const token = jwt.sign(
        { _id: user._id },
        '316c7c36e8ec989fa03ca0b25e0526db',
        {expiresIn: '7d'}
        );
      res.send({ token });
    })
    .catch(next);
}

module.exports = {getUsers, getProfile, createUser, updateProfile, updateAvatar, login, getUser};