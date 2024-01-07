const User = require("../model/User");
const express = require("express");
const Router = express.Router();

Router.get("/instructor/:id", async (req, res) => {
    const user_id = req.params.id;

    try {
        const user = await User.findById(user_id);
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = Router;