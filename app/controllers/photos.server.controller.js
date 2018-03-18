const Photo = require('../models/photos.server.model');

//these functions are called, which reference the functions within our model file


exports.list = function(req, res) {
    Photo.getAll(function(result) {
        res.json(result);
    });
};



exports.create = function (req, res) {
//201 ok, 400 bad request, 404 not found, 500 internal server error

    let photo_data = {
        "photo_id": req.body.photo_id,
        "photo_auctionid": req.body.photo_auctionid,
        "photo_image_URI": req.body.photo_image_URI,
        "photo_displayorder": req.body.photo_displayorder

    };

    let values = [photo_data.photo_id, photo_data.photo_auctionid, photo_data.photo_image_URI, photo_data.photo_displayorder];

    if (photo_data.photo_id == null || photo_data.photo_auctionid == null || photo_data.photo_image_URI == null || photo_data.photo_displayorder == null ) {
        res.status(400).send("Bad request");
    }


    Photo.insert(values, function(result) {
        res.json(result);
    });
};



exports.read = function (req, res) {
    //200 ok and raw picture file, 400 bad request, 404 not found, 500 internal server error

    let id = req.params.photoId;
    Photo.getOne(id, function(result) {
        res.json(result);
    });
};






exports.delete = function (req, res) {
    //201 ok, 404 not found, 500 internal server error
    return null;
};




