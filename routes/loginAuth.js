const express = require("express");
const router = express.Router();

const { validateUser, User } = require("../models/userModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  // validate request
  const result = validateUser(req.body);
  if (result.error) return res.status(400).send("Invalid request body");

  // check if user already exists in db
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User does not exist. Please Sign-Up");

  // validate password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Incorrect Password");

  // Generate JWT and send
  const token = user.generateJWTforUser();
  return res.send(token);
});

module.exports = router;
