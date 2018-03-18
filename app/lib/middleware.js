const users = require('../models/users.server.model');
//log = require('./logger')(),  config = require('../../config/config.js'),

const isAuthenticated = (req, res, next) => {

    /*
    let token = req.get(config.get('authToken'));
    //log.debug('authenticating ${token}');
    users.getIdFromToken(token, (err, id) => {
        if (err || id === null) {
            //log.warn('rejected auth attempt for token ${token}');
            return res.sendStatus(401);
        }
        next();

    })*/
    return true;
};

module.exports = {
    isAuthenticated: isAuthenticated
};