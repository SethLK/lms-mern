const express = require("express");
const Auth = require("./routes/auth.js");
const Course = require("./routes/course.js");
const session = require("express-session");
require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
}));

app.use(cors());
app.use(Auth,
    Course);

app.get("/", (req, res) => {
    res.send("Hello There");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
