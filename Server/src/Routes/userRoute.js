const router = require("express").Router();
const userController = require('../Controllers/userController');
const authController = require("../Controllers/authController");
const upload = require("../Utils/upload");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/refresh", authController.refresh);
router.get("/searchUser", userController.searchUsers);
router.get("/:id", userController.getUser);
router.get("/u/:username", userController.getUserByUsername);
router.get("/followings/:username", userController.getFollowings);
router.get("/followers/:username", userController.getFollowers);
router.put("/:id", authController.verify, userController.updateUser);
router.put("/profilePicture/:id", authController.verify, upload.single('image'), userController.updateProfilePicture);
router.put(
    "/:username/follow",
    authController.verify,
    userController.followUser
);
router.put(
    "/:username/unfollow",
    authController.verify,
    userController.unfollowUser
);

module.exports = router;