const path = require('path');
const getDataFromFile = require('../helpers/files');

const dataPath = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = (req, res) => {
  return getDataFromFile(dataPath)
    .then(cards => res.status(200).send(cards))
    .catch(err => res.status(500).send(err));
};

module.exports = getCards;