const Course = require('../models/Course')
const Category = require('../models/Category')

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body)
    res.status(201).redirect('/courses')
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    })
  }
}

exports.getAllCourses = async (req, res) => {
  try {
    const categorySlug = req.query.categories
    const category = await Category.findOne({ slug: categorySlug })

    let filter = {}

    if (categorySlug) {
      filter = { category: category._id }
    }

    const courses = await Course.find(filter).sort('-createdAt')
    const categories = await Category.find()
    res.status(200).render('courses', {
      status: 'success',
      page_name: 'courses',
      courses,
      categories,
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
