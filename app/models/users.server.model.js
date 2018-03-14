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



// once auctions alter has been sorted then copy into here
exports.alter = function(updateOptions, done){

    let values = [updateOptions.username, updateOptions.givenname, updateOptions.familyname, updateOptions.email, updateOptions.password, updateOptions.accountbalance, updateOptions.reputation, updateOptions.salt, updateOptions.token, updateOptions.id];

    db.get_pool().query('UPDATE auction_user SET user_username=?, user_givenname=?, user_familyname=?, user_email=?, user_password=?, user_accountbalance=? user_reputation=?, user_salt=?, user_token=?  WHERE user_id=?', values, function(err, result){

        //201 ok, 400 unauthorized
        if(err) return done({ERROR:"Malformed request"});
        done(result);
    })
};
//change
