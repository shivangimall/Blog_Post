const express = require("express");

const router = express.Router();


const authRoutes = require("./auth.routes");
const blogsRoutes = require("./blogs.routes");
const commentsRoutes = require("./comments.routes");


router.use("/auth", authRoutes);
router.use("/blogs" , blogsRoutes);
router.use("/comments", commentsRoutes);

module.exports = router;