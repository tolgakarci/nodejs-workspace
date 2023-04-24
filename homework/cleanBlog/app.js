const express = require('express')
const mongoose = require('mongoose')

const ejs = require('ejs')
const app = express()
const methodOverride = require('method-override')

const postControllers = require('./controllers/postControllers')
const pageControllers = require('./controllers/pageControllers')

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
)

const port = 3000

app.get('/', postControllers.getAllPosts)
app.get('/posts/:id', postControllers.getPost)
app.post('/posts', postControllers.createPost)
app.put('/posts/edit/:id', postControllers.updatePost)
app.delete('/posts/delete/:id', postControllers.deletePost)

app.get('/about', pageControllers.getAboutPage)
app.get('/posts/edit/:id', pageControllers.getEditPage)
app.get('/add', pageControllers.getAddPage)

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalıştı.`)
})
