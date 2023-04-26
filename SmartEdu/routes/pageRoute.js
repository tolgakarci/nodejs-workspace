const express = require('express')
const pageControllers = require('../controllers/pageControllers')
const redirectMiddleware = require('../middlewares/redirectMiddleware')

const router = express.Router()

router.route('/').get(pageControllers.getIndexPage)
router
  .route('/register')
  .get(redirectMiddleware, pageControllers.getRegisterPage)
router.route('/login').get(redirectMiddleware, pageControllers.getLoginPage)
router.route('/about').get(pageControllers.getAboutPage)

module.exports = router
