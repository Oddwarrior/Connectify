const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 15,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        min: 4,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        min: 6,
    },
    fname: {
        type: String,
        max: 50,
    },
    lname: {
        type: String,
        max: 50,
    },
    description: {
        type: String,
        max: 50,
        default: "",
    },
    profilePicture: {
        type: String,
        default: "https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-2048x1949-pq9uiebg.png",
    },
    profileBanner: {
        type: String,
        default: "https://www.gravitasgroup.com.hk/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBKzBiQVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--a75c21e39787f4cd3f6f664b4bc568012b4e691c/__banner-default.jpg",
    },
    followers: {
        type: Array,
        default: [],
    },
    followings: {
        type: Array,
        default: [],
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        required: true,
        default: "user",
    },
    gender: {
        type: String,
        enum: ["male", "female"],
    },
    jwtToken: {
        type: String,
    },
});

module.exports = mongoose.model("User", UserSchema);