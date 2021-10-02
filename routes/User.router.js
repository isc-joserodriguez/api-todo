const router = require('express').Router();

const {
    login,
    signup,
    getUsers
} = require('../controllers/User.controller');

router.post('/login', login);
router.post('/signup', signup);
router.get('/', getUsers);

module.exports = router;