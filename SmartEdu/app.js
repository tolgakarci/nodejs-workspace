const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const pageRoute = require('./routes/pageRoute')
const courseRoute = require('./routes/courseRoute')

const app = express()

// connect DB
mongoose
  .connect('mongodb://127.0.0.1:27017/smartedu-db')
  .then(() => console.log('DB connected!'))

// template engine
app.set('view engine', 'ejs')

// middlewares
app.use(express.static('public'))
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// routes
app.use('/', pageRoute)
app.use('/courses', courseRoute)

const port = 3000

app.listen(port, () => {
  console.log(`App started on port ${port}`)
})
