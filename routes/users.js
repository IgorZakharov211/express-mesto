const router = require('express').Router();
const {getUsers, getProfile} = require('../controllers/users');
router.get('/users', getUsers);

router.get('/users/:_id', getProfile);

module.exports = router;