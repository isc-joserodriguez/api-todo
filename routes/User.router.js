const router = require('express').Router(),
    auth = require('../middlewares/auth');

const {
    login,
    signup
} = require('../controllers/User.controller');

router.post('/login', login);
router.post('/signup', auth.requerido, signup);

module.exports = router;