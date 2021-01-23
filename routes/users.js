const router = require('express').Router();
const {getUsers, getProfile, updateProfile, updateAvatar} = require('../controllers/users');

router.get('/users/me', getUsers);
router.get('/users/:_id', getProfile);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;