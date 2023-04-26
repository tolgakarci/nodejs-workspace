const User = require('../models/User')

module.exports = (req, res, next) => {
  User.findById(req.session.userID)
    .then((user) => {
      if (!user) {
        res.redirect('/login')
      }
      next()
    })
    .catch((err) => {
      res.redirect('/login')
    })
}
