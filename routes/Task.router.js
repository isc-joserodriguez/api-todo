const router = require('express').Router(),
    auth = require('../middlewares/auth');

const {
    createTask,
    getTasks,
    updateTask,
    deleteTask
} = require('../controllers/Task.controller')

/* router.post('/task', auth.requerido, createTask); */
router.get('/', auth.requerido, getTasks);
router.put('/', auth.requerido, updateTask);
router.delete('/', auth.requerido, deleteTask);

module.exports = router;