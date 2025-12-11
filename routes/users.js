const router = require('express').Router()
const { UsersController } = require('../controllers/users')

// GET ALL USERS
router.get("/", UsersController.findAll)

// GET USER BY ID
router.get("/:userID", UsersController.findbyID)

// CREATE NEW USER
router.post("/", UsersController.createUser)

// UPDATE USER
router.put("/:userID", UsersController.updateUser)

// DELETE USER
router.delete("/:userID", UsersController.deleteUser)

module.exports = router