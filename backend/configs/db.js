const mysql = require('mysql2');

const db = mysql.createConnection({
   host: 'database-2.c9euioys0urj.us-east-1.rds.amazonaws.com',
   port: '3306',
   user: 'admin',
   password: '7008294335',
   database: 'react_node_app'
});

module.exports = db;
