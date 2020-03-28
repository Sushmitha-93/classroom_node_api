const express = require("express");
const router = express.Router();
const { Test } = require("../models/testModel");

router.get("/", async (req, res) => {
  let tests;
  console.log(Object.keys(req.query)); // Gives property names in the object. Here they are query property names - class, month
  tests = await Test.find(req.query);
  res.send(tests);
});

router.post("/", async (req, res) => {
  let test = new Test({
    name: req.body.name,
    class: req.body.class,
    month: req.body.month,
    subjects: req.body.subjects ? req.body.subjects : []
  });

  test = await test
    .save()
    .then(() => res.send(test))
    .catch(err => res.status(400).send(err.name + ": " + err.errmsg)); // Catches insertion errors
});

module.exports = router;
