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
        default: "https://res.cloudinary.com/dbhjrooyx/image/upload/v1688552722/connectify/gqbi6xgcvj68nvys6sk3.png",
    },
    profileBanner: {
        type: String,
        default: "https://res.cloudinary.com/dbhjrooyx/image/upload/v1688551150/connectify/txvx1bwgxcpbrcn17a0l.png",
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