const express = require('express');
const session = require('express-session');

const app = express()

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'user' && password === 'password') {
        req.session.loggedIn = true;
        res.redirect('/home');
    } else {
        res.redirect('/login'); 
    }
});

app.use(session({
    secret: '0989289310', // Gantilah dengan kunci rahasia Anda
    resave: false,
    saveUninitialized: true
  }));
  
