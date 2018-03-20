const db = require('../../config/db');

//where we put actual sql queries to the db

var getIdFromToken = function(token) {

    db.get_pool().query('SELECT user_id FROM auction_user where user_token=?',token, function (err, rows) {
        let user_id = rows[0].user_token;

        if (user_id == undefined || user_id == null || user_id == ""){
            return null;
        }
        return user_id;
    });

};



exports.getAll = function(done) {
    db.get_pool().query('SELECT * FROM bid', function (err, rows) {

        if (err) return done({"Error" : "Error selecting"});

        return done(rows);
    });
};



exports.getBidsAuction = function(bid_auctionid, done) {
    //200 ok, 400 bad request, 404 not found, 500 server error

    db.get_pool().query('SELECT bid_amount as amount, bid_datetime as datetime, bid_userid as buyerId, user_username as buyerUsername FROM bid, ' +
        'auction_user WHERE bid_auctionid = ? and bid_userid = user_id', bid_auctionid, function (err, rows) {

        if (err) {
            return done(400);
        } else if (rows == "") {
            return done(404);
        } else {
            return done(rows);
        }
    });
};




exports.insert = function(values, done) {
    //201 ok, 400 bad request, 401 unauthorized, 404 not found, 500 internal server error


    //MAYBE A CHECK TO SEE IF THE USER EXISTS, WOULD THIS BE A 404?

    db.get_pool().query("SELECT * FROM auction WHERE auction_id=?", values[0], function (err2, result) {
        if (err2) {
            return done(404);
        }
        //MAYBE 400?

        if (result == "") {
            return done(404);
        }


        db.get_pool().query('SELECT user_id FROM auction_user where user_token=?',values[3], function (err, rows) {

            if (rows == "") {
                return done(401);
            }
            let user_id = rows[0].user_id;
            if (user_id == undefined || user_id == null || user_id == ""){
                return done(401);
            }

            values.pop();
            values.push(user_id);

            db.get_pool().query("INSERT INTO bid (bid_auctionid, bid_amount, bid_datetime, bid_userid) VALUES (?, ?, ?, ?)", values, function (err, result) {

                if (err) {
                    //console.log(err);
                    return done(400);
                }
                else {
                    return done(result);
                }

            });

        });

    });

};


