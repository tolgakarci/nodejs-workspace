const bcrypt = require('bcrypt')
const User = require('../models/User')
const Category = require('../models/Category')
const Course = require('../models/Course')
const { validationResult } = require('express-validator')
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(201).redirect('/login')
  } catch (err) {
    const error = validationResult(req)

    for (let i = 0; i < error.array().length; i++) {
      req.flash('error', error.array()[0].msg)
    }
    res.status(400).redirect('/register')
  }
}

exports.loginUser = async (req, res) => {
  const { email, password } = req.body
  await User.findOne({ email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
          if (same) {
            req.flash('success', 'User information is correct')
            req.session.userID = user._id
            res.status(200).redirect('/users/dashboard')
          } else {
            req.flash('error', 'Your password is not correct')
            res.status(400).redirect('/login')
          }
        })
      } else {
        req.flash('error', 'User is not exist!')
        res.status(400).redirect('/login')
      }
    })
    .catch((err) => {
      req.flash('error', 'Request failed!')
      res.status(400).redirect('/login')
    })
}

exports.logoutUser = async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
}

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID }).populate(
    'courses'
  )
  const categories = await Category.find()
  const courses = await Course.find({ user: req.session.userID })
  res.status(200).render('dashboard', {
    page_name: 'dashboard',
    user,
    categories,
    courses,
  })
}
