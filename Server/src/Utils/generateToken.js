const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
    return jwt.sign(
        { username: user.username, role: user.role, _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
};
const generateRefreshToken = (user) => {
    return jwt.sign(
        { username: user.username, role: user.role, _id: user._id },
        process.env.JWT_REFRESH_SECRET
    );
};

module.exports = { generateAccessToken, generateRefreshToken };