const User = require('../models/users.server.model');

//these functions are called, which reference the functions within our model file




//NOT IN API SPEC
exports.list = function(req, res) {
    User.getAll(function(result) {
        res.json(result);
    });
};
//NOT IN API SPEC


exports.create = function (req, res) {
    //201 ok, 400 malformed request, 500 internal server error

    let user_data = {
        "username": req.body.username,
        "givenName": req.body.givenName,
        "familyName": req.body.familyName,
        "email": req.body.email,
        "password": req.body.password
    };

    let values = [user_data.username, user_data.givenName, user_data.familyName, user_data.email, user_data.password];


    if (user_data.username == undefined || user_data.givenName == undefined || user_data.familyName == undefined || user_data.email == undefined || user_data.password == undefined){
        res.sendStatus(400);
        return;
    }

    User.insert(values, function(result) {
        if (result == 404) res.sendStatus(404);
        else if (result == 400) res.sendStatus(400);
        else if (result == 401) res.sendStatus(401);
        else if (result == 500) res.sendStatus(500);
        else {
            dataReturn = {
                "id": 0
            };
            dataReturn.id = result["insertId"];
            res.status(201).json(dataReturn);
        }
    });
};



exports.read = function (req, res) {
    //200 ok, 404 not found, 500 internal server error

    let values = {
        "id": req.params.id,
        "token": req.get('X-Authorization')
    };

    User.getOne(values, function(result) {
        if (result == 404) res.sendStatus(404);
        else if (result == 400) res.sendStatus(400);
        else if (result == 401) res.sendStatus(401);
        else if (result == 500) res.sendStatus(500);
        else res.json(result);
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
        "token": req.get('X-Authorization')
    };

    if (updateOptions.id == undefined) {
        res.sendStatus(400);
        return;
    }

    if (updateOptions.token == undefined) {
        res.sendStatus(401);
        return;
    }


    User.alter(updateOptions, function(result){
        if (result == 404) res.sendStatus(404);
        else if (result == 400) res.sendStatus(400);
        else if (result == 401) res.sendStatus(401);
        else if (result == 500) res.sendStatus(500);
        else res.sendStatus(201);
    })
};


exports.login = function(req, res) {

    //user will login with username or email and password,
    //check if they are correct
    //return an id with a unique token, random string of chars
    //update db table to say they have logged in, so token is in db table
    //return db token to the user with id in response body
    //everything that requires user to be logged in comes with that token in the body

    let login_data = {
        "username": req.query.username,
        "email": req.query.email,
        "password": req.query.password
    };



    if (login_data.password == undefined || ((login_data.username == undefined && login_data.email == undefined))) {
        res.sendStatus(400);
        return;
    }

    if (login_data.username == undefined) {
        User.loginEmail(login_data, function(result) {

            if (result == 404) res.sendStatus(404);
            else if (result == 400) res.sendStatus(400);
            else if (result == 500) res.sendStatus(500);
            else {
                let dataReturn = {
                    "id":0,
                    "token": ""
                };
                dataReturn.id = result[1];
                dataReturn.token = result[0];
                res.json(dataReturn);
            }

        });
    } else {
        User.loginUsername(login_data, function(result) {

            if (result == 404) res.sendStatus(404);
            else if (result == 400) res.sendStatus(400);
            else if (result == 500) res.sendStatus(500);
            else {
                let dataReturn = {
                    "id":0,
                    "token": ""
                };
                dataReturn.id = result[1];
                dataReturn.token = result[0];
                res.json(dataReturn);
            }

        });
    }

};


exports.logout = function(req, res) {

    let tokenLogout = req.get('X-Authorization')


    if (tokenLogout == undefined) {
        return res.sendStatus(401)
    }

    User.logout(tokenLogout, function (result) {

        if (result == 401) res.sendStatus(401);
        else if (result == 500) res.sendStatus(500);
        else res.sendStatus(200);

    });


    return null;
};





