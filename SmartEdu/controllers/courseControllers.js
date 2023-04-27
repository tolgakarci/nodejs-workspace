const User = require('../models/User')
const Course = require('../models/Course')
const Category = require('../models/Category')

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      user: req.session.userID,
    })
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
      .populate('user')
      .populate('category')
    res.status(200).render('course', {
      page_name: 'courses',
      course,
    })
  } catch (err) {
    console.log(err)
  }
}

exports.enrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID)
    await user.courses.push({ _id: req.body.course_id })
    await user.save()
    res.status(200).redirect('/users/dashboard')
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    })
  }
}
