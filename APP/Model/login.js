// Model/login.js
const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    const { email, password, remember } = req.body;

    if (email === 'syikhasmart@gmail.com' && password === 'syikhaakmal19') {
        res.status(200).json({
            login: 'success', 
        })
    } else {
        res.status(403).json({
            login: 'failed' 
        })
    }
});

module.exports = router;
