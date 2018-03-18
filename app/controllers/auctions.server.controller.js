const Auction = require('../models/auctions.server.model');
const Bid = require('../models/bids.server.model');


//these functions are called, which reference the functions within our model file


exports.list = function(req, res) {
    //200 ok, 400 bad request, 500 internal server area (fallback)


    let auction_search = {
        "startIndex": req.params.startIndex,
        "count": req.params.count,
        "q": req.params.q,
        "categoryId": req.params.categoryId,
        "seller": req.params.seller,
        "bidder": req.params.bidder,
        "winner": req.params.winner
    };


    let values = [auction_search.startIndex, auction_search.count, auction_search.q,
        auction_search.categoryId, auction_search.seller, auction_search.bidder, auction_search.winner];

    Auction.getAll(function(values, result) {
        res.json(result);
    });
};


exports.create = function (req, res) {
    //201 ok, 400 bad request, 401 unauthorized, 500 internal server error

    let auction_data = {
        "categoryId": req.body.categoryId,
        "title": req.body.title,
        "description": req.body.description,
        "startingdate": req.body.startDateTime,
        "endingdate": req.body.endDateTime,
        "reserveprice": req.body.reservePrice,
        "startingprice": req.body.startingBid,
        "userid": req.body.userid
    };

    let values = [auction_data.categoryId, auction_data.title, auction_data.description, auction_data.startingdate,
        auction_data.endingdate, auction_data.reserveprice, auction_data.startingprice, auction_data.userid];

    if (values.userid != loggedInUserId) {
        res.status(401).send("Unauthorized");
    }
    if (values.categoryId == null || values.title == null || values.description == null || values.startingdate == null || values.endingdate == null || values.reserveprice == null || values.startingprice == null || values.userid) {
        res.status(400).send("Bad request");
    }



    Auction.insert(values, function(result) {
        res.json(result);
    });
};


exports.createBid = function (req, res) {

    let auction_data = {
        "bid_userid": req.body.userid,
        "bid_auctionid": req.body.auctionid,
        "bid_amount": req.body.amount,
        "bid_datetime": Date.now()                       //need to convert to sql time
    };

    let values = [auction_data.bid_userid, auction_data.bid_auctionid, auction_data.bid_amount, auction_data.bid_datetime];

    if (auction_data.bid_userid != loggedInId) {
        res.status(400).send("Bad request");
    }

    if (values.categoryId == null || auction_data.bid_userid == null || auction_data.bid_auctionid == null || auction_data.bid_amount == null || auction_data.bid_datetime == null) {
        res.status(400).send("Bad request");
    }

    Bid.insert(values, function(result) {
        res.json(result);
    });
};



exports.read = function (req, res) {
    //200 ok, 400 bad request, 401 unauthorized, 404 not found, 500 internal server error

    let id = req.params.id;
    Auction.getOne(id, function(result) {
        res.json(result);
    });
};

exports.readBids = function (req, res) {
    let auction_id = req.params.id;
    Bid.getBidsAuction(auction_id, function(result) {
        res.json(result);
    });
};


exports.update = function(req, res){
    //201 ok, 400 bad request, 401 unauthorized, 403, forbidden - bidding has begun on the auction, 404 not found, 500 internal server error

    let updateOptions = {
        "id" : req.params.id,
        "categoryId": req.body.categoryId,
        "title": req.body.title,
        "description": req.body.description,
        "startingdate": req.body.startDateTime,
        "endingdate": req.body.endDateTime,
        "reserveprice": req.body.reservePrice,
        "startingprice": req.body.startingBid,
        "deactivated": req.body.deactivated
    };

    if (updateOptions.id == null) {
        res.status(400).send("Bad request");
    }


    Auction.alter(updateOptions, function(result){
        res.json(result);
        //res.status(200).send("Updated")
    })
};




