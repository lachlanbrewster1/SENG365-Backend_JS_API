const db = require('../../config/db');

//where we put actual sql queries to the db

exports.getAll = function(done) {
    db.get_pool().query('SELECT * FROM lab2_users', function (err, rows) {

        if (err) return done({"Error" : "Error selecting"});

        return done(rows);
    });
};



exports.getOne = function(userId, done) {

    db.get_pool().query('SELECT * FROM lab2_users WHERE user_id = ?', userId, function (err, rows) {
        if (err) return done(err);
        done(rows);
    });
};




exports.insert = function(username, done) {
    let values = [username];

    db.get_pool().query("INSERT INTO lab2_users (username VALUES ?)", values, function (err, result) {

        if (err) return done(err);

        done(result);
    });
};




exports.alter = function() {
    return null;
};



exports.remove = function() {
    return null;
};

