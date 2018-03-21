const db = require('../../config/db');
const fs = require('fs');
const photosPath = 'app/photos/';
const path = require('path');
const appDir = path.dirname(require.main.filename);


//where we put actual sql queries to the db

exports.listPhoto = function (values, done) {

    db.get_pool().query('SELECT * FROM auction WHERE auction_id=?', values.photo_id, function (err, result1) {

        if (result1 == "") {
            return done(404);
        }


        let result = (appDir + '/' + photosPath + values.photo_id + '.' + values.contentType);
        console.log(result);
        done(result);

    });
};




exports.postPhoto = function(values, done) {

//

    db.get_pool().query('SELECT * FROM auction WHERE auction_id=?', values.photo_id, function (err, result1) {

        if (result1 == "") {
            return done(404);
        }


        db.get_pool().query('SELECT user_token FROM auction_user WHERE user_id=(SELECT auction_userid FROM auction WHERE auction_id=?)',
            values.photo_id, function(err, result) {

                if (result == "") {
                    return done(401);
                }

                if (values.token != result[0].user_token) {
                    return done(401);
                }

                values.req.pipe(fs.createWriteStream(photosPath + values.photoName));
                done(201);



        });

    });

};





exports.remove = function(values, done) {


    db.get_pool().query('SELECT * FROM auction WHERE auction_id=?', values.photo_id, function (err, result1) {

        if (result1 == "") {
            return done(404);
        }



        db.get_pool().query('SELECT user_token FROM auction_user WHERE user_id=(SELECT auction_userid FROM auction WHERE auction_id=?)',
            values.photo_id, function(err, result) {

                let pathToDelete = (appDir + '/' + photosPath + values.photo_id + '.' + values.contentType);

                if (result == "") {
                    return done(401);
                }

                if (values.token != result[0].user_token) {
                    return done(401);
                }

                console.log(pathToDelete);
                fs.unlink(pathToDelete, (err) => {

                    if (err) {
                        return done(404);
                    } else {
                        return done(200);
                    }

                })

        });

    });

};









exports.insert = function(values, done) {

    db.get_pool().query("INSERT INTO photo (photo_id, photo_auctionid, photo_image_URI, photo_displayorder VALUES (?, ?, ?, ?))", values, function (err, result) {

        if (err) return done(err);
        done(result);
    });
};
