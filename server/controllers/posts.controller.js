import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);

    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
      author: userId,
    });
    await newPost.save();

    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(201).json(posts);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);

    const isLiked = post.likes.get(userId);
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const editPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedData = req.body;

    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    const updatedPost = await Post.findByIdAndUpdate(postId, updatedData, {
      new: true,
    });

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error in editPost:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    const deletedComments = await Post.updateOne(
      { _id: postId },
      { $unset: { comments: "" } }
    );

    if (!deletedComments.ok) {
      console.log("Failed to delete comments for post:", postId);
    }

    res
      .status(200)
      .json({ message: "Post and associated comments deleted successfully" });
  } catch (error) {
    console.error("Error in deletePost:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, comment } = req.body;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newComment = {
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      userPicturePath: user.picturePath,
      comment,
      createdAt: new Date(),
    };

    post.comments.push(newComment);
    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, commentIndex } = req.body;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (commentIndex >= post.comments.length || commentIndex < 0) {
      return res.status(404).json({ message: "Invalid comment index" });
    }

    const comment = post.comments[commentIndex];
    if (comment.userId !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this comment" });
    }

    post.comments.splice(commentIndex, 1);
    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (err) {
    console.error("Error in deleteComment:", err);
    res.status(500).json({ message: err.message });
  }
};
