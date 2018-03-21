const db = require('../../config/db');

//where we put actual sql queries to the db

var getIdFromToken = function(token) {
    db.get_pool().query('SELECT user_id FROM auction_user where user_token=?',token, function (err, rows) {
        let user_id = rows[0].user_id;

        if (user_id == undefined || user_id == null || user_id == ""){
            return null;
        }
        return user_id;
    });

};

exports.getAll = function(auction_search, done) {
    //200 ok, 400 bad request, 500 internal server area (fallback)

    //NEED TO CONFIRM THIS ACTUALLY WORKS AND MAKE MY OWN WAY OF DOING IT, RESEARCH
    /*
    let date = new Date();
    let curDate = date.toISOString();

    let values = [auction_search.q, curDate, curDate, Number(auction_search.startIndex), Number(auction_search.count),
        auction_search.categoryId, auction_search.seller, auction_search.bidder, auction_search.winner];
    let category = '';
    if (auction_search.categoryId != null) {
        category = ' AND auction_categoryid = ' + auction_search.categoryId;
    }

    db.get_pool().query('SELECT auction_id, auction_title, auction_primaryphoto_URI FROM auction where auction_title LIKE ? AND auction_startingdate < ? AND auction_endingdate > ? '
        + category + ' LIMIT ?, ?',
        values, function (err, rows) {

            if (err) return done(err);
            //if (err) return done(400);
            else return done(rows);
    });
    */
    let category = "";
    if (auction_search.categoryId != undefined) {
        category = 'where auction_categoryid = ' + auction_search.categoryId;
    }


    db.get_pool().query('SELECT * FROM auction ' + category + 'LIMIT ?, ?',[parseInt(auction_search.count), parseInt(auction_search.startIndex)], function (err, rows) {

        if (err) return done(400);
        else return done(rows);


    });


};



exports.getOne = function(values, done) {
    //200 ok, 400 bad request, 404 not found, 500 internal server error


    query_values = [values.auction_id, values.auction_id, values.auction_id, values.auction_id];

    db.get_pool().query('SELECT auction_userid from auction where auction_id=?', [values.auction_id], function(err2, result){
        if (result == "") {
            return done(404);
        }


        /*db.get_pool().query('SELECT user_token FROM auction_user WHERE user_id=(SELECT auction_userid FROM auction WHERE auction_id=?)', [values.auction_id], function(err3, result) {

            if (result[0].user_token == null) {
                return done(401);
            } else {
                let userTokenInDb = result[0].user_token;
                if (values.token != userTokenInDb) {
                    return done(401);
                }
            }
            */


        db.get_pool().query("Select auction_categoryid as categoryId, category_title as categoryTitle, auction_title as title, " +
            "auction_reserveprice as reservePrice, auction_startingdate as startDateTime, auction_endingdate as endDateTime, " +
            "auction_description as description, auction_creationdate as creationDateTime, user_id as id, user_username as username, " +
            "auction_startingprice as startingBid,  MAX(bid_amount) as currentBid" +
            " from auction, category, auction_user, bid " +
            "where auction_id=? and category_id=(Select auction_categoryid from auction where auction_id=?) and " +
            "user_id=(Select auction_userid from auction where auction_id=?) and bid_auctionid=? ",
            query_values, function (err, rows) {

                if(err) {
                    return done(400);
                } else {

                    let query1 =
                        'SELECT bid_amount as amount, bid_datetime as datetime, bid_userid as buyerId, user_username as buyerUsername ' +
                        'FROM bid, auction_user ' +
                        'WHERE bid_auctionid = ? and bid_userid = user_id';

                    db.get_pool().query(query1, query_values, function (err, rows1) {

                        if (rows1 != "") {
                            setValue([rows, rows1]);
                        } else {
                            setValue([rows])
                        }
                    });

                }

            });
        //});
    });



// "(Select bid_amount, bid_datetime, bid_userid, user_username as buyerUsername from auction, bid, auction_user where bid_auctionid=? and user_id=(Select auction_userid from auction where auction_id=?))",

    function setValue(values) {
        value = values[0];

        //console.log(values[1]);


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
            "bids": []
        };

        newValues.categoryId = value[0].categoryId;
        newValues.categoryTitle = value[0].categoryTitle;
        newValues.title = value[0].title;
        newValues.reservePrice = value[0].reservePrice;
        newValues.startDateTime = value[0].startDateTime;
        newValues.endDateTime = value[0].endDateTime;
        newValues.description = value[0].description;
        newValues.creationDateTime = value[0].creationDateTime;
        newValues.seller.id = value[0].id;
        newValues.seller.username = value[0].username;
        newValues.startingBid = value[0].startingBid;
        newValues.currentBid = value[0].currentBid;

        if (values.length == 2) {
            newValues.bids = values[1];
        }

        //console.log(value);
        //console.log(newValues);

        return done(newValues);
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



exports.insert = function(auction_data, done) {
    //201 ok and return json of auction_id, 400 bad request, 401 unauthorized, 500 internal server error

    //if they arent logged in then un authorized


    db.get_pool().query('SELECT user_id FROM auction_user where user_token=?',auction_data.token, function (err, rows) {
        if (rows == "") {
            return done (401);
        }
        auction_data.user_id = rows[0].user_id;

        if (auction_data.user_id == undefined || auction_data.user_id == null || auction_data.user_id == ""){
            return done(401);
        }


        let values = [auction_data.categoryId, auction_data.title, auction_data.description, auction_data.startingdate,
            auction_data.endingdate, auction_data.reserveprice, auction_data.startingprice, auction_data.user_id];


        db.get_pool().query("INSERT INTO auction (auction_categoryId, auction_title, auction_description, auction_startingdate, " +
            "auction_endingdate, auction_reserveprice, auction_startingprice, auction_userid) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            values, function (err, result) {

                if (err) {
                    return done(400);
                } else {
                    return done(result);
                }


        });

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

    //console.log(query);
    //console.log(qValues);

    if (qValues.length == 1) {
        return done(400);
    }


        db.get_pool().query('SELECT * from auction where auction_id=?', updateOptions.id, function(err2, result){
            if (result == "") {
                return done(404);
            }

            db.get_pool().query('SELECT user_token FROM auction_user WHERE user_id=(SELECT auction_userid FROM auction WHERE auction_id=?)', [updateOptions.id], function(err3, result) {

                if (result == "") {
                    return done(401);
                } else {
                    let userTokenInDb = result[0].user_token;
                    if (updateOptions.token != userTokenInDb) {
                        return done(401);
                    }
                }


                db.get_pool().query('SELECT * FROM bid WHERE bid_auctionid=?', updateOptions.id, function(err4, result){
                if (result != "") {
                    return done(403);
                }

                let auction_userid;
                db.get_pool().query('SELECT auction_userid from auction where auction_id=?', updateOptions.id, function(err3, result){
                    if (result == "" || result == undefined) {
                        return done(404);
                    }

                    db.get_pool().query(query, qValues, function(err, result){
                        //201 ok, 400 bad request, 401 unauthorized, 403, forbidden - bidding has begun on the auction, 404 not found, 500 internal server error

                        if(err) {
                            return done(400);
                        }
                        else {
                            return done(result);
                        }

                    });


                });


            });

        });


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

