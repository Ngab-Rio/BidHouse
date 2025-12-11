const router = require('express').Router()
const { ItemsController } = require('../controllers/items')
const AuthMiddleware = require("../middlewares/verify")

router.get("/", AuthMiddleware.verifyToken, ItemsController.getWinnersAll)
router.get("/:itemID", AuthMiddleware.verifyToken, ItemsController.getWinnerByItemID)

module.exports = router