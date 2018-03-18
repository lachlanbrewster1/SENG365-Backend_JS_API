const database = require('../controllers/database.server.controller');
//tells our app where to go if a certain function is called

module.exports = function(app) {
    app.route('/api/v1/resample')
        .post(database.resample);                       //reload sample of data into reset database

    app.route('/api/v1/reset')
        .post(database.reset);               //force reset of database to original structure


};