const express = require("express");
const router = express.Router();
const { User, validateUser } = require("../models/userModel");
const bcrypt = require("bcryptjs");
const authMidware=require("../middlewares/authMidware")

router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// ** used for first time user SIGN UP requests **
router.post("/",async (req, res) => {
  // 1) Validate request received
  const result = validateUser(req.body);
  if (result.error) return res.status(400).send("Invalid user information");

  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  // 2) Hashing password before saving in db
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt); // returns hashed password

  // 3) Save/insert new user in db 
  //      if save OK - send JWT taken in response Header, and new user saved in response Body
  //      else send 400 error - (because user already exist)
  newUser = await newUser
    .save()
    .then(() => {
      const token = newUser.generateJWTforUser();
      res
        .header("x-jwt", token)
        .header("access-control-expose-headers", "x-jwt")
        .send(newUser);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send(err.name + " : " + err.message);
    });
});

router.get("/:id",authMidware, async (req, res) => {
  const user = await User.findById(req.params.id).catch(err => {
    res.status(400).send(err.name + " : " + err.message);
    console.log(err);
  });
  if (!user) return res.status(404).send("User does not exist");
  res.send(user);
});

router.put("/:id", authMidware,async (req, res) => {
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
  const compare = await bcrypt.compare(req.body.password, user.password);
  console.log(compare);

  let salt = "";

  if (!compare) {
    salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    console.log(user.password);
  }
  const updatedUser = await user.save().catch(err => {
    console.log(err);
    res.status(500).send(err.name + " : " + err.message);
  });
  res.send(updatedUser);
});

router.delete("/:id",authMidware, async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id).catch(err =>
    res.status(400).send(err.name + " : " + err.message)
  );
  // it returns null if user doesnt exist
  if (!user) res.status(400).send("User does not exist");
  res.send("User deleted: " + user);
});

module.exports = router;
