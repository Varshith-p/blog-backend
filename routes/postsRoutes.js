const express = require("express");
const {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
  getPost,
} = require("../controllers/postsController");

const router = express.Router();

router.route("/").get(getAllPosts).post(createPost);
router.route("/:id").get(getPost).patch(updatePost).delete(deletePost);

module.exports = router;
