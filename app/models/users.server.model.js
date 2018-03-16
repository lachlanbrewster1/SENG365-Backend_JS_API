const db = require('../../config/db');

//where we put actual sql queries to the db


//NOT IN API SPEC
exports.getAll = function(done) {
    db.get_pool().query('SELECT * FROM auction_user', function (err, rows) {

        if (err) return done({"Error" : "Error selecting"});

        return done(rows);
    });
};
//NOT IN API SPEC



exports.getOne = function(id, done) {
    console.log(id);

    db.get_pool().query('SELECT user_username as username, user_givenname as givenName, user_familyname as familyName, user_email as email, user_accountbalance as accountBalance FROM auction_user WHERE user_id = ?', id, function (err, rows) {

        //200 ok, 404 not found
        if (err) return done(err);
        done(rows);
    });
};




exports.insert = function(values, done) {

    db.get_pool().query("INSERT INTO auction_user (user_username, user_givenName, user_familyName, user_email, user_password) VALUES (?, ?, ?, ?, ?)", values, function (err, result) {

        //201 ok, 400 malformed request
        if (err) return done(err);
        done(result);
    });
};



exports.alter = function(updateOptions, done){                      //WHAT IF NO VALUES ARE CHANGED, HANDLING PASSWORD?

    let query = 'UPDATE auction_user SET';
    let qValues = [];

    if (updateOptions.id != undefined) {
        query = query + ' user_id=?,';
        qValues.push(updateOptions.id);
    }
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
    if (updateOptions.token != undefined) {
        query = query + ' user_token=?,';
        qValues.push(updateOptions.token);
    }



    query = query.substring(0, query.length-1) + ' WHERE user_id=?';
    qValues.push(updateOptions.id);

    console.log(query);
    console.log(qValues);

    db.get_pool().query(query, qValues, function(err, result){

        //201 ok, 401 unauthorized
        //if(err) return done({ERROR:"Malformed request"});
        if(err) return done(err);
        done(result);
    });

};

