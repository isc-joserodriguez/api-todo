const router = require('express').Router(),
    auth = require('../middlewares/auth');

const {
    createTask,
    getTasks,
    updateTask,
    deleteTask
} = require('../controllers/Task.controller')

router.post('/', auth, createTask);
router.get('/', auth, getTasks);
router.put('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);

module.exports = router;