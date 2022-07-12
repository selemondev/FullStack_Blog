const express = require("express")
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getAllBlogs, getMyBlogs, createBlog, updateBlog, singleBlog, deleteBlog } = require("../controllers/blogController");
router.route("/").get(getAllBlogs);
router.route("/myBlogs").get(protect, getMyBlogs);
router.route("/create").post(protect, createBlog);
router.route("/update/:id").put(protect, updateBlog);
router.route("/blog/:id").get(protect, singleBlog);
router.route("/delete/:id").delete(protect, deleteBlog);    

module.exports = router;