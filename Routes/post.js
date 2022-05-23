const router = require("express").Router();
const postController = require("../Controllers/posts");
const commentController = require("../Controllers/comments");

router.post("/comment", commentController.newComment);
router.get("/comment/:postId", commentController.getPostComments);
router.delete("/comment/:commentId", commentController.deleteComment);
router.put("/comment/like/:commentId", commentController.likeComment);
router.put("/comment/unlike/:commentId", commentController.unlikeComment);

router.post("/", postController.newPost);
router.get("/", postController.getPosts);
router.get("/:userId", postController.getUserPosts);
router.put("/like/:postId", postController.likePost);
router.put("/unlike/:postId", postController.unlikePost);
router.delete("/:postId", postController.deletePost);

module.exports = router;
