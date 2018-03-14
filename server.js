const db = require('./config/db'),
    express = require('./config/express');

const app = express();

//connect to MySQL on start
db.connect(function(err) {

    if (err) {
        console.log('Unable to connect to mySQL');
        process.exit(1);
    } else {
        app.listen(3000, function() {
            console.log('Listening on port: ' + 3000);
        });
    }
    }
);


