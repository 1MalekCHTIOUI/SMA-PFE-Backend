const router = require("express").Router()
const roomController = require("../Controllers/rooms")

router.post('/', roomController.newRoom)
router.get('/:userId', roomController.getRoomByUserId)

module.exports = router