const db = require('../../config/db');

//where we put actual sql queries to the db
var random = function() {
    return Math.random().toString(36).substr(1);
};

var generateToken = function() {
    return random();
};



var getIdFromToken = function(token) {

    db.get_pool().query('SELECT user_id FROM auction_user where user_token=?',token, function (err, rows) {
        console.log(rows);
        let user_id = rows[0].user_id;

        if (user_id == undefined || user_id == null || user_id == ""){
            return null;
        }
        return user_id;
    });

};


//NOT IN API SPEC
exports.getAll = function(done) {

db.get_pool().query('SELECT * FROM auction_user', function (err, rows) {
        if (err) return done({"Error" : "Error selecting"});
        return done(rows);
    });
};
//NOT IN API SPEC



exports.getOne = function(values, done) {
    //200 ok, 404 not found, 500 internal server error

    let query ='SELECT user_username as username, user_givenname as givenName, user_familyname as familyName';

    db.get_pool().query('Select * from auction_user where user_id=?', values.id, function (err, rows) {

        if (rows == "") {
            return done(404);
        }

        db.get_pool().query('SELECT user_token FROM auction_user WHERE user_id=?', [values.id], function(err3, result) {

            if (result[0].user_token != null) {
                let userTokenInDb = result[0].user_token;
                if (values.token == userTokenInDb && userTokenInDb != undefined) {               //NEED TO DO
                    query = query + ', user_email as email, user_accountbalance as accountBalance';
                }
            }

            db.get_pool().query(query + ' FROM auction_user WHERE user_id = ?', [values.id], function (err, rows) {

                if (rows == "") {
                    return done(404);
                } else if (err) {
                    return done(500);
                } else {
                    done(rows);
                }

            });
        });
    });
};


exports.insert = function(values, done) {

    db.get_pool().query("INSERT INTO auction_user (user_username, user_givenName, user_familyName, user_email, user_password) VALUES (?, ?, ?, ?, ?)", values, function (err, result) {

        //201 ok, 400 malformed request
        if (err) {
            return done(400);
        } else {
            return done(result);
        }
    });
};


exports.alter = function(updateOptions, done){                      //WHAT IF NO VALUES ARE CHANGED, HANDLING PASSWORD?

    let query = 'UPDATE auction_user SET';
    let qValues = [];


    if (updateOptions.username != undefined) {
        query = query + ' user_username=?,';
        qValues.push(updateOptions.username);
    }
    if (updateOptions.givenname != undefined) {
        query = query + ' user_givenname=?,';
        qValues.push(updateOptions.givenname);
    }
    if (updateOptions.familyname != undefined) {
        query = query + ' user_familyname=?,';
        qValues.push(updateOptions.familyname);
    }
    if (updateOptions.email != undefined) {
        query = query + ' user_email=?,';
        qValues.push(updateOptions.email);
    }
    if (updateOptions.password != undefined) {
        query = query + ' user_auction_reserveprice=?,';
        qValues.push(updateOptions.password);
    }
    if (updateOptions.accountBalance != undefined) {
        query = query + ' user_accountBalance=?,';
        qValues.push(updateOptions.accountBalance);
    }
    if (updateOptions.reputation != undefined) {
        query = query + ' user_reputation=?,';
        qValues.push(updateOptions.reputation);
    }
    if (updateOptions.salt != undefined) {
        query = query + ' user_salt=?,';
        qValues.push(updateOptions.salt);
    }


    query = query.substring(0, query.length-1) + ' WHERE user_id=?';
    qValues.push(updateOptions.id);

    if (qValues.length == 1) {
        return done(400);
    }

    db.get_pool().query('SELECT * from auction_user where user_id=?', [updateOptions.id], function(err2, result) {
        if (result == "") {
            return done(404);
        }

        db.get_pool().query('SELECT user_token FROM auction_user WHERE user_id=?', [updateOptions.id], function(err3, result) {
            if (result == "") {
                return done(401);
            }
            if (result[0].user_token == null) {
                return done(401);
            } else {
                let userTokenInDb = result[0].user_token;
                if (updateOptions.token != userTokenInDb && userTokenInDb != undefined) {               //NEED TO DO
                    return done(401);
                }
            }


            db.get_pool().query(query, qValues, function(err4, result){

                //201 ok, 401 unauthorized, 500 server error
                if(err4) {
                    return done(500);
                }
                else {
                    return done(result);
                }

            });

        });

    });
};


exports.loginUsername = function(login_data, done) {


    db.get_pool().query('SELECT * FROM auction_user WHERE user_username =? and user_password=?', [login_data.username, login_data.password], function (err, rows) {

        if (err) {
            return done(400);
        }
        if (rows == "") {
            return done(400);
        }

        let user_id = rows[0].user_id;

        let token = generateToken();

        db.get_pool().query('UPDATE auction_user SET user_token=? WHERE user_username=?', [token, login_data.username], function (err, rows1) {

            if (err) {
                return done(400)
            }

            return done([token, user_id])

        })

    });

};


exports.loginEmail = function(login_data, done) {

    db.get_pool().query('SELECT * FROM auction_user WHERE user_email=? and user_password=?', [login_data.email, login_data.password], function (err, rows) {

        if (err) {
            return done(400);
        }
        if (rows == "") {
            return done(401);
        }

        let user_id = rows[0].user_id;
        let token = generateToken();

        db.get_pool().query('UPDATE auction_user SET user_token=? WHERE user_email=?', [token, login_data.email], function (err, rows1) {

            if (err) {
                return done(400)
            }

            return done([token, user_id])


        });
    });

};


exports.logout = function (tokenLogout, done) {

    db.get_pool().query('UPDATE auction_user SET user_token = NULL WHERE user_token=?', tokenLogout, function (err, rows) {

        if (err) {
            return done(500);
        } else if (rows.affectedRows == 0) {
            return done(401);
        } else {
            return done(rows)
        }

    });

};




