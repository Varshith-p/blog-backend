const Post = require("../models/Post");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const checkPermissions = require("../utils/checkPermissions");

const createPost = async (req, res) => {
  const { title, category, description } = req.body;
  if (!title || !category || !description) {
    throw new BadRequestError("Provide all the values");
  }
  req.body.user = req.user.userId;
  const post = await Post.create(req.body);
  res.status(StatusCodes.CREATED).json({ post });
};

const deletePost = async (req, res) => {
  const { id: postId } = req.params;
  const post = await Post.findOne({ _id: postId });
  if (!post) {
    throw new NotFoundError(`No post with id: ${postId}`);
  }
  checkPermissions(req.user, post.user);
  await Post.findByIdAndDelete(postId);
  res.status(StatusCodes.OK).json({ msg: "Success! Post removed" });
};

const getAllPosts = async (req, res) => {
  const posts = await Post.find({}).populate("user", ["firstName", "lastName"]);
  const totalPosts = await Post.countDocuments();
  res.status(StatusCodes.OK).json({ posts, totalPosts });
};

const updatePost = async (req, res) => {
  const { id: postId } = req.params;
  const { title, category, description } = req.body;
  if (!title || !category || !description) {
    throw new BadRequestError("Provide all the values");
  }
  const post = await Post.findOne({ _id: postId });
  if (!post) {
    throw new NotFoundError(`No post with id: ${postId}`);
  }
  checkPermissions(req.user, post.user);
  const updatedPost = await Post.findOneAndUpdate({ _id: postId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ updatedPost });
};

module.exports = {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
};
