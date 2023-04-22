const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const PhotoSchema = new Schema({
  title: String,
  description: String,
})

const Photo = mongoose.model('Photo', PhotoSchema)

const _id = '6444075f6233c11551e7fba1'

//create document
// Photo.create({
//   title: 'Photo Title 2',
//   description: 'Photo Description 2',
// })
//   .then(() => {
//     console.log('Item created.')
//   })
//   .catch((err) => {
//     console.log(err)
//   })

//read document
// Photo.find({ _id })
//   .exec()
//   .then((data) => {
//     console.log(data)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

// delete a document
// Photo.findOneAndDelete({ _id })
//   .exec()
//   .then(() => {
//     console.log('Item deleted.')
//   })
//   .catch((err) => {
//     console.log(err)
//   })
