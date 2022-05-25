const router = require("express").Router();
const messageController = require("../Controllers/messages");

router.post("/", messageController.newMessage);
router.get("/:roomId", messageController.getMessage);
router.delete("/:messageId", messageController.deleteMessage);
router.get("/lastMessage/:roomId", messageController.getLastMessage);
router.put("/readMessages/:roomId", messageController.readMessages);

module.exports = router;
