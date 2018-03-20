const db = require('../../config/db');


exports.resampleDatabase = function(done) {
    db.get_pool().query('INSERT INTO auction_user (user_username, user_givenname, user_familyname, user_email, user_password, user_accountbalance, user_reputation)\n' +
        'VALUES\n' +
        '(\'black.panther\', \'T\', \'Challa\', \'black.panther@super.heroes\', \'Wakanda\', \'0.00\' , \'500\'),\n' +
        '(\'superman\', \'Clark\', \'Kent\', \'superman@super.heroes\', \'kryptonite\', \'0.00\', \'900\'),\n' +
        '(\'batman\', \'Bruce\', \'Wayne\', \'dark.knight@super.heroes\', \'frankmiller\', \'0.00\', \'850\'),\n' +
        '(\'spiderman\', \'Peter\', \'Parker\', \'spiderman@super.heroes\', \'arachnid\', \'0.00\', \'500\'),\n' +
        '(\'ironman\', \'Tony\', \'Stark\', \'ironman@super.heroes\', \'robertdowney\', \'0.00\', \'700\'),\n' +
        '(\'captain.america\', \'Steve\', \'Rogers\', \'captain.america@super.heroes\', \'donaldtrump\', \'0.00\', \'300\'),\n' +
        '(\'dr.manhatten\', \'Jonathan\', \'Osterman\', \'dr.manhatten@super.heroes\', \'hydrogen\', \'0.00\', \'1000\'),\n' +
        '(\'vampire.slayer\', \'Buffy\', \'Summers\', \'vampire.slayer@super.heroes\', \'sarahgellar\', \'0.00\' , \'600\'),\n' +
        '(\'Ozymandias\', \'Adrian\', \'Veidt\', \'Ozymandias@super.villains\', \'shelley\', \'0.00\' , \'200\'),\n' +
        '(\'Rorschach\', \'Walter\', \'Kovacs\', \'Rorschach@super.villains\', \'Joseph\', \'0.00\' , \'200\'),\n' +
        '(\'power.woman\', \'Jessica\', \'Jones\', \'power.woman@super.heroes\', \'lukecage\', \'0.00\' , \'200\')\n' +
        ';\n' +
        '\n' +
        'INSERT INTO category (category_title, category_description)\n' +
        'VALUES\n' +
        '(\'apparel\', \'Clothing, for example capes, masks, belts, boots, gloves etc\'),\n' +
        '(\'equipment\', \'Rings of power, hammers from the gods, grappling hooks, lassos of truth, and such like\'),\n' +
        '(\'vehicles\', \'Various forms of transportation, such as surf boards, tanks, jetpacks, etc\'),\n' +
        '(\'property\', \'For examples: planets, orbiting space stations, ice palaces at the North Pole.\'),\n' +
        '(\'other\', \'Other oddities.\')\n' +
        ';\n' +
        '\n' +
        '\n' +
        'INSERT INTO auction (\n' +
        'auction_title,\n' +
        'auction_categoryid,\n' +
        'auction_description,\n' +
        'auction_reserveprice,\n' +
        'auction_startingprice,\n' +
        'auction_creationdate,\n' +
        'auction_startingdate,\n' +
        'auction_endingdate,\n' +
        'auction_userid)\n' +
        'VALUES\n' +
        '(\'Super cape\', \'1\', \'One slightly used cape\', \'10.00\', \'0.01\', \'2018-02-14 00:00:00\', \'2018-02-15 00:00:00\', \'2018-03-14 00:00:00\', \'2\'),\n' +
        '(\'Broken pyramid\', \'4\', \'One very broken pyramid. No longer wanted. Buyer collect\', \'1000000.00\', \'1.00\', \'2018-02-14 00:00:00\', \'2018-02-15 00:00:00\', \'2018-02-28 00:00:00\', \'9\'),\n' +
        '(\'One boot\', \'1\', \'One boot. Lost the other in a battle with the Joker\', \'10.00\', \'0.50\', \'2018-02-14 00:00:00\', \'2018-02-15 00:00:00\', \'2018-03-14 00:00:00\', \'3\'),\n' +
        '(\'Intrinsic Field Subtractor\', \'5\', \'Hard to write about, but basically it changed me. A lot. \', \'100.00\', \'1.00\', \'2018-02-14 00:00:00\', \'2018-02-15 00:00:00\', \'2018-06-30 00:00:00\', \'7\'),\n' +
        '(\'A cache of vibranium\', \'5\', \'A cache of vibranium stolen from Wakanda. \', \'500000.00\', \'10000.00\', \'2018-02-14 00:00:00\', \'2018-02-15 00:00:00\', \'2018-06-30 00:00:00\', \'10\')\n' +
        ';\n' +
        '\n' +
        'INSERT INTO bid (\n' +
        '  bid_userid,\n' +
        '  bid_auctionid,\n' +
        '  bid_amount,\n' +
        '  bid_datetime)\n' +
        'values\n' +
        '(\'1\', \'1\', \'10.00\', \'2018-02-20 00:01:00\'),\n' +
        '(\'9\', \'3\', \'100.00\', \'2018-02-20 00:10:00\'),\n' +
        '(\'7\', \'3\', \'150.00\', \'2018-02-20 00:20:00\'),\n' +
        '(\'9\', \'3\', \'200.00\', \'2018-02-20 00:30:00\'),\n' +
        '(\'9\', \'3\', \'250.00\', \'2018-02-20 00:40:00\'),\n' +
        '(\'7\', \'3\', \'350.00\', \'2018-02-20 00:50:00\'),\n' +
        '(\'9\', \'3\', \'400.00\', \'2018-02-20 01:00:00\'),\n' +
        '(\'7\', \'4\', \'1000.00\', \'2018-02-20 01:00:00\')\n' +
        ';',

        function (err, rows) {

        if (err) return done(err);
        return done(rows);
    });
};



exports.resetDatabase = function(done) {

    db.get_pool().query('# MySQL scripts for dropping existing tables and recreating the database table structure\n' +
        '# version  0.0.5; 16 March 2018\n' +
        '# Note: WebStorm throws an annoying error \'expecting one of the following: ALGORITHM DEFINER SQL VIEW\'. This is an erroneous error and the script should run successfully despite this error.\n' +
        '\n' +
        '# Tables must be dropped in a particular order due to referential constraints i.e. foreign keys.\n' +
        '\n' +
        'DROP TABLE IF EXISTS bid;\n' +
        'DROP TABLE IF EXISTS photo;\n' +
        'DROP TABLE IF EXISTS auction;\n' +
        'DROP TABLE IF EXISTS category;\n' +
        'DROP TABLE IF EXISTS auction_user;\n' +
        '\n' +
        '# Tables must be created in a particular order due to referential constraints i.e. foreign keys.\n' +
        '\n' +
        'CREATE TABLE auction_user (\n' +
        '  user_id int(10) NOT NULL AUTO_INCREMENT,\n' +
        '  user_username varchar(50) NOT NULL,\n' +
        '  user_givenname varchar(50) NOT NULL,\n' +
        '  user_familyname varchar(50) NOT NULL,\n' +
        '  user_email varchar(320) NOT NULL,\n' +
        '  user_password varchar(512) NOT NULL,\n' +
        '  user_salt varchar(128) DEFAULT NULL,\n' +
        '  user_token varchar(256) DEFAULT NULL,\n' +
        '  user_accountbalance decimal(10,2) NOT NULL DEFAULT \'0\',\n' +
        '  user_reputation int(10) NOT NULL DEFAULT \'0\',\n' +
        '  PRIMARY KEY (user_id),\n' +
        '  UNIQUE KEY user_id (user_id),\n' +
        '  UNIQUE KEY user_email (user_email),\n' +
        '  UNIQUE KEY user_token (user_token),\n' +
        '  UNIQUE KEY user_username (user_username)\n' +
        ') ENGINE=InnoDB DEFAULT CHARSET=latin1;\n' +
        '\n' +
        'CREATE TABLE category (\n' +
        '  category_id int(10) NOT NULL AUTO_INCREMENT,\n' +
        '  category_title varchar(50) NOT NULL,\n' +
        '  category_description varchar(256) DEFAULT NULL,\n' +
        '  PRIMARY KEY (category_id),\n' +
        '  UNIQUE KEY category_id (category_id)\n' +
        ') ENGINE=InnoDB DEFAULT CHARSET=latin1;\n' +
        '\n' +
        'CREATE TABLE auction (\n' +
        '  auction_id int(10) NOT NULL AUTO_INCREMENT,\n' +
        '  auction_title varchar(128) NOT NULL,\n' +
        '  auction_categoryid int(10) NOT NULL,\n' +
        '  auction_description varchar(512) DEFAULT NULL,\n' +
        '  auction_reserveprice decimal(10,2) DEFAULT NULL,\n' +
        '  auction_startingprice decimal(10,2) NOT NULL,\n' +
        '  auction_creationdate datetime NOT NULL,\n' +
        '  auction_startingdate datetime NOT NULL,\n' +
        '  auction_endingdate datetime NOT NULL,\n' +
        '  auction_userid int(10) NOT NULL,\n' +
        '  auction_primaryphoto_URI varchar(128) DEFAULT NULL,\n' +
        '  auction_deactivated tinyint(1) DEFAULT NULL,\n' +
        '  PRIMARY KEY (auction_id),\n' +
        '  KEY fk_auction_category_id (auction_categoryid),\n' +
        '  KEY fk_auction_userid (auction_userid),\n' +
        '  CONSTRAINT fk_auction_userid FOREIGN KEY (auction_userid) REFERENCES auction_user (user_id),\n' +
        '  CONSTRAINT fk_auction_category_id FOREIGN KEY (auction_categoryid) REFERENCES category (category_id)\n' +
        ') ENGINE=InnoDB DEFAULT CHARSET=latin1;\n' +
        '\n' +
        'CREATE TABLE photo (\n' +
        '  photo_id int(10) NOT NULL AUTO_INCREMENT,\n' +
        '  photo_auctionid int(10) NOT NULL,\n' +
        '  photo_image_URI varchar(128) NOT NULL,\n' +
        '  photo_displayorder int NULL,\n' +
        '  PRIMARY KEY (photo_id),\n' +
        '  KEY fk_photo_auctionid (photo_auctionid),\n' +
        '  CONSTRAINT fk_photo_auctionid FOREIGN KEY (photo_auctionid) REFERENCES auction (auction_id)\n' +
        ') ENGINE=InnoDB DEFAULT CHARSET=latin1;\n' +
        '\n' +
        'CREATE TABLE bid (\n' +
        '  bid_id int(10) NOT NULL AUTO_INCREMENT,\n' +
        '  bid_userid int(10) NOT NULL,\n' +
        '  bid_auctionid int(10) NOT NULL,\n' +
        '  bid_amount decimal(10,2) NOT NULL,\n' +
        '  bid_datetime datetime NOT NULL,\n' +
        '  PRIMARY KEY (bid_id),\n' +
        '  KEY fk_bid_userid (bid_userid),\n' +
        '  KEY fk_auctionid (bid_auctionid),\n' +
        '  CONSTRAINT fk_auctionid FOREIGN KEY (bid_auctionid) REFERENCES auction (auction_id),\n' +
        '  CONSTRAINT fk_bid_userid FOREIGN KEY (bid_userid) REFERENCES auction_user (user_id)\n' +
        ') ENGINE=InnoDB DEFAULT CHARSET=latin1;',

        function (err, rows) {
        if (err) return done(err);
        done(rows);
    });
};




