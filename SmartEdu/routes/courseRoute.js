const express = require('express')
const courseControllers = require('../controllers/courseControllers')
const roleMiddleware = require('../middlewares/roleMiddleware')
const router = express.Router()

router
  .route('/')
  .post(roleMiddleware('teacher,admin'), courseControllers.createCourse)
router.route('/').get(courseControllers.getAllCourses)
router.route('/:slug').get(courseControllers.getCourse)
router.route('/enroll').post(courseControllers.enrollCourse)
router.route('/release').post(courseControllers.releaseCourse)

module.exports = router
