const bcrypt = require("bcrypt");
const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const generateToken = require("../Utils/generateToken");

const signup = async (req, res) => {
    try {
        const data = req.body;
        const { username, password, email, fname, lname } = data;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const existingUser = await User.findOne({ username: username });
        if (existingUser) return res.status(400).send({
            status: "failure",
            message: "username alredy exists"
        });

        const createduser = new User({
            username: username,
            password: hashedPassword,
            email: email,
            fname: fname,
            lname: lname
        });
        const saveuser = await createduser.save();
        res.status(200).send({
            status: "success",
            message: "user saved successfully",
            data: {
                user: username,
            },
        });
    } catch (e) {
        res.status(500).send({
            status: "failure",
            message: e.message,
        });
    }
};
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(401).send({
                status: "failure",
                message: "user does not exist",
            });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).send({
                status: "failure",
                message: "incorrect username or passowrd",
            });
        }
        const accessToken = generateToken.generateAccessToken(user);
        const refreshToken = generateToken.generateRefreshToken(user);
        await User.findByIdAndUpdate(user._id, {
            jwtToken: refreshToken,
        });
        const { jwtToken, password: newpass, ...other } = user._doc;
        res.status(200).send({
            status: "success",
            message: "logged in successfully",
            data: other,
            accessToken,
            refreshToken,
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            status: "failure",
            message: e.message,
        });
    }
};
const logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (refreshToken) {
            await User.updateOne({ jwtToken: refreshToken }, [
                { $unset: ["jwtToken"] },
            ]);
            res.status(200).send({
                status: "success",
                message: "You've been logged out",
            });
        } else {
            return res.status(400).send({
                status: "failure",
                message: "logout error",
            });
        }
    } catch (e) {
        res.status(500).send({
            status: "failure",
            message: e.message,
        });
    }
};

const verify = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(403).json("You are not authorized");
    }
    try {
        const token = authHeader.split(" ")[1];
        if (authHeader) {
            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if (err) {
                    console.log(err.message);
                    throw new Error("token is not valid!");
                }
                req.user = user;
                next();
            });
        }
    } catch (e) {
        res.status(500).send({
            status: "failure",
            message: e.message,
        });
    }
};

const refresh = async (req, res) => {
    try {
        const refreshToken = req.body.token;
        if (!refreshToken) {
            return res.status(401).send({
                status: "failure",
                message: "You are not authenticated!",
            });
        }

        const token = await User.findOne(
            { jwtToken: refreshToken },
            { jwtToken: true }
        );
        if (!token) {
            return res.status(200).send({
                status: "failure",
                message: "Refresh token is not valid!",
            });
        }
        jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET,
            async (err, user) => {
                if (err) {
                    throw new Error("token is not valid!");
                }
                const newAccessToken = generateToken.generateAccessToken(user);
                const newRefreshToken = generateToken.generateRefreshToken(user);
                await User.updateOne(
                    { jwtToken: refreshToken },
                    { $set: { jwtToken: newRefreshToken } }
                );
                res.status(200).json({
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken,
                });
            }
        );
    } catch (e) {
        res.status(500).send({
            status: "failure",
            message: e.message,
        });
    }
};

module.exports = {
    signup,
    login,
    logout,
    verify,
    refresh,
};