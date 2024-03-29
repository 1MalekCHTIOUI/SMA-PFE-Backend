const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    role: {
      type: Array,
      required: true,
      default: ["USER"],
    },
    bio: {
      type: String,
    },
    social: {
      type: Object,
      default: {
        github: "",
        linkedin: "",
        facebook: "",
      },
    },
    profilePicture: {
      type: String,
    },
    coverPicture: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
