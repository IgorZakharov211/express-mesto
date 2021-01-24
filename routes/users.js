const router = require('express').Router();
const {getUsers, getProfile, updateProfile, updateAvatar, getUser} = require('../controllers/users');
const { celebrate, Joi } = require('celebrate');

router.get('/users', getUsers);
router.get('/users/me', getUser);
router.get('/users/:_id', getProfile);
router.patch('/users/me', celebrate ({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30)
  })
}), updateProfile);
router.patch('/users/me/avatar', celebrate ({
  body: Joi.object().keys({
    avatar: Joi.string().uri()
  })
}), updateAvatar);

module.exports = router;