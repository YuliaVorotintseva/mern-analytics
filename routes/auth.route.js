const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const config = require('../config/default.json')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const router = Router()

router.post(
  '/register', [
  check('email', 'Incorrect email').isEmail(),
  check('password', 'Minimum length of password is 8 symbols').isLength({ min: 8 })
], async (request, response) => {
  try {
    const errors = validationResult(request)
    if (!errors.isEmpty()) return response.status(400).json({
      errors: errors.array(),
      message: "Incorrect registration data"
    })

    const { email, password } = request.body
    const candidate = await User.findOne({ email })

    if (candidate) return response.status(400).json({ message: "This email is already in use" })

    const hashedPass = await bcrypt.hash(password, 12)
    const user = new User({ email, password: hashedPass })
    await user.save()

    response.status(201).json({ message: "User successfully created" })
  } catch (error) {
    response.status(500).json({ message: "Anything is wrong, try later" })
  }
})

router.post(
  '/login', [
  check('email', 'Non-existent email').normalizeEmail().isEmail(),
  check('password', 'Incorrect password').exists()
], async (request, response) => {
  try {
    const errors = validationResult(request)
    if (!errors.isEmpty()) return response.status(400).json({
      errors: errors.array(),
      message: "Incorrect registration data"
    })

    const { email, password } = request.body
    const user = await User.findOne({ email })
    if (!user) return response.status(400).json({ message: "Non-existent user" })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return response.status(400).json({ message: "Incorrect password, try again" })

    const token = jwt.sign(
      { userId: user.id },
      config.get('jwtSecret'),
      { expiresIn: '1h' }
    )

    response.json({ token, userId: user.id })
  } catch (error) {
    response.status(500).json({ message: "Anything is wrong, try later" })
  }
})

module.exports = router
