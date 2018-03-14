
//tells our app where to go if a certain function is called

module.exports = function(app) {
    app.route('/resample')
        .post();                       //reload sample of data into reset database

    app.route('/reset')
        .post();               //force reset of database to original structure


};