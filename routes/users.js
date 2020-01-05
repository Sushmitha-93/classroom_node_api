const express = require("express");
const router = express.Router();
const { User, validateUser } = require("../models/userModel");

router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.post("/", async (req, res) => {
  const result = validateUser(req.body);
  if (result.error) return res.status(400).send("Invalid user information");

  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  newUser = await newUser
    .save()
    .then(() => res.send(newUser))
    .catch(err => res.status(400).send(err.name + " : " + err.message));
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).catch(err => {
    res.status(400).send(err.name + " : " + err.message);
    console.log(err);
  });
  if (!user) return res.status(404).send("User does not exist");
  res.send(user);
});

router.put("/:id", async (req, res) => {
  // Validate user request
  const result = validateUser(req.body);
  if (result.error) return res.status(400).send("Invalid request body");

  // if user exist
  let user = await User.findById(req.params.id).catch(err =>
    res.status(400).send(err.name + " : " + err.message)
  );
  if (!user) return res.status(400).send("User does not exist");

  // Update user in db
  user.username = req.body.username;
  if (user.email != req.body.email) user.email = req.body.email;
  user.password = req.body.password;

  const updatedUser = await user.save().catch(err => {
    console.log(err);
    res.status(500).send(err.name + " : " + err.message);
  });
  res.send(updatedUser);
});

router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id).catch(err =>
    res.status(400).send(err.name + " : " + err.message)
  );
  // it returns null if user doesnt exist
  if (!user) res.status(400).send("User does not exist");
  res.send("User deleted: " + user);
});

module.exports = router;
