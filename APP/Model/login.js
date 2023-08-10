const express = require('express');
const session = require('express-session');
const { db_Connect } = require('./database-conf');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password, remember } = req.body;

    try {
        const connecting = await db_Connect();
        const [rows] = await connecting.query(`SELECT * FROM login WHERE email = '${email}'`);
        
        if (rows.length > 0 && rows[0].password === password) {
            const username = rows[0].username;
            req.session.user = username; 
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
