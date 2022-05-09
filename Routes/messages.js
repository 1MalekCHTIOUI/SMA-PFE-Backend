const router = require("express").Router()
const messageController = require("../Controllers/messages")

router.post('/', messageController.newMessage)
router.get('/:roomId', messageController.getMessage)
router.get('/lastMessage/:roomId', messageController.getLastMessage)

module.exports = router