const router = require('express').Router(),
    auth = require('../middlewares/auth');

const {
    login,
    signup,
    getUsers,
    getUser,
    updateUser
} = require('../controllers/User.controller');

router.post('/login', login);
router.post('/signup', signup);
router.get('/getAll', getUsers);
router.get('/', auth, getUser);
router.put('/', auth, updateUser);
router.delete('/', auth, updateUser);

module.exports = router;