const users = require('../controllers/users.server.controller');

//tells our app where to go if a certain function is called

//  NEED TO CHANGE ROOT OF ROUTE TO api/v1/


module.exports = function(app) {

    app.route('/users/:id')                                //NEED TO MAKE THIS WORK WITH {}   INSTEAD OF :id
        .get(users.read)               //get user by user id  [X]
        .patch(users.update);          //change some info for a user     [ ]          Once execution order is sorted this will be done

    app.route('/users/login')
        .post(users.login);             //log in user by username or email    []

    app.route('/users/logout')
        .post(users.logout);             //logs out user session given by auth token in header     []

    app.route('/users')
        .post(users.create)   //create user  [X]
        .get(users.list);           //NOT IN API SPEC

};





