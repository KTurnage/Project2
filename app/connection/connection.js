var mysql = require('mysql');
var connection

if(process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: 'ctgplw90pifdso61.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'kohosbd37wrn67yo',
        password: 'kpn8qry2czglksv0',
        database: 'sequelize_passport'
    });
};

connection.connect();
module.exports = connection;