const mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport'),
    codeResponses = require('../config').codeResponses;

const signup = (req, res, next) => {
    let newUser = req.body;
    let { password } = req.body;

    delete newUser.password
    const user = new User(newUser)
    user.hashPassword(password)

    user.save().then(user => {
        return res.status(201).send({
            ...codeResponses[201],
            detail: user.toAuthJSON()
        })
    }).catch(next);
};

const login = (req, res, next) => {
    passport.authenticate('local', { session: false }, function (err, user, info) {
        if (err) return next(err);

        if (!user) return res.status(400).send(
            {
                ...codeResponses[400],
                message: info.errors
            }
        );
        return res.status(200).send(
            {
                ...codeResponses[200],
                detail: { ...user._doc, token: user.generarJWT() }
            }
        );
    })(req, res, next);
};

const getUsers = (req, res, next) => {
    User.find().then((users, error) => {
        if (error) {
            return res.status(400).send({
                ...codeResponses[400],
                message: error
            });
        } else if (users.length === 0) {
            return res.status(404).send({
                ...codeResponses[404],
            });
        }
        return res.status(200).send({
            ...codeResponses[200],
            detail: users
        });
    }).catch(next);
}

const getUser = (req, res, next) => {
    User.find({ idUser: req.user.idUser }).then((user, error) => {
        if (error) {
            return res.status(400).send({
                ...codeResponses[400],
                message: error
            });
        } else if (user.length === 0) {
            return res.status(404).send({
                ...codeResponses[404],
            });
        }
        return res.status(200).send({
            ...codeResponses[200],
            detail: user[0]
        });
    }).catch(next);
}

module.exports = {
    signup,
    login,
    getUsers,
    getUser
};