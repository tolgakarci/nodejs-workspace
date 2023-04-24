const Post = require('../models/Post')

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find({})
  res.render('index', {
    posts,
  })
}

exports.getPost = async (req, res) => {
  const id = req.params.id
  const post = await Post.findById(id)
  res.render('post', {
    post,
  })
}

exports.createPost = async (req, res) => {
  await Post.create(req.body)
    .then(() => {
      console.log('Post created.')
    })
    .catch((err) => {
      console.log(err)
    })
  res.redirect('/')
}

exports.updatePost = async (req, res) => {
  const id = req.params.id
  const post = await Post.findById(id)
  post.title = req.body.title
  post.detail = req.body.detail
  post.save()
  res.redirect(`/posts/${id}`)
}

exports.deletePost = async (req, res) => {
  const id = req.params.id
  const post = await Post.findById(id)
  await post.deleteOne()
  res.redirect('/')
}
