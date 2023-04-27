const express = require('express')
const authControllers = require('../controllers/authControllers')
const authMiddleware = require('../middlewares/authMiddleware')
const { body } = require('express-validator')
const User = require('../models/User')

const router = express.Router()

router.route('/signup').post(
  [
    body('name').not().isEmpty().withMessage('Please enter your name'),
    body('email')
      .isEmail()
      .withMessage('Please enter valid email')
      .custom((userEmail) => {
        return User.findOne({ email: userEmail }).then((user) => {
          console.log(userEmail)
          if (user) {
            return Promise.reject('Email is already exists!')
          }
        })
      }),
    body('password').not().isEmpty().withMessage('Please enter a password'),
  ],
  authControllers.createUser
)
router
  .route('/login')
  .post(
    [
      body('email').isEmail().withMessage('Please enter valid email'),
      body('password').not().isEmpty().withMessage('Please enter a password'),
    ],
    authControllers.loginUser
  )
router.route('/logout').get(authControllers.logoutUser)
router.route('/dashboard').get(authMiddleware, authControllers.getDashboardPage)

module.exports = router
