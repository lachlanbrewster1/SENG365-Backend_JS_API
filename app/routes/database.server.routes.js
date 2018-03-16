
//tells our app where to go if a certain function is called

module.exports = function(app) {
    app.route('/api/v1//resample')
        .post();                       //reload sample of data into reset database

    app.route('/api/v1//reset')
        .post();               //force reset of database to original structure


};