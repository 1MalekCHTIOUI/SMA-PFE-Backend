const Post = require("../Models/Post");

exports.newPost = async (req, res, next) => {
  const newPost = new Post(req.body);

  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.likePost = async (req, res, next) => {
  try {
    await Post.findByIdAndUpdate(req.params.postId, {
      $push: { likes: req.body },
    });
    res.status(200).json({ message: "liked" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.unlikePost = async (req, res, next) => {
  try {
    await Post.findByIdAndUpdate(req.params.postId, {
      $pull: { "likes.userId": req.body.userId },
    });
    res.status(200).json({ message: "unliked" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({
      userId: req.params.userId,
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
