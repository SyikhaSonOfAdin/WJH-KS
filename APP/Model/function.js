const crypto = require('crypto');
const { db_Connect } = require('./database-conf');

class Login {
    sha256(str) {
        const hash = crypto.createHash('sha256');
        hash.update(str);
        return hash.digest('hex');
    }
    async get_User() {
        const connecting = await db_Connect() ;
        const users = await connecting.query(`SELECT * FROM user`)
        return users[0] ;
    }
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