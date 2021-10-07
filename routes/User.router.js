const router = require('express').Router(),
    auth = require('../middlewares/auth');

const {
    login,
    signup,
    getUsers,
    getUser
} = require('../controllers/User.controller');

router.post('/login', login);
router.post('/signup', signup);
router.get('/getAll', getUsers);
router.get('/', auth, getUser);

module.exports = router;