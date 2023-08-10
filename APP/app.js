const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const loginRouter = require('./Model/login')

const path = require('path');
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

app.use(cookieParser());
app.use((req, res, next) => {
  if (req.cookies.username && req.cookies.level) {
    req.session.user = req.cookies.username;
    req.session.level = req.cookies.level;
  }
  next();
});

app.get('/', (req, res) => {
    const user = req.session.user ;
    res.render('home', {
      user
    })
})

app.get('/detail', (req, res) => {
  if (req.session.user) {
    res.send('Detail')
  } else {
    res.redirect('/login')
  }
})

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










app.use('/', (req, res) => {
    res.status(404).render('notFound') ;
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})