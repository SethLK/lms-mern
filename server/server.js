const express = require("express");
const router = require("./routes/auth.js");
const Course = require("./routes/course.js");
const Course_2 = require("./routes/courseRoute2.js");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(router,
    Course,
    Course_2);

app.get("/", (req, res) => {
    res.send("Hello There");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
