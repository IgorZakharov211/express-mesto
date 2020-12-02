const path = require('path');
const getDataFromFile = require('../helpers/files');

const dataPath = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = (req, res) => {
  return getDataFromFile(dataPath)
    .then(cards => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка сервера'}));
};

module.exports = getCards;