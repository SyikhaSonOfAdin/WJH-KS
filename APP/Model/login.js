const express = require('express');
const { db_Connect } = require('./database-conf');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const connecting = await db_Connect();
        const [rows] = await connecting.query(`SELECT * FROM user WHERE email = '${email}'`);
        
        if (rows.length > 0 && rows[0].password === password) {
            const username = rows[0].username;
            const level = rows[0].level;
            req.session.user = username;

            res.cookie('username', username, {
                maxAge: 604800,
                httpOnly: true
            });
            res.cookie('level', level, {
                maxAge: 604800,
                httpOnly: true
            });
            
            res.status(200).json({
                login: 'success', 
                username
            });
        } else {
            res.json({
                login: 'failed' 
            });
        }
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
