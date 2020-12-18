const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка сервера'}));
};

const createCard = (req, res) =>{
 return Card.countDocuments()
    .then(count =>{
      return Card.create({id: count,  owner: req.user._id, ...req.body})
        .then(card =>{
          res.status(200).send(card)
        })
        .catch(err => res.status(400).send({err}))
    })
}

const deleteCard = (req, res) => {
  return Card.findByIdAndRemove(req.params._id)
  .then(card => res.send({ data: card }))
  .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}


module.exports = {getCards, createCard, deleteCard};