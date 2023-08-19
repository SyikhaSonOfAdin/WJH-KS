const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const loginRouter = require('./Model/login')

const path = require('path');
const { Login } = require('./Model/function');

const loginInstances = new Login() ;
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }));
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname, '')));

app.use(session({
  secret: 'WeldingJoinHistory-KokohSemesta', 
  resave: false,
  saveUninitialized: true
}));

/*
CHECK THE COOKIE EXIST OR NOT,
IF EXIST SET THE SESSION AND IF NOT EXIST REDIRECT TO HOME PAGE
*/
app.use(cookieParser());
app.use(async (req, res, next) => {
  if (req.cookies.username && req.cookies.level) {
    const dataUser = await loginInstances.get_Username(req.cookies.username) ;
    req.session.user = dataUser.username;
    req.session.level = dataUser.level;
  }
  next();
});

// HOME PAGE RUTE :
app.get('/', (req, res) => {
    const user = req.session.user ;
    res.render('home', {
      user
    })
})

// DETAIL PAGE RUTE :
app.get('/detail', (req, res) => {
  const user = req.session.user ;
  if (user) {
    res.render('detail', {
      user
    }) ;
  } else {
    res.redirect('/login')
  }
})

// LOGIN PAGE RUTE :
app.get('/login', (req, res) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) throw err
      res.clearCookie('username');
      res.clearCookie('level');
      res.redirect('/');
    })
  } else {
    res.render('login')
  }
})

app.use('/Model', loginRouter) ;









// NOT FOUND PAGE 
app.use('/', (req, res) => {
    res.status(404).render('notFound') ;
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})