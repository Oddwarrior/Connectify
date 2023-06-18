const Posts = require("../Models/postModel");
const User = require("../Models/userModel");
const Comment = require("../Models/commentModel");

const createPosts = async (req, res) => {
    req.body.user = req.user._id;

    req.body.image = res.req?.file?.filename;
    const newPosts = new Posts(req.body);
    try {
        await newPosts.save();
        res.status(200).send({
            status: "success",
            message: "post has been created",
            data: { "image": res.req?.file?.filename, "desc": req.desc }
        });
    } catch (e) {
        res.status(500).send({
            status: "failure",
            message: e.message,
        });
    }
};
const updatePosts = async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (req.user._id === post.user.toString()) {
            await Posts.updateOne({ $set: req.body });
            res.status(200).send({
                status: "success",
                message: "post has been updated",
            });
        } else {
            res.status(401).send({
                status: "failure",
                message: "you are not authorized",
            });
        }
    } catch (e) {
        res.status(500).send({
            status: "failure",
            message: e.message,
        });
    }
};
const deletePosts = async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (req.user._id === post.user.toString() || req.user.role === "admin") {
            await Comment.deleteMany({ user: req.user._id });
            await Posts.findByIdAndDelete(req.params.id);
            res.status(200).send({
                status: "success",
                message: "post has been deleted",
            });
        } else {
            res.status(401).send({
                status: "failure",
                message: "you are not authorized",
            });
        }
    } catch (e) {
        res.status(500).send({
            status: "failure",
            message: e.message,
        });
    }
};
const getTimeline = async (req, res) => {
    try {
        const userid = req.user._id;
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 1;
        const user = await User.findById(userid).select("followings");
        const myPostss = await Posts.find({ user: userid })
            .skip(page * limit)
            .limit(limit)
            .sort({ createdAt: "desc" })
            .populate("user", "username profilePicture");
        const followingsPostss = await Promise.all(
            user.followings.map((followingId) => {
                return Posts.find({
                    user: followingId,
                    createdAt: {
                        $gte: new Date(new Date().getTime() - 86400000).toISOString(),
                    },
                })
                    .skip(page * limit)
                    .limit(limit)
                    .sort({ createdAt: "desc" })
                    .populate("user", "username profilePicture");
            })
        );
        arr = myPostss.concat(...followingsPostss);
        res.status(200).send({
            status: "success",
            Postss: arr,
            limit: arr.length,
        });
    } catch (e) {
        res.status(500).send({
            status: "failure",
            message: e.message,
        });
    }
};
const getPostssUser = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        const posts = await Posts.find({ user: user._id });
        res.status(200).json(posts);
    } catch (e) {
        res.status(500).send({
            status: "failure",
            message: e.message,
        });
    }
};
const getPosts = async (req, res) => {
    try {
        const post = await Posts.findOne({ _id: req.params.id }).populate(
            "comment"
        );
        res.status(200).json(post);
    } catch (e) {
        res.status(500).send({
            status: "failure",
            message: e.message,
        });
    }
};
const likeUnlike = async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (!post.likes.includes(req.user._id)) {
            await post.updateOne({ $push: { likes: req.user._id } });
            res.status(200).send({
                status: "success",
                message: "the post has been liked",
            });
        } else {
            await post.updateOne({ $pull: { likes: req.user._id } });
            res.status(200).send({
                status: "success",
                message: "the post has been disliked",
            });
        }
    } catch (error) {
        res.status(500).send({
            status: "failure",
            message: e.message,
        });
    }
};
module.exports = {
    createPosts,
    updatePosts,
    deletePosts,
    getTimeline,
    getPostssUser,
    getPosts,
    likeUnlike,
};