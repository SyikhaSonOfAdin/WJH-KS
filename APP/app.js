const express = require('express')
const path = require('path');
const app = express()
const port = 3000

app.set('view engine','ejs')
app.use(express.static(path.join(__dirname, '')));

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/detail', (req, res) => {
  res.send('Detail')
})

app.get('/login', (req, res) => {
  res.send('login')
})

app.use('/', (req, res) => {
    res.send('404')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})