const bcrypt = require('bcrypt')
const User = require('../models/User')
const Category = require('../models/Category')

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(201).redirect('/login')
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    })
  }
}

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email: email })
      .then((user) => {
        bcrypt
          .compare(password, user.password)
          .then(() => {
            req.session.userID = user._id
            res.status(200).redirect('/users/dashboard')
          })
          .catch(() => {})
      })
      .catch((err) => {
        console.log(err)
      })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    })
  }
}

exports.logoutUser = async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
}

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID })
  const categories = await Category.find()
  res.status(200).render('dashboard', {
    page_name: 'dashboard',
    user,
    categories,
  })
}
