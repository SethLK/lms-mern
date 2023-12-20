const User = require("../model/User.js");
const { Router } = require("express");

const router = Router();

router.get("/login", (req, res) => {
  res.send("Login page");
});

router.get("/signup", (req, res) => {
  res.send("Sign up page");
});

router.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
