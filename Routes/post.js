const router = require("express").Router();
const postController = require("../Controllers/posts");

router.post("/", postController.newPost);
router.get("/:userId", postController.getUserPosts);
router.put("/like/:postId", postController.likePost);
router.put("/unlike/:postId", postController.unlikePost);
router.delete("/:postId", postController.deletePost);

module.exports = router;
