const crypto = require('crypto');
const { db_Connect } = require('./database-conf');

class Login {
    // Make cookies data hashed
    sha256(str) {
        const hash = crypto.createHash('sha256');
        hash.update(str);
        return hash.digest('hex');
    }
    // Get list of users from database
    async get_User() {
        const connecting = await db_Connect() ;
        const users = await connecting.query(`SELECT * FROM user`)
        return users[0] ;
    }
    // Validate hashed user data from cookies with list of users from db
    // , if match then return user data
    async get_Username(username) {
        const data = await this.get_User() ;
        const user = username ;
        for (let i = 0 ; i < data.length ; i++) {
            if (this.sha256(data[i].username) === user) {
                return data[i];
            }
        }
    }
}




module.exports = {
    Login
}