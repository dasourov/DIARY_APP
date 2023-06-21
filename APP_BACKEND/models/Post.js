const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },

    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    collection: "posts",
    timestamps: true,
  }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
