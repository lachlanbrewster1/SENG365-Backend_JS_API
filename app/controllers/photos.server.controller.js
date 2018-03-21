const Photo = require('../models/photos.server.model');
const fs = require('fs');


//these functions are called, which reference the functions within our model file



exports.list = function(req, res) {

    let photo_data = {
        "photo_id": req.params.id,
        "token": req.get('X-Authorization'),
        "contentType": req.headers['content-type'],
        "photoName":"string",
        "req": req
    };

    Photo.listPhoto(photo_data, function(result) {
        if (result == 404) res.sendStatus(404);
        else if (result == 400) res.sendStatus(400);
        else if (result == 401) res.sendStatus(401);
        else if (result == 500) res.sendStatus(500);
        else res.sendFile(result);
    });
};



exports.create = function (req, res) {
//201 ok, 400 bad request, 404 not found, 500 internal server error, 401 unauthorized
    let photo_data = {
        "photo_id": req.params.id,
        "token": req.get('X-Authorization'),
        "contentType": req.headers['content-type'],
        "photoName":"string",
        "req": req
    };
    let photo_id = photo_data.photo_id;


    if (photo_data.token == undefined) {
        res.sendStatus(401);
        return;
    }

    if (photo_id == undefined || photo_data.contentType == undefined) {
        res.sendStatus(400);
        return;
    }

    if (photo_data.contentType == "png" || photo_data.contentType == "jpg") {
        photo_data.photoName = photo_data.photo_id + "." + photo_data.contentType;
    } else {
        res.sendStatus(400);
        return;
    }


    Photo.postPhoto(photo_data, function(result) {
        if (result == 404) res.sendStatus(404);
        else if (result == 400) res.sendStatus(400);
        else if (result == 401) res.sendStatus(401);
        else if (result == 500) res.sendStatus(500);
        else res.sendStatus(201);
    });
};



exports.delete = function (req, res) {
    //201 ok, 404 not found, 500 internal server error

    let photo_data = {
        "photo_id": req.params.id,
        "token": req.get('X-Authorization'),
        "contentType": req.headers['content-type'],
        "photoName":"string",
        "req": req
    };


    if (photo_data.token == undefined) {
        res.sendStatus(401);
        return;
    }

    if (photo_data.photo_id == undefined || photo_data.contentType == undefined) {
        res.sendStatus(404);
        return;
    }

    if (photo_data.contentType == "png" || photo_data.contentType == "jpg") {
        photo_data.photoName = photo_data.photo_id + "." + photo_data.contentType;
    } else {
        res.sendStatus(404);
        return;
    }


    Photo.remove(photo_data, function(result) {
        if (result == 404) res.sendStatus(404);
        else if (result == 400) res.sendStatus(400);
        else if (result == 401) res.sendStatus(401);
        else if (result == 500) res.sendStatus(500);
        else res.sendStatus(201);
    });
};




