const bcrypt = require("bcrypt");
const User = require("../Models/userModel");
const { default: mongoose } = require("mongoose");

const updateUser = async (req, res) => {
    if (req.user._id === req.params.id || req.user.role === "admin") {
        // if (req.body.password) {
        //     try {
        //         const salt = await bcrypt.genSalt(10);
        //         req.body.password = await bcrypt.hash(req.body.password, salt);
        //     } catch (e) {
        //         res.status(500).send({
        //             status: "failure",
        //             message: e.message,
        //         });
        //     }
        // }
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { new: true }
            );
            const { jwtToken, password, ...other } = user._doc;
            if (!user) {
                return res.status(400).send({
                    status: "failure",
                    message: "you can't update this account.",
                });
            }
            res.status(200).send({
                status: "success",
                message: "Account has been updated successfully",
                user: other,
            });
        } catch (e) {
            res.status(500).send({
                status: "failure",
                message: "something is wrong !",
            });
        }
    } else {
        return res.status(400).send({
            status: "failure",
            message: "you can't update this account.",
        });
    }
};

const updateProfilePicture = async (req, res) => {
    try {
        if (req.user._id === req.params.id || req.user.role === "admin") {
            const image = res.req.file.filename;
            const type = req.body.type;
            if (!type) throw new Error("Type not provided");
            const user = type === "profilePicture" ? await User.findOneAndUpdate(
                { _id: req.params.id },
                { $set: { profilePicture: image } },
                { new: true }
            ) : await User.findOneAndUpdate(
                { _id: req.params.id },
                { $set: { profileBanner: image } },
                { new: true }
            )
            const { profilePicture, profileBanner, ...other } = user._doc;
            res.status(200).send({
                "status": "success",
                "message": "Profile image uploaded successfully ",
                "data": { profilePicture, profileBanner }
            })
        }

    } catch (err) {
        res.status(500).send({
            "status": "failure",
            "message": err.message
        })
    }
}

const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({ _id: id });
        if (!user) {
            throw new Error("user does not exist");
        }
        const { password, jwtToken, __v, role, ...otherInfo } = user._doc;
        res.status(200).send({
            status: "success",
            message: "user info",
            user: otherInfo,
        });
    } catch (e) {
        res.status(500).send({
            status: "failure",
            message: e.message,
        });
    }
};
const getUserByUsername = async (req, res) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ username: username });
        if (!user) {
            throw new Error("user does not exist");
        }
        const { password, jwtToken, __v, role, ...otherInfo } = user._doc;
        res.status(200).send({
            status: "success",
            message: "user info",
            user: otherInfo,
        });
    } catch (e) {
        res.status(500).send({
            status: "failure",
            message: e.message,
        });
    }
};
const getFollowings = async (req, res) => {
    try {
        const username = req.params.username;
        const userfollowings = await User.findOne({ username: username });
        if (!userfollowings) {
            throw new Error("user does not exist");
        }
        const followings = await Promise.all(
            userfollowings.followings.map((following) => {
                return User.findById(following, {
                    username: true,
                    profilePicture: true,
                });
            })
        );
        res.status(200).send({
            status: "success",
            message: "user info",
            followings: followings,
        });
    } catch (e) {
        res.status(500).send({
            status: "failure",
            message: e.message,
        });
    }
};
const getFollowers = async (req, res) => {
    try {
        const username = req.params.username;
        const userfollowers = await User.findOne({ username: username });
        if (!userfollowers) {
            throw new Error("user does not exist");
        }
        const followers = await Promise.all(
            userfollowers.followers.map((follower) => {
                return User.findById(follower, {
                    username: true,
                    profilePicture: true,
                });
            })
        );
        res.status(200).send({
            status: "success",
            message: "user info",
            data: {
                followings: followers,
            },
        });
    } catch (e) {
        res.status(500).send({
            status: "failure",
            message: e.message,
        });
    }
};

const suggest = async (req, res) => {
    try {

        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const followingIds = user.followings;

        // Find users who are not in the following list
        const suggestedUsers = await User.find({
            _id: { $nin: [userId, ...followingIds] }
        }).sort({ followers: -1 })

        res.status(200).send({ status: "success", users: suggestedUsers });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "failure", message: 'Failed to fetch suggested users' });
    }
}

const followUser = async (req, res) => {
    try {
        const currentUser = await User.findById({ _id: req.user._id });
        if (currentUser.username !== req.params.username) {
            const usertofollow = await User.findOne({
                username: req.params.username,
            });
            if (!usertofollow) {
                throw new Error("user does not exist");
            }
            if (!currentUser.followings.includes(usertofollow._id)) {
                await currentUser.updateOne({
                    $push: { followings: usertofollow._id },
                });
                await usertofollow.updateOne({
                    $push: { followers: currentUser._id },
                });
                res.status(200).send({
                    status: "success",
                    message: "user has been followed",
                });
            } else {
                res.status(400).send({
                    status: "success",
                    message: "you already follow this user",
                });
            }
        } else {
            throw new Error("you can't follow yourself");
        }
    } catch (e) {
        res.status(500).send({
            status: "failure",
            message: e.message,
        });
    }
};
const unfollowUser = async (req, res) => {
    try {
        const currentUser = await User.findById({ _id: req.user._id });
        if (currentUser.username !== req.params.username) {
            const usertounfollow = await User.findOne({
                username: req.params.username,
            });
            if (!usertounfollow) {
                throw new Error("user does not exist");
            }
            if (currentUser.followings.includes(usertounfollow._id)) {
                await currentUser.updateOne({
                    $pull: { followings: usertounfollow._id },
                });
                await usertounfollow.updateOne({
                    $pull: { followers: currentUser._id },
                });
                res.status(200).send({
                    status: "success",
                    message: "user has been unfollowed",
                });
            } else {
                res.status(400).send({
                    status: "success",
                    message: "you don't follow this user",
                });
            }
        } else {
            throw new Error("you can't unfollow yourself");
        }
    } catch (e) {
        res.status(500).send({
            status: "failure",
            message: e.message,
        });
    }
};
const searchUsers = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";
        const users = await User.find({
            username: { $regex: search, $options: "i" },
        })
            .select("_id username fname lname profilePicture")
            .limit(limit);
        const totalUsers = users.length;
        res.status(200).send({
            status: "success",
            totalUsers: totalUsers,
            limit: limit,
            users: users,
        });
    } catch (e) {
        res.status(500).send({
            status: "failure",
            message: e.message,
        });
    }
};
module.exports = {
    updateUser,
    updateProfilePicture,
    getUser,
    getFollowings,
    getFollowers,
    suggest,
    followUser,
    unfollowUser,
    searchUsers,
    getUserByUsername,
};