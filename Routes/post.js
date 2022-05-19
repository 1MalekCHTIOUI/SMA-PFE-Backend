const router = require("express").Router()
const messageController = require("../Controllers/posts")

router.post('/', messageController.newPost)
router.get('/:userId', messageController.getUserPosts)
router.delete('/:postId', messageController.getUserPosts)

module.exports = router