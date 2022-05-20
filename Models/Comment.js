const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    attachment: {
      type: Array,
      required: false,
    },
    likes: {
      type: Array,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Comment", commentSchema);
