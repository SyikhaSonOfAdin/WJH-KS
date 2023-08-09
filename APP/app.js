const express = require('express');
// const session = require('express-session');
const loginRouter = require('./Model/login')

const path = require('path');
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }));
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname, '')));

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/detail', (req, res) => {
  res.send('Detail')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.use('/Model', loginRouter) ;












app.use('/', (req, res) => {
    res.status(404).send('404 Not Found') ;
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})