const express = require('express')
const mongoose = require('mongoose')

const ejs = require('ejs')
const path = require('path')
const Photo = require('./models/Photo')

const app = express()

// connect DB
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// template engine
app.set('view engine', 'ejs')

// middlewares
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// routes
app.get('/', async (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'temp/index.html'))

  const photos = await Photo.find({})
  res.render('index', {
    photos,
  })

  // await Photo.find({})
  //   .exec()
  //   .then((photos) => {
  //     res.render('index', {
  //       photos,
  //     })
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/add', (req, res) => {
  res.render('add')
})

app.post('/photos', async (req, res) => {
  await Photo.create(req.body)
    .then(() => {
      console.log('Item created.')
    })
    .catch((err) => {
      console.log(err)
    })
  res.redirect('/')
})

const port = 3000

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı.`)
})
