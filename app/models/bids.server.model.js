const db = require('../../config/db');

//where we put actual sql queries to the db

exports.getAll = function(done) {
    db.get_pool().query('SELECT * FROM bid', function (err, rows) {

        if (err) return done({"Error" : "Error selecting"});

        return done(rows);
    });
};



exports.getBidsAuction = function(bid_auctionid, done) {

    db.get_pool().query('SELECT bid_amount as amount, bid_datetime as datetime, bid_userid as buyerId, user_username as buyerUsername FROM bid, auction_user WHERE bid_auctionid = ? and bid_userid = user_id', bid_auctionid, function (err, rows) {
        if (err) return done(err);
        done(rows);
    });
};




exports.insert = function(values, done) {

    db.get_pool().query("INSERT INTO bid (bid_userid, bid_auctionid, bid_amount, bid_datetime) VALUES (?, ?, ?, ?)", values, function (err, result) {

        //201 ok, 400 bad request, 404 not found, 500 internal server error
        if (err) return done(err);
        done(result);
    });
};




exports.alter = function() {
    return null;
};



exports.remove = function() {
    return null;
};

