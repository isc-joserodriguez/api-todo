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

module.exports = {
    signup,
    login
};