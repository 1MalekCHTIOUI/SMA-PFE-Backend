const router = require("express").Router()
const messageController = require("../Controllers/messages")

router.post('/', messageController.newMessage)
router.get('/:roomId', messageController.getMessage)

module.exports = router