const express = require("express");
const cors = require("cors");
const connectDB = require("./src/Configs/db");
const userRoute = require('./src/Routes/userRoute')
const PORT = 3000;
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoute);
app.use("/", (req, res) => {
    res.status(200).json("Hello from Shashank")
    // res.send(`${req.method} Route ${req.path} not found !`);
});
app.listen(PORT, () => {
    console.log(`server is running on ${PORT} ✅`);
});