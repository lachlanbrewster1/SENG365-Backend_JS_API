const db = require('../controllers/database.server.controller');
//tells our app where to go if a certain function is called

module.exports = function(app) {

    app.route('/api/v1/reset')
        .post(db.resetDb);               //force reset of database to original structure



    app.route('/api/v1/resample')
        .post(db.resampleDb);                       //reload sample of data into reset database


};