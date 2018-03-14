const mysql = require('mysql');

let state = {
    pool: null
};

exports.connect = function(done) {
    state.pool = mysql.createPool({
        host: 'mysql3.csse.canterbury.ac.nz',
        user: 'lbr63',
        password: '37248471',
        database: 'lbr63'
    });
    done();
};

exports.get_pool = function() {
    return state.pool;
};

