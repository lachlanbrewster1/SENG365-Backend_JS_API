const Auction = require('../models/auctions.server.model');
const Bid = require('../models/bids.server.model');


//these functions are called, which reference the functions within our model file


exports.list = function(req, res) {
    //200 ok, 400 bad request, 500 internal server area (fallback)


    let auction_search = {
        "startIndex": req.query.startIndex,
        "count": req.query.count,
        "q": req.query.q,
        "categoryId": req.query.categoryId,
        "seller": req.query.seller,
        "bidder": req.query.bidder,
        "winner": req.query.winner
    };

    console.log(auction_search);


    Auction.getAll(auction_search, function(result) {
        if (result == 404) res.sendStatus(404);
        else if (result == 400) res.sendStatus(400);
        else if (result == 401) res.sendStatus(401);
        else if (result == 500) res.sendStatus(500);
        else res.json(result);
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
        "token": req.get('X-Authorization')
    };

    //console.log(auction_data);

    if (auction_data.token == undefined) {
        res.sendStatus(401);
        return;
    }


    if (auction_data.categoryId == undefined || auction_data.title == undefined || auction_data.description == undefined || auction_data.startingdate == undefined
        || auction_data.endingdate == undefined || auction_data.reserveprice == undefined || auction_data.startingprice == undefined ) {
        res.sendStatus(400);
        return;
    }


    Auction.insert(auction_data, function(result) {
        if (result == 404) res.sendStatus(404);
        else if (result == 400) res.sendStatus(400);
        else if (result == 401) res.sendStatus(401);
        else if (result == 500) res.sendStatus(500);
        else {
            dataReturn = {
                "id": 0
            };
            dataReturn.id = result["insertId"];
            res.status(201).json(dataReturn);
        }
    });
};



exports.read = function (req, res) {
    //200 ok, 400 bad request, 401 unauthorized, 404 not found, 500 internal server error

    let values = {
        "auction_id": req.params.id,
        "token": req.get('X-Authorization'),
    };

    Auction.getOne(values, function(result) {

        if (result == 404) res.sendStatus(404);
        else if (result == 400) res.sendStatus(400);
        else if (result == 401) res.sendStatus(401);
        else if (result == 500) res.sendStatus(500);
        else res.json(result);

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
        "deactivated": req.body.deactivated,
        "token": req.get('X-Authorization'),
    };

    if (updateOptions.id == undefined) {
        res.sendStatus(400);
        return;
    }


    Auction.alter(updateOptions, function(result){
        if (result == 404) res.sendStatus(404);
        else if (result == 400) res.sendStatus(400);
        else if (result == 401) res.sendStatus(401);
        else if (result == 403) res.sendStatus(403);
        else if (result == 500) res.sendStatus(500);
        else res.sendStatus(201);
    })
};



exports.createBid = function (req, res) {
    //201 ok, 400 bad request, 404 not found, 500 internal server error

    let auction_data = {
        "bid_auctionid": req.params.id,
        "bid_amount": req.query.amount,
        "token": req.get('X-Authorization'),
        "bid_datetime": Date.now()                       //need to convert to sql time                                //NEED TO DO
    };

    if (auction_data.token == undefined) {
        return res.sendStatus(401);
    }

    let values = [auction_data.bid_auctionid, auction_data.bid_amount, auction_data.bid_datetime, auction_data.token];

    if (auction_data.bid_auctionid == undefined || auction_data.bid_amount == undefined || auction_data.bid_datetime == undefined) {
        res.sendStatus(400);
        return;
    }

    Bid.insert(values, function(result) {
        if (result === 404) res.sendStatus(404);
        else if (result === 400) res.sendStatus(400);
        else if (result === 401) res.sendStatus(401);
        else if (result === 403) res.sendStatus(403);
        else if (result === 500) res.sendStatus(500);
        else res.status(201).json(result);
    });
};



exports.readBids = function (req, res) {
    //200 ok, 400 bad request, 404 not found, 500 server error

    let auction_id = req.params.id;

    if (auction_id == undefined) {
        res.sendStatus(400);
        return;
    }

    //IF ID == UNDEFINED MAYBE 400? OR IF ID NOT A NUMBER MAYBE

    Bid.getBidsAuction(auction_id, function(result) {
        if (result == 404) res.sendStatus(404);
        else if (result == 400) res.sendStatus(400);
        else if (result == 401) res.sendStatus(401);
        else if (result == 403) res.sendStatus(403);
        else res.json(result);
    });
};





/*
if (result == 404) res.sendStatus(404).send('Not found');
        else if (result == 400) res.sendStatus(400).send('Bad request');
        else if (result == 401) res.sendStatus(401).send('Unauthorized');
        else if (result == 403) res.sendStatus(403).send('Forbidden - bidding has begun on the auction');
        else if (result == 500) res.sendStatus(500).send('Internal server error');
        else res.json(result);
 */



