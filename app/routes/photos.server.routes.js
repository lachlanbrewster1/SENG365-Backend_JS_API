const photos = require('../controllers/photos.server.controller');

//tells our app where to go if a certain function is called


module.exports = function(app) {
    app.route('/api/v1/auctions/:id/photos')
        .get(photos.list)          //list auction photo URIs    []
        .post(photos.create)      //add photo to auction         []
        .delete(photos.delete);       //delete auction photo       []


};