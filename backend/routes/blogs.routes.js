const express = require("express");

const router = express.Router();

const blogController = require("../controllers/blogs.controller");
const restrictMiddleware = require("../utils/restrict");
const authController = require("../controllers/auth.controller")


router.get("/getAll", blogController.getAll);
router.post("/create", authController.protect,  restrictMiddleware.restrict('admin'), blogController.create);
router.delete("/delete/:id",authController.protect, restrictMiddleware.restrict('admin'), blogController.delete);
router.patch("/update/:id", authController.protect, restrictMiddleware.restrict('admin'), blogController.update);

module.exports = router;