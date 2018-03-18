const db = require('../../config/db');


//where we put actual sql queries to the db

exports.getAll = function(values, done) {
    //LOOOONNNGGG ass dynamic query here
    db.get_pool().query('SELECT * FROM auction', function (err, rows) {

        //200 ok, 400 bad request, 500 internal server area (fallback)
        if (err) return done({"Error" : "Error selecting"});

        return done(rows);
    });
};


//need to add 'get all bids' to end of query
exports.getOne = function(auction_id, done) {

    query_values = [auction_id, auction_id, auction_id, auction_id];

    db.get_pool().query("Select auction_categoryid as categoryId, category_title as categoryTitle, auction_title as title, " +
        "auction_reserveprice as reservePrice, auction_startingdate as startDateTime, auction_endingdate as endDateTime, " +
        "auction_description as description, auction_creationdate as creationDateTime, user_id as id, user_username as username, " +
        "auction_startingprice as startingBid,  MAX(bid_amount) as currentBid" +
        //"bid_amount as 1amount, bid_datetime as 2dateTime, bid_userid as 3buyerId, user_username as 4buyerUsername" +
        " from auction, category, auction_user, bid " +
        "where auction_id=? and category_id=(Select auction_categoryid from auction where auction_id=?) and " +
        "user_id=(Select auction_userid from auction where auction_id=?) and bid_auctionid=? ",
        query_values, function (err, rows) {

            //200 ok, 400 bad request, 401 unauthorized, 404 not found, 500 internal server error
            if(err) done(err);
            else setValue(rows);
        });

// "(Select bid_amount, bid_datetime, bid_userid, user_username as buyerUsername from auction, bid, auction_user where bid_auctionid=? and user_id=(Select auction_userid from auction where auction_id=?))",

    function setValue(value) {

        newValues = {
            "categoryId": 0,
            "categoryTitle": "string",
            "title": "string",
            "reservePrice": 0,
            "startDateTime": 0,
            "endDateTime": 0,
            "description": "string",
            "creationDateTime": 0,
            "seller": {
                "id": 0,
                "username": "string"
            },
            "startingBid": 0,
            "currentBid": 0,
            "bids": [
                {
                    "amount": 0,
                    "datetime": 0,
                    "buyerId": 0,
                    "buyerUsername": "string"
                }
            ]
        };

        newValues.categoryId = value[0].categoryId;
        newValues.categoryTitle = value[0].categoryTitle;
        newValues.title = value[0].title;
        newValues.reservePrice = value[0].reservePrice;
        newValues.startDateTime = value[0].startDateTime;
        newValues.endDateTime = value[0].endDateTime;
        newValues.creationDateTime = value[0].creationDateTime;
        newValues.seller.id = value[0].id;
        newValues.seller.username = value[0].username;
        newValues.startingBid = value[0].startingBid;
        newValues.currentBid = value[0].currentBid;

        //console.log(value);
        //console.log(newValues);

        done(newValues);
    }


    /*
        let values = {
            "categoryId":db.get_pool().query("Select auction_categoryid from auction where auction_id = ?", auction_id),
            "categoryTitle":db.get_pool().query("Select category_title from category where category_id=(Select auction_categoryid from auction where auction_id = ?)", auction_id),       //FK
            "title":db.get_pool().query("Select auction_title from auction where auction_id = ?", auction_id),
            "reservePrice":db.get_pool().query("Select auction_reserveprice from auction where auction_id = ?", auction_id),
            "startDateTime":db.get_pool().query("Select auction_startingdate from auction where auction_id = ?", auction_id),
            "endDateTime":db.get_pool().query("Select auction_endingdate from auction where auction_id = ?", auction_id),
            "description":db.get_pool().query("Select auction_description from auction where auction_id = ?", auction_id),
            "creationDateTime":db.get_pool().query("Select auction_creationdate from auction where auction_id = ?", auction_id),
            "seller":db.get_pool().query("Select user_id, user_username from auction_user where user_id=(Select auction_userid from auction where auction_id=?)", auction_id ),                         //FK
            "startingBid":db.get_pool().query("Select auction_startprice from auction where auction_id = ?", auction_id),
            "currentBid":db.get_pool().query("Select (max) bid_amount from bid where bid_auctionid = ?", auction_id),        //add to, fk bids
            "bids":db.get_pool().query("Select bid_amount, bid_datetime, bid_userid, user_username from auction, bid, auction_user where bid_auctionid=? and user_id=(Select auction_userid from auction where auction_id=?)", auction_id, auction_id)            //FK
        };

        */

};




exports.insert = function(values, done) {

    //201 ok and return json of auction_id, 400 bad request, 401 unauthorized, 500 internal server error
    db.get_pool().query("INSERT INTO auction (auction_categoryId, auction_title, auction_description, auction_startingdate, " +
        "auction_endingdate, auction_reserveprice, auction_startingprice, auction_userid) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        values, function (err, result) {

        //201 ok, 400 bad request, 401 unauthorized, 500 internal server error
        if (err) return done(err);
        done(result);
    });
};




exports.alter = function(updateOptions, done){


    let query = 'UPDATE auction SET ';
    let qValues = [];

    if (updateOptions.categoryId != undefined) {
        query = query + ' auction_categoryid=?,';
        qValues.push(updateOptions.categoryId);
    }
    if (updateOptions.title != undefined) {
        query = query + ' auction_title=?,';
        qValues.push(updateOptions.title);
    }
    if (updateOptions.description != undefined) {
        query = query + ' auction_description=?,';
        qValues.push(updateOptions.description);
    }
    if (updateOptions.startingdate != undefined) {
        query = query + ' auction_startingdate=?,';
        qValues.push(updateOptions.startingdate);
    }
    if (updateOptions.endingdate != undefined) {
        query = query + ' auction_endingdate=?,';
        qValues.push(updateOptions.endingdate);
    }
    if (updateOptions.reserveprice != undefined) {
        query = query + ' auction_reserveprice=?,';
        qValues.push(updateOptions.reserveprice);
    }
    if (updateOptions.startingprice != undefined) {
        query = query + ' auction_startingprice=?,';
        qValues.push(updateOptions.startingprice);
    }
    if (updateOptions.deactivated != undefined) {
        query = query + ' auction_deactivated=?,';
        qValues.push(updateOptions.deactivated);
    }


    query = query.substring(0, query.length-1) + ' WHERE auction_id=?';
    qValues.push(updateOptions.id);

    console.log(query);
    console.log(qValues);

    db.get_pool().query(query, qValues, function(err, result){

        //201 ok, 400 bad request, 401 unauthorized, 403, forbidden - bidding has begun on the auction, 404 not found, 500 internal server error

        if(err) return done(err);
        done(result);
    });

};




































/*executeFirst();

    function executeFirst() {


        if(updateOptions.categoryId == undefined) {
            db.get_pool().query("Select auction_categoryid from auction where auction_id = ?", updateOptions.id, function (err, result) {
                categoryId(result);
            });
        }
        if(updateOptions.title == undefined) {
            db.get_pool().query("Select auction_title from auction where auction_id = ?", updateOptions.id, function (err, result) {
                title(result);
            });
        }
        if(updateOptions.description == undefined) {
            db.get_pool().query("Select auction_description from auction where auction_id = ?", updateOptions.id, function (err, result) {
                //description(result);
                updateOptions.description = result;
                console.log(updateOptions.description);
                console.log(Date.now() + " 1st part");

            });
        }
        if(updateOptions.startingdate == undefined) {
            db.get_pool().query("Select auction_startingdate from auction where auction_id = ?", updateOptions.id, function (err, result) {
                startingdate(result);
            });
        }
        if(updateOptions.endingdate == undefined) {
            db.get_pool().query("Select auction_endingdate from auction where auction_id = ?", updateOptions.id, function (err, result) {
                endingdate(result);
            });
        }
        if(updateOptions.reserveprice == undefined) {
            db.get_pool().query("Select auction_reserveprice from auction where auction_id = ?", updateOptions.id, function (err, result) {
                reserveprice(result);
            });
        }
        if(updateOptions.startingprice == undefined) {
            db.get_pool().query("Select auction_startingprice from auction where auction_id = ?", updateOptions.id, function (err, result) {
                startingprice(result);
            });
        }
        if(updateOptions.deactivated == undefined) {
            db.get_pool().query("Select auction_deactivated from auction where auction_id = ?", updateOptions.id, function (err, result) {
                deactivated(result);
            });
        }

        function categoryId(value) {
            updateOptions.categoryId = value;}
        function title(value) {
            updateOptions.title = value;}
        function description(value) {
            updateOptions.description = value;
            console.log(updateOptions.description);
            console.log(Date.now() + " 1st part");}
        function startingdate(value) {
            updateOptions.startingdate = value;}
        function endingdate(value) {
            updateOptions.endingdate = value;}
        function reserveprice(value) {
            updateOptions.reserveprice = value;}
        function startingprice(value) {
            updateOptions.startingprice = value;}
        function deactivated(value) {
            updateOptions.deactivated = value;}


        executeSecond();
    }


    function executeSecond() {
            let values = [updateOptions.categoryId, updateOptions.title, updateOptions.description, updateOptions.startingdate, updateOptions.endingdate, updateOptions.reserveprice, updateOptions.startingprice, updateOptions.deactivated, updateOptions.id];
            console.log(Date.now() + " second part");

            db.get_pool().query('UPDATE auction SET auction_categoryId=?, auction_title=?, auction_description=?, auction_startingdate=?, auction_endingdate=?, auction_reserveprice=?, auction_startingprice=?, auction_deactivated=?  WHERE auction_id=?', values, function(err, result){

                if(err) return done({ERROR:"Malformed request"});
                done(result);
            });


    }
    */

