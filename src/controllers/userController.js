// src/controllers/userController.js
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Registration
exports.register = async (req, res) => {
  try {
    const { email, password, name, username } = req.body;
    const lowercaseEmail = email.toLowerCase();

    // Check if email already exists
    const existingEmail = await User.findOne({ where: { email: lowercaseEmail } });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Check if name already exists
    const existingName = await User.findOne({ where: { name } });
    if (existingName) {
      return res.status(400).json({ message: "Name already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email: lowercaseEmail,
      password: hashedPassword,
      name,
      username
    });
    res.status(201).json({ message: "User created", userId: user.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const lowercaseusername = username.toLowerCase();
    const user = await User.findOne({ where: { username: lowercaseusername } });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
