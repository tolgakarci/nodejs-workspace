const Photo = require('../models/Photo')
const fs = require('fs')

exports.getAllPhotos = async (req, res) => {
  const page = req.query.page || 1
  const photosPerPage = 3
  const totalPhotos = await Photo.find().countDocuments()
  const photos = await Photo.find({})
    .sort('-dateCreated')
    .skip((page - 1) * photosPerPage)
    .limit(photosPerPage)
  res.render('index', {
    photos: photos,
    current: page,
    pages: Math.ceil(totalPhotos / photosPerPage),
  })
}

exports.getPhoto = async (req, res) => {
  const id = req.params.id
  const photo = await Photo.findById(id)
  res.render('photo', {
    photo,
  })
}

exports.createPhoto = async (req, res) => {
  const uploadDir = 'public/uploads'
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir)
  }

  uploadImage = req.files.image
  uploadPath = __dirname + '/../public/uploads/' + uploadImage.name

  uploadImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadImage.name,
    })
      .then(() => {
        console.log('Item created.')
      })
      .catch((err) => {
        console.log(err)
      })
    res.redirect('/')
  })
}

exports.updatePhoto = async (req, res) => {
  const id = req.params.id
  const photo = await Photo.findById(id)
  photo.title = req.body.title
  photo.description = req.body.description
  photo.save()
  res.redirect(`/photos/${req.params.id}`)
}

exports.deletePhoto = async (req, res) => {
  const id = req.params.id
  const photo = await Photo.findById(id)

  const filePath = __dirname + '/../public' + photo.image
  fs.unlinkSync(filePath)
  await photo.deleteOne()
  res.redirect('/')
}
