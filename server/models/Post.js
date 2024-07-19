import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
    },
    picturePath: {
      type: String,
      default: "",
    },
    userPicturePath: String,
    description: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",  
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
export default Post;
