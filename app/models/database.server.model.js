const db = require('../../config/db');
const fs = require('fs');

var reset = fs.readFileSync('./reset.ql', 'utf-8');
var resample = fs.readFileSync('./resample.ql', 'utf-8');




exports.resampleDatabase = function(done) {

    db.get_pool().query( resample, function (err, rows) {

        if (err) return done({'ERROR': 'Error populating tables'});
        return done(rows);
    });
};



exports.resetDatabase = function(done) {

    db.get_pool().query( reset, function (err, rows) {

        //if (err) return done({'ERROR': 'Error creating tables'});
        if (err) return done(err);

        return done(rows);

    });
};




