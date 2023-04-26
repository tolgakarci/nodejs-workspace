const express = require('express')
const authControllers = require('../controllers/authControllers')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.route('/signup').post(authControllers.createUser)
router.route('/login').post(authControllers.loginUser)
router.route('/logout').get(authControllers.logoutUser)
router.route('/dashboard').get(authMiddleware, authControllers.getDashboardPage)

module.exports = router
