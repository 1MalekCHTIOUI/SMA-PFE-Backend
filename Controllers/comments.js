const Comment = require("../Models/Comment");

exports.newComment = async (req, res, next) => {
  const newComment = new Comment(req.body);

  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.likeComment = async (req, res, next) => {
  try {
    await Comment.findByIdAndUpdate(req.params.commentId, {
      $push: { likes: req.body },
    });
    res.status(200).json({ message: "liked" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.unlikeComment = async (req, res, next) => {
  try {
    await Comment.findByIdAndUpdate(req.params.commentId, {
      $pull: { likes: { userId: req.body.userId } },
    });
    res.status(200).json({ message: "unliked" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPostComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({
      postId: req.params.postId,
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
