const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-error');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, '316c7c36e8ec989fa03ca0b25e0526db');
  } catch (e) {
    throw new AuthError('Необходима авторизация');
  }

  req.user = payload;

  next();
};