const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');

const getCards = (req, res, next) => {
  Card.find({})
    .then(cards => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) =>{
 return Card.countDocuments()
    .then(count =>{
      return Card.create({id: count,  owner: req.user._id, ...req.body})
        .then(card =>{
          res.send(card)
        })
        .catch(next);
    })
}

const deleteCard = (req, res, next) => {
  return Card.findByIdAndRemove(req.params._id)
  .then(card => {
    if(!card){
      throw new NotFoundError('Карточка с таким id не найдена');
    }
    return res.send(card)
  })
  .catch(next);
}

const likeCard = (req, res, next) => {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
  .then(card => {
    if(!card){
      throw new NotFoundError('Карточка с таким id не найдена');
    }
    return res.send({data: card})
  })
  .catch(next);
}

const dislikeCard = (req, res, next) => {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
  .then(card => {
    if(!card){
      throw new NotFoundError('Карточка с таким id не найдена');
    }
    return res.send({data: card})
  })
  .catch(next);
}


module.exports = {getCards, createCard, deleteCard, likeCard, dislikeCard};