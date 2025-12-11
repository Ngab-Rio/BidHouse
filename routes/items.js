const router = require('express').Router()
const { ItemsController } = require('../controllers/items')
const AuthMiddleware = require("../middlewares/verify")

router.post("/", AuthMiddleware.verifyLevel, ItemsController.createItem)
router.delete("/:itemID", AuthMiddleware.verifyLevel, ItemsController.deleteItem)
router.put("/:itemID", AuthMiddleware.verifyLevel, ItemsController.updateItem)
router.put("/:itemID/close", AuthMiddleware.verifyToken, AuthMiddleware.verifyLevel, ItemsController.closeItem);
router.put("/:itemID/activate", AuthMiddleware.verifyToken, AuthMiddleware.verifyLevel, ItemsController.activateItem);

router.get("/active/all", AuthMiddleware.verifyToken, ItemsController.getActivate);
router.get("/", AuthMiddleware.verifyToken, ItemsController.getAllItems)
router.get("/:itemID", AuthMiddleware.verifyToken, ItemsController.getItemByID)

module.exports = router