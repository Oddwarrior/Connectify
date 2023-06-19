const router = require("express").Router();
const authController = require("../Controllers/authController");
const commentController = require("../Controllers/commentController");

router.post("/", authController.verify, commentController.addComment);
router.get("/:PostId", commentController.getbyPostId);

module.exports = router;