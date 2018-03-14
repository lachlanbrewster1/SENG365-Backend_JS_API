const Photo = require('../models/photos.server.model');

//these functions are called, which reference the functions within our model file


exports.list = function(req, res) {
    Photo.getAll(function(result) {
        res.json(result);
    });
};



exports.create = function (req, res) {

    let user_data = {
        "photo_id": req.body.photo_id,
        "photo_auctionid": req.body.photo_auctionid,
        "photo_image_URI": req.body.photo_image_URI,
        "photo_displayorder": req.body.photo_displayorder

    };

    let photo_id = user_data['photo_id'].toString();
    let photo_auctionid = user_data['photo_auctionid'].toString();
    let photo_image_URI = user_data['photo_image_URI'].toString();
    let photo_displayorder = user_data['photo_displayorder'].toString();


    let values = [
        [photo_id], [photo_auctionid], [photo_image_URI], [photo_displayorder]
    ];

    Photo.insert(values, function(result) {
        res.json(result);
    });
};



exports.read = function (req, res) {
    let id = req.params.photoId;
    Photo.getOne(id, function(result) {
        res.json(result);
    });
};



exports.update = function (req, res) {
    return null;
};



exports.delete = function (req, res) {
    return null;
};



exports.photoById = function (req, res) {
    return null;
};

