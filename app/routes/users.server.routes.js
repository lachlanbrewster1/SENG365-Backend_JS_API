const users = require('../controllers/users.server.controller'),
        auth = require('../lib/middleware');

//tells our app where to go if a certain function is called


module.exports = function(app) {

    app.route('/api/v1/users/:id')                                //NEED TO MAKE THIS WORK WITH {}   INSTEAD OF :id
        .get(users.read)               //get user by user id  [X]
        .patch(users.update);          //change some info for a user     [X]

    app.route('/api/v1/users/login')
        .post(users.login);             //log in user by username or email    []

    app.route('/api/v1/users/logout')
        .post(users.logout);             //logs out user session given by auth token in header     []

    app.route('/api/v1/users')
        .post(users.create);          //create user  [X]

};





