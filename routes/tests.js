const express = require("express");
const router = express.Router();
const { Test } = require("../models/testModel");

router.get("/", async (req, res) => {
  let tests;
  console.log(Object.keys(req.query)); // Gives property names in the object. Here they are query key names - class, month
  tests = await Test.find(req.query);
  res.send(tests);
});

module.exports = router;
