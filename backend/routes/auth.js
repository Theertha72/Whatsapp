const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { name, phone, password } = req.body;

  const hash = await bcrypt.hash(password, 10);
  const user = new User({ name, phone, password: hash });
  await user.save();

  res.json({ message: "User registered" });
});

router.post("/login", async (req, res) => {
  const { phone, password } = req.body;
  const user = await User.findOne({ phone });

  if (!user) return res.status(400).json("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json("Wrong password");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, user });
});

router.get("/users", async (req, res) => {
  const users = await User.find({}, "name phone");
  res.json(users);
});

module.exports = router;
