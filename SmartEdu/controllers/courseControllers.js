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
    req.flash('success', `${course.name} has been created successfully!`)
    res.status(201).redirect('/courses')
  } catch (err) {
    req.flash('error', 'Something happened!')
    res.status(400).redirect('/courses')
  }
}

exports.getAllCourses = async (req, res) => {
  try {
    const categorySlug = req.query.categories

    const query = req.query.search

    const category = await Category.findOne({ slug: categorySlug })

    let filter = {}

    if (categorySlug) {
      filter = { category: category._id }
    }

    if (query) {
      filter = { name: query }
    }

    if (!query && !categorySlug) {
      filter.name = ''
      filter.category = null
    }

    const courses = await Course.find({
      $or: [
        { name: { $regex: '.*' + filter.name + '.*', $options: 'i' } },
        { category: filter.category },
      ],
    })
      .sort('-createdAt')
      .populate('user')
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
  try {
    const user = await User.findOne({ _id: req.session.userID })
    const course = await Course.findOne({ slug: req.params.slug })
      .populate('user')
      .populate('category')
    const categories = await Category.find()
    res.status(200).render('course', {
      page_name: 'courses',
      course,
      user,
      categories,
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

exports.releaseCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID)
    await user.courses.pull({ _id: req.body.course_id })
    await user.save()
    res.status(200).redirect('/users/dashboard')
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    })
  }
}

exports.searchCourse = async (req, res) => {
  try {
    const searchCourse = await Course.find({ name: req.body.search })
    const courses = searchCourse.length ? searchCourse : undefined
    res.status(200).render('courses', {
      page_name: 'courses',
      courses,
    })
  } catch (error) {}
}

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndRemove({ slug: req.params.slug })
    req.flash('error', `${course.name} has been removed successfully!`)
    res.status(200).redirect('/users/dashboard')
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    })
  }
}

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug })
    course.name = req.body.name
    course.description = req.body.description
    course.category = req.body.category
    course.save()

    req.flash('success', `${course.name} has been updated successfully!`)
    res.status(200).redirect('/users/dashboard')
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    })
  }
}
