const express = require("express");
const requireAuth = require("../middleware/auth");

const {
  getAllPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
} = require("../controllers/postControllers");

const router = express.Router();

router.use(requireAuth);

router.get("/", getAllPosts);
router.get("/:id", getPost);
router.post("/", createPost);
router.delete("/:id", deletePost);
router.patch("/:id", updatePost);

module.exports = router;
