const router = require("express").Router()
const messageController = require("../Controllers/messages")

router.post('/', messageController.newMessage)
router.get('/:roomId', messageController.getMessage)
router.get('/lastMessage/:roomId', messageController.getLastMessage)
router.post('/unreadMessages/:roomId', messageController.unreadMessages)

module.exports = router