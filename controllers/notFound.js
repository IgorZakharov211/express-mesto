const getNotFound = (req, res) => {
  return res.status(404).send({message: 'Запрашиваемый ресурс не найден'});
};

module.exports = getNotFound;