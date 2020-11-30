const router = require('express').Router();
const getNotFound = require('../controllers/notFound');

router.get('/*', getNotFound);

module.exports = router;