const User = require("../model/User.js");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config.js"); // Make sure to replace this with the actual path to your config file

const Router = express.Router();

Router.get("/login", (req, res) => {
  res.send("Login page");
});

Router.get("/signup", (req, res) => {
  res.send("Sign up page");
});

Router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ success: false, message: "Invalid email or password" });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return res.status(401).json({ success: false, message: "Wrong Password" });

    // Create and sign a JWT token
    const accessToken = jwt.sign({ id: user._id, email: user.email }, config.secretKey, { expiresIn: '1h' });

    res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
    });

  } catch (err) {
    console.error("Error at login", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

Router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (err) {
    console.error("Error at registration", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

Router.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = Router;
