const mongoose = require("mongoose");
require('dotenv').config();

const URI = process.env.MONGO_URL;

const connectDB = async () => {
    try {
        const con = await mongoose.connect(URI);
        console.log("Connected to Database ✅");
    } catch (e) {
        console.log(e);
        console.log(`Authentication to database failed ❗`);
        process.exit(1);
    }
};

module.exports = connectDB;