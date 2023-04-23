const Photo = require('../models/Photo')

exports.getAboutPage = (req, res) => {
  res.render('about')
}

exports.getAddPage = (req, res) => {
  res.render('add')
}

exports.getEditPage = async (req, res) => {
  const id = req.params.id
  const photo = await Photo.findById(id)
  res.render('edit', {
    photo,
  })
}
