const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const { check, validationResult } = require("express-validator");
//@route  Post api/posts
//@desc   create a post
//@access private

router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const newPost = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      const post = await new Post(newPost);
      post.save();
    const posts = await Post.find().sort({ date: -1 });

      res.json(posts);
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({ msg: "Server error" });
    }
  }
);
//@route  Get api/posts
//@desc   get a post
//@access private

router.get("/", auth, async (req, res) => {
  try {
    const post = await Post.find().sort({ date: -1 });
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    console.error(error.message);
    return res.status(400).json({ msg: "Server error" });
  }
});
//@route  Get api/posts/id
//@desc   get a post by id
//@access private

router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).sort({ date: -1 });

    res.json(post);
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ msg: "Server error" });
  }
});
//@route  Delete api/posts/:id
//@desc   delete a post
//@access private

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Posts not found" });
    }
    //Check User
    if (req.user.id !== post.user.toString()) {
      return res.status(401).send("user not authorized");
    }
    await post.deleteOne();
    const posts = await Post.find().sort({ date: -1 });

    res.json(posts);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    console.error(error.message);
    return res.status(400).json({ msg: "Server error" });
  }
});
//@route  Put api/posts/like/id
//@desc   Like a post
//@access private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    //check if the post is already liked
    if (
      post.like.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ errors: [{ msg: "Post has been already liked" }] });
    }

    post.like.unshift({ user: req.user.id });
    await post.save();
    res.json({
      id:req.params.id,
      likes:post.like});
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: "server error" });
  }
});
//@route  put api/posts/unlike/id
//@desc   UNLike a post
//@access private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send({ errors: [{ msg: "Profile not found" }] });
    }
    //check if the post is already liked
    if (
      !(
        post.like.filter((like) => like.user.toString() === req.user.id)
          .length > 0
      )
    ) {
      return res.status(400).json({ errors: [{ msg: "Post has not yet been liked" }] });
    }
    const removeindex = post.like
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.like.splice(removeindex, 1);
    await post.save();
    res.json({
      id:req.params.id,
      likes:post.like});
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "server error" });
  }
});
//@route  Post api/comment/id
//@desc   comment on a post
//@access private
router.post(
  "/comment/:id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id);
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }
      const addcomment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      post.comment.unshift(addcomment);
      await post.save();
      res.json(post);
    } catch (err) {
      console.error(err);
      res.status(400).json({ msg: "server error" });
    }
  }
);
//@route  delete api/posts/comment/id/comment_id
//@desc   UNLike a post
//@access private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const removeindex = post.comment
      .map((comment) => comment._id.toString())
      .indexOf(req.params.comment_id);
    if (removeindex === -1) {
      return res.status(404).json({ msg: "Comment not found" });
    }
    if (post.comment[removeindex].user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorized acces" });
    }
    post.comment.splice(removeindex, 1);
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "server error" });
  }
});
module.exports = router;
