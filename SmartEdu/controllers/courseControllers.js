const Course = require('../models/Course')

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body)
    res.status(201).json({
      status: 'success',
      course,
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    })
  }
}

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
    res.status(200).render('courses', {
      status: 'success',
      page_name: 'courses',
      courses,
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    })
  }
}

exports.getCourse = async (req, res) => {
  const slug = req.params.slug
  try {
    const course = await Course.findOne({ slug: slug })
    res.status(200).render('course', {
      page_name: 'courses',
      course,
    })
  } catch (err) {
    console.log(err)
  }
}
