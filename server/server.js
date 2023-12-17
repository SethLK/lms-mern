const express = require("express");
const router = require("./routes/auth.js");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(router);

app.get("/", (req, res) => {
    res.send("Hello There");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
