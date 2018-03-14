const auctions = require('../controllers/auctions.server.controller');

//tells our app where to go if a certain function is called


//  NEED TO CHANGE ROOT OF ROUTE TO api/v1/



module.exports = function(app) {
    app.route('/auctions')
        .get(auctions.list)         //view auctions   [ ]           need biiigggg dynamic query
        .post(auctions.create);      //create auction   [X]

    app.route('/auctions/:id')
        .get(auctions.read)          //view a auction details    [X]
        .patch(auctions.update);      //change some selected info for a auction [ ]    need to sort out execution order issue

    app.route('/auctions/:id/bids')
        .get(auctions.readBids)                         //view bid history   [X]
        .post(auctions.createBid)                        //make bid on auction   [X]


};

