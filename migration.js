var mysql = require('mysql');
var migration = require('mysql-migrations');

var connection = mysql.createPool({
   port:process.env.DB_PORT,
   host:process.env.DB_HOST,
   user:process.env.DB_USER,
   password:process.env.DB_PASS,
   database:process.env.MYSQL_DB,
   connectionLimit:10
});

function executeQuery(sql, callback) {
   connection.getConnection((err, connection) => {
      if (err) {
         return callback(err, null);
      } else {
         if (connection) {
            connection.query(sql, function (error, results, fields) {
               connection.release();
               if (error) {
                  return callback(error, null);
               }
               return callback(null, results);
            });
         }
      }
   });
}

function query(sql, callback) {
   executeQuery(sql, function (err, data) {
      if (err) {
         return callback(err);
      }
      callback(null, data);
   });
}

migration.init(connection, __dirname + '/database/migrations');

module.exports = {
   query: query,
   connection: connection
}