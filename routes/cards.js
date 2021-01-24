const router = require('express').Router();
const {getCards, createCard, deleteCard, likeCard, dislikeCard} = require('../controllers/cards');
const { celebrate, Joi } = require('celebrate');

router.get('/cards', getCards);
router.post('/cards', celebrate ({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri()
  })
}), createCard);
router.delete('/cards/:_id', deleteCard);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;