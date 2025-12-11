const router = require('express').Router()
const { AuthController } = require('../controllers/auth')

// REGIST USER
router.post("/register", AuthController.registerUser)

// LOGIN
router.post("/login", AuthController.loginUser)

module.exports = router