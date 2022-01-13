const express = require("express")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const Users = require("../models/Users")
const {isAuthenticated} = require("../auth")
const router = express.Router()

const signToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

router.post("/register", (req, res) => {
  const { email, password } = req.body
  crypto.randomBytes(16, (err, salt) => {
    const newSalt = salt.toString("base64")
    crypto.pbkdf2(password, newSalt, 10000, 64, "sha1", (err, key) => {
      const encryptedPassword = key.toString("base64")
      Users.findOne({ email })
        .exec()
        .then((user) => {
          if (user) {
            return res.send("usuario ya existe")
          }
          Users.create({
            email,
            password: encryptedPassword,
            salt: newSalt,
          }).then(() => {
            res.send("usuario creado con éxito")
          })
        })
    })
  })
})

router.post("/login", (req, res) => {
  const { email, password } = req.body
  Users.findOne({ email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.send("usuario y/o contraseña incorrectos")
      }
      crypto.pbkdf2(password, user.salt, 10000, 64, "sha1", (err, key) => {
        const encryptedPassword = key.toString("base64")
        if (encryptedPassword === user.password) {
          const token = signToken(user._id)
          return res.send({ token })
        }
        return res.send("usuario y/o contraseña incorrectos")
      })
    })
})

router.get('/me', isAuthenticated, (req, res) => {
    res.send(req.user)
})

module.exports = router
