const database1 = require('../models/database.server.model');

exports.resampleDb = function(req, res) {
    database1.resampleDatabase(function(result) {
        res.json(result);
    })
};


exports.resetDb = function(req, res) {
    console.log(1);
    database1.resetDatabase(function(result) {
        res.json(result);
    })
};

