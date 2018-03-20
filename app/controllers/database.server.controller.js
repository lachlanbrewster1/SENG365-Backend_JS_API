const database = require('../models/database.server.model');

exports.resample = function(req, res) {
    database.resampleDatabase(function(result) {
        res.json(result);
    })
};


exports.reset = function(req, res) {
    database.resetDatabase(function(result) {
        res.json(result);
    })
};

