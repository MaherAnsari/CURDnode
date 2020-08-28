module.exports = {
    "up": `CREATE TABLE users (id INT NOT NULL AUTO_INCREMENT,PRIMARY KEY id (id), username VARCHAR (255) NOT NULL, email VARCHAR (255) NOT NULL ,UNIQUE KEY email (email),password VARCHAR (255) NOT NULL, mobile VARCHAR (255) NOT NULL, created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)`,
    "down": "TRUNCATE TABLE  users"
}

module.exports = {
    "up": `CREATE TABLE todolist (id INT NOT NULL AUTO_INCREMENT,PRIMARY KEY id (id), title VARCHAR (255) NOT NULL, desc VARCHAR (255) NOT NULL ,date DATE NOT NULL, priority TINYINT (2) NOT NULL, created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)`,
    "down": "TRUNCATE TABLE  todolist"
}


// node migration.js add migration create_table_users
// node migration.js up