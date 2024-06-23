const mysql = require('mysql2');

const db = mysql.createConnection({
   host: 'localhost',
   port: '3306',
   user: 'root',
   password: '12345678',
   database: 'react_node_app'
});

module.exports = db;