const router = require("express").Router();
const postController = require("../Controllers/postController");
const authController = require("../Controllers/authController");
const upload = require("../Utils/upload")

router.post("/", authController.verify, postController.createPosts);
router.put("/:id", authController.verify, postController.updatePosts);
router.delete("/:id", authController.verify, postController.deletePosts);
router.get("/timeline", authController.verify, postController.getTimeline);
router.get("/u/:username", postController.getPostssUser);
router.get("/:id", postController.getPosts);
router.get("/:id/like", authController.verify, postController.likeUnlike);

module.exports = router;