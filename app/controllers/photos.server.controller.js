const Photo = require('../models/photos.server.model');
const fs = require('fs');


//these functions are called, which reference the functions within our model file


exports.list = function(req, res) {
    Photo.getAll(function(result) {
        if (result == 404) res.sendStatus(404);
        else if (result == 400) res.sendStatus(400);
        else if (result == 401) res.sendStatus(401);
        else if (result == 500) res.sendStatus(500);
        else res.json(result);
    });
};



exports.create = function (req, res) {
//201 ok, 400 bad request, 404 not found, 500 internal server error, 401 unauthorized

    let photo_data = {
        "photo_id": req.params.id,
        "token": req.body['x-authorization']
    };

    let photo_id = photo_data.photo_id;
    //let photo = req.body.default.png;
    console.log(req.body);

    if (photo_id == null || photo_id == undefined ) {
        res.status(400).send("Bad request");
    }


    /*Photo.insert(values, function(result) {
        if (result == 404) res.sendStatus(404);
        else if (result == 400) res.sendStatus(400);
        else if (result == 401) res.sendStatus(401);
        else if (result == 500) res.sendStatus(500);
        else res.json(result);
    });*/
};



exports.read = function (req, res) {
    //200 ok and raw picture file, 400 bad request, 404 not found, 500 internal server error

    let id = req.params.photoId;
    let token = req.body['x-authorization'];


    Photo.getOne(id, function(result) {
        if (result == 404) res.sendStatus(404);
        else if (result == 400) res.sendStatus(400);
        else if (result == 401) res.sendStatus(401);
        else if (result == 500) res.sendStatus(500);
        else res.json(result);
    });
};






exports.delete = function (req, res) {
    //201 ok, 404 not found, 500 internal server error
    return null;
};




