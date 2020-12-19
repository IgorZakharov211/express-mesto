const Card = require('../models/card');

const checkErr= (res, err) => {
  const ERROR_CODE = 400;
  if(err.name === 'ErrorName') return res.status(ERROR_CODE).send({message: 'Переданы некорректные данные'})
  else return res.status(500).send({ message: 'Произошла ошибка сервера'})
}

const getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send(cards))
    .catch(err => checkErr(res, err));
};

const createCard = (req, res) =>{
 return Card.countDocuments()
    .then(count =>{
      return Card.create({id: count,  owner: req.user._id, ...req.body})
        .then(card =>{
          res.status(200).send(card)
        })
        .catch(err => checkErr(res, err));
    })
}

const deleteCard = (req, res) => {
  return Card.findByIdAndRemove(req.params._id)
  .then(card => res.send({ data: card }))
  .catch(err => checkErr(res, err));
}

const likeCard = (req, res) => {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
  .then(card => res.send({data: card}))
  .catch(err => checkErr(res, err));
}

const dislikeCard = (req, res) => {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
  .then(card => res.send({data: card}))
  .catch(err => checkErr(res, err));
}


module.exports = {getCards, createCard, deleteCard, likeCard, dislikeCard};