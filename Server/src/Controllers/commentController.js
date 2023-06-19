const Comment = require("../Models/commentModel");
const Post = require("../Models/postModel");

const addComment = async (req, res) => {
    try {
        const { postId, ...comment } = req.body;
        comment.user = req.user._id;
        const commenttosave = new Comment(comment);
        const savedcomment = await commenttosave.save();
        await Post.findOneAndUpdate(
            { _id: postId },
            { $push: { comment: savedcomment._id } }
        );
        res.status(200).send({
            status: "success",
            message: "Comment has been created",
        });
    } catch (e) {
        res.status(500).send({
            status: "failure",
            message: e.message,
        });
    }
};
const getbyPostId = async (req, res) => {
    const PostId = req.params.PostId;
    try {
        const post = await Post.findOne({ _id: PostId }).populate(
            "comment"
        );
        res.status(200).send({
            status: "success",
            comments: post.comment,
        });
    } catch (error) {
        res.status(500).send({
            status: "failure",
            message: e.message,
        });
    }
};

module.exports = { addComment, getbyPostId };