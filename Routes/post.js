const router = require("express").Router();
const postController = require("../Controllers/posts");
const commentController = require("../Controllers/comments");

router.post("/", postController.newPost);
router.post("/comment", commentController.newComment);
router.get("/comment/:postId", commentController.getPostComments);
router.get("/", postController.getPosts);
router.delete("/comment/:commentId", commentController.deleteComment);
router.put("/like/:commentId", commentController.likeComment);
router.put("/unlike/:postId", commentController.unlikeComment);
router.get("/:userId", postController.getUserPosts);
router.put("/like/:postId", postController.likePost);
router.put("/unlike/:postId", postController.unlikePost);
router.delete("/:postId", postController.deletePost);

module.exports = router;
