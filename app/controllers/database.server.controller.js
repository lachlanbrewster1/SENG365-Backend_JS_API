const database = require('../models/database.server.model');

exports.resample = function(req, res) {
    database.resample(function(result) {
        res.json(result);
    })
};


exports.reset = function(req, res) {
    database.reset(function(result) {
        res.json(result);
    })
};

