const mongoose = require('mongoose'),
    Task = mongoose.model('Task'),
    codeResponses = require('../config').codeResponses;

const createTask = (req, res, next) => {
    let task = new Task({ ...req.body, idUser: req.user.idUser });
    task.save().then((task, error) => {
        if (error) return res.status(400).send({
            ...codeResponses[400],
            message: error
        });
        return res.status(201).send({
            ...codeResponses[201],
            detail: task
        });
    }).catch(next);
};

const getTasks = (req, res, next) => {
    Task.find({ idUser: req.user.idUser }).then((tasks, error) => {
        if (error) {
            return res.status(400).send({
                ...codeResponses[400],
                message: error
            });
        } else if (tasks.length === 0) {
            return res.status(404).send({
                ...codeResponses[404],
            });
        }
        return res.status(200).send({
            ...codeResponses[200],
            detail: tasks
        });
    }).catch(next);
}

const getTask = (req, res, next) => {
    Task.findOne({ idUser: req.user.idUser, _id: req.params.id }).then((task, error) => {
        if (error) {
            return res.status(400).send({
                ...codeResponses[400],
                message: error
            });
        }
        return res.status(200).send({
            ...codeResponses[200],
            detail: task
        });
    }).catch(next);
}

const updateTask = (req, res, next) => {
    Task.findOneAndUpdate({ _id: req.params.id, idUser: req.user.idUser }, { $set: req.body }, { new: true }).then((updatedTask, error) => {
        if (error) {
            return res.status(400).send({
                ...codeResponses[400],
                message: error
            });
        } else if (!updatedTask) {
            return res.status(404).send({
                ...codeResponses[404]
            });
        }
        return res.status(200).send({
            ...codeResponses[200],
            detail: updatedTask
        });
    }).catch(next);
}

const deleteTask = (req, res, next) => {
    Task.findOneAndDelete({ _id: req.params.id, idUser: req.user.idUser }).then((task, error) => { //Elimina sólo los cancelados
        if (error) {
            return res.status(400).send({
                ...codeResponses[400],
                message: error
            });
        } else if (!task) {
            return res.status(404).send({
                ...codeResponses[404]
            });
        }
        return res.status(200).send({
            ...codeResponses[200],
            detail: task
        });
    }).catch(next);
};

module.exports = {
    createTask,
    getTask,
    getTasks,
    updateTask,
    deleteTask
}