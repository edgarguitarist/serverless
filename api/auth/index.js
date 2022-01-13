const jwt = require("jsonwebtoken")
const Users = require("../models/Users")

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    return res.sendStatus(403)
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    const { _id } = decoded
    Users.findOne({ _id })
      .exec()
      .then((user) => {
        if (!user) {
          return res.sendStatus(403)
        }
        req.user = user
        next()
      })
  })
}

const hasRoles = (roles) => (req, res, next) => {
  if (roles.indexOf(req.user.role) > -1) {
    return   next()
  }
  return res.sendStatus(403)
}

module.exports = {
    isAuthenticated,
    hasRoles
}