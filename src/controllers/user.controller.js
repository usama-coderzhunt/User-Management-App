const User = require("../models/users/user.model.js");
const Post = require("../models/posts/posts.model.js");

const {
  zodCreateNewPostScehma,
} = require("../../utils/Validation Schemas/Schemas.js");
var jwt = require("jsonwebtoken");

module.exports = {
  // create a new user
  async createPost(req, res) {
    try {
      zodCreateNewPostScehma.parse({
        title: req.body.title,
        description: req.body.description,
      });

      const createdBy = await User.findById(req.body.userId);
      const newPost = await Post.create({
        title: req.body.title,
        description: req.body.description,
        createdBy: createdBy?.id,
      });
      res.status(200).json(newPost);
    } catch (error) {
      if (error?.errors?.length) {
        return res.status(500).json({ error: error?.errors[0]?.message });
      } else {
        if (error.message?.length) {
          //empty, undefined, null check
          if (error.message.includes("duplicate key error")) {
            return res.status(409).json({ message: "Post already exists." });
          }
        }

        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  },

  async posts(req, res) {
    try {
      const token =
        req.headers.authorization.split(" ")[1] || req.headers.authorization;
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (decoded.role === "Editor") {
        const posts = await Post.find({ createdBy: decoded.id });
        res.status(200).json({
          posts,
        });
      } else {
        const posts = await Post.find({});
        res.status(200).json({
          posts,
        });
      }
    } catch (error) {
      console.log(">>error", error);
      res.status(500).json({ error: error.message });
    }
  },

  // get post by id
  async getPostById(req, res) {
    try {
      const { id } = req.params;
      const post = await Post.findById(id);
      if (!post) return res.status(401).json({ message: "Post not found." });

      res.status(200).json({
        post,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // edit post
  async updatePost(req, res) {
    try {
      const { id } = req.params;
      const post = await Post.findByIdAndUpdate(id, req.body);
      if (!post) {
        res.status(404).json({ message: "Post not found" });
      }
      const updatedPost = await Post.findById(id);
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // delete post
  async deletePost(req, res) {
    try {
      const { id } = req.params;
      const post = await Post.findByIdAndDelete(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      console.log(">>error", error);
      res.status(500).json({ message: error.message });
    }
  },
};
