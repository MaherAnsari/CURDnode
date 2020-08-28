class User {

    constructor(data) {
       this.username = data.username;
       this.email = data.email;
       this.password = data.password;
       this.mobile = data.mobile;
    }
 
    addUser() {
       return `INSERT INTO users(username, email,password, mobile) \
                    VALUES('${this.username}','${this.email}', '${this.password}', '${this.mobile}')`;
    }
 
    updateUser(id) {
       return `UPDATE users SET username = '${this.username}', email = '${this.email}', password = '${this.password}', mobile = '${this.mobile}' WHERE id = ${id}`;
    }
 
    static getUserById(id) {
       console.log(id);
       return `SELECT * FROM users WHERE id = ${id}`;
    }
 
    static deleteUserById(id) {
       return `DELETE FROM users WHERE id = ${id}`;
    }
 
    static getAllUsers() {
       return `SELECT * FROM users`;
    }

    static getUserByEmail(email) {
        return `SELECT * FROM users WHERE email = '${email}'`;
     }
 }
 
 module.exports = User;