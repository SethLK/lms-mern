const express = require("express");
const Auth = require("./routes/auth.js");
const Course = require("./routes/course.js");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())
app.use(cors());
app.use(Auth,
    Course);

app.get("/", (req, res) => {
    res.send("Hello There");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
