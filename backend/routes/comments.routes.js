const express = require("express");

const router = express.Router();

const commentsController = require("../controllers/comments.controller");
const authController = require("../controllers/auth.controller")


router.get("/getAll/:id",authController.protect, commentsController.getAll);
router.post("/create/:id",authController.protect,  commentsController.create);


module.exports = router;