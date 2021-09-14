const jwt = require('express-jwt');
const secret = require('../config').secret;

function getTokenFromHeader(req) {
    let token=req.headers.authorization;
    if(token){
        let type=token.split(' ')[0];
        if(type==='Token' || type=== 'Bearer')return token.split(' ')[1];
    }
    return null;
}

const auth = {
    requerido: jwt({
        secret: secret,
        algorithms: ['HS256'],
        userProperty: 'usuario',
        getToken: getTokenFromHeader
    })
};

module.exports = auth;
