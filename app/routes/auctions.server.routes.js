const auctions = require('../controllers/auctions.server.controller');

//tells our app where to go if a certain function is called



module.exports = function(app) {
    app.route('/api/v1/auctions')
        .get(auctions.list)         //view auctions   [ ]
        .post(auctions.create);      //create auction   [X]

    app.route('/api/v1/auctions/:id')
        .get(auctions.read)          //view a auction details    [X]
        .patch(auctions.update);      //change some selected info for a auction [X]

    app.route('/api/v1/auctions/:id/bids')
        .get(auctions.readBids)                         //view bid history   [X]
        .post(auctions.createBid)                        //make bid on auction   [X]


};

