const express = require('express')
const mongoose = require('mongoose')

const ejs = require('ejs')
const app = express()
const Post = require('./models/Post')

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const port = 3000

const blog = { id: 1, title: 'Blog title', description: 'Blog description' }

app.get('/', async (req, res) => {
  const posts = await Post.find({})
  res.render('index', {
    posts,
  })
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/add', (req, res) => {
  res.render('add_post')
})

app.post('/posts', async (req, res) => {
  await Post.create(req.body)
    .then(() => {
      console.log('Post created.')
    })
    .catch((err) => {
      console.log(err)
    })
  res.redirect('/')
})

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalıştı.`)
})
