const express = require("express");
const {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
} = require("../controllers/postsController");

const router = express.Router();

router.route("/").get(getAllPosts).post(createPost);
router.route("/:id").patch(updatePost).delete(deletePost);

module.exports = router;
