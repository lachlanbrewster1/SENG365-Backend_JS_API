const photos = require('../controllers/photos.server.controller');

//tells our app where to go if a certain function is called

//  NEED TO CHANGE ROOT OF ROUTE TO api/v1/


module.exports = function(app) {
    app.route('/auctions/{id}/photos')
        .get(photos.list)          //list auction photo URIs    []
        .post(photos.create);      //add photo to auction         []

    app.route('/auctions/{auction-id}/photos/{photo-id}')
        .get(photos.read)          //get auction photo      []
        .put(photos.update)       //update auction photo      []
        .delete(photos.delete);       //delete auction photo       []



};