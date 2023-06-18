const express = require("express");
const cors = require("cors");
const connectDB = require("./src/Configs/db");
const path = require('path');

//routes
const userRoute = require('./src/Routes/userRoute')
const postRoute = require('./src/Routes/postRoute')

const PORT = 3000;
const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/", (req, res) => {
    res.send(`${req.method} Route ${req.path} not found !`);
});

app.listen(PORT, () => {
    console.log(`server is running on ${PORT} ✅`);
});