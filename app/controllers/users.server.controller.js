const User = require('../models/users.server.model');

//these functions are called, which reference the functions within our model file

//NOT IN API SPEC
exports.list = function(req, res) {
    console.log("List");
    User.getAll(function(result) {
        res.json(result);
    });
};
//NOT IN API SPEC


exports.create = function (req, res) {

    let user_data = {
        "username": req.body.username,
        "givenName": req.body.givenName,
        "familyName": req.body.familyName,
        "email": req.body.email,
        "password": req.body.password
    };

    let values = [user_data.username, user_data.givenName, user_data.familyName, user_data.email, user_data.password];

    User.insert(values, function(result) {
        res.json(result);
    });
};



exports.read = function (req, res) {
    let id = req.params.id;
    console.log("Read");
    User.getOne(id, function(result) {
        res.json(result);
    });
};


exports.update = function(req, res){
    let updateOptions = {
        "id" : req.params.id,
        "username": req.body.username,
        "givenname": req.body.givenName,
        "familyname": req.body.familyName,
        "email": req.body.email,
        "password": req.body.password,
        "accountBalance": req.body.accountBalance,
        "reputation": req.body.reputation,
        "salt": req.body.salt,
        "token": req.body.token
    };


    User.alter(updateOptions, function(result){
        res.json(result);

    })
};


exports.login = function(req, res) {

    return null;
};


exports.logout = function(req, res) {

    return null;
};





