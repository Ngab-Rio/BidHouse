const router = require("express").Router()
const AuthMiddleware = require("../middlewares/verify")
const { BidsController } = require("../controllers/bids")

router.post("/:itemID", AuthMiddleware.verifyToken, BidsController.createBid)

router.get("/:itemID", AuthMiddleware.verifyToken, BidsController.getBidByItem)

router.get("/highest/:itemID", AuthMiddleware.verifyToken, BidsController.getHighestBid)

module.exports = router