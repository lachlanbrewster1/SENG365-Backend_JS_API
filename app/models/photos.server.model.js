const db = require('../../config/db');

//where we put actual sql queries to the db

exports.getAll = function(done) {
    db.get_pool().query('SELECT * FROM photo', function (err, rows) {

        if (err) return done({"Error" : "Error selecting"});

        return done(rows);
    });
};



exports.getOne = function(photoId, done) {

    db.get_pool().query('SELECT * FROM photo WHERE photo_id = ?', photoId, function (err, rows) {
        if (err) return done(err);
        done(rows);
    });
};




exports.insert = function(valuesReceived, done) {
    let values = [valuesReceived];

    db.get_pool().query("INSERT INTO photo (photo_id, photo_auctionid, photo_image_URI, photo_displayorder VALUES ?)", values, function (err, result) {

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

