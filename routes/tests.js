const express = require("express");
const router = express.Router();
const { Test } = require("../models/testModel");

// Takes QUERY parameters like http://localhost:3000/api/tests?class=5a&month=may
router.get("/", async (req, res) => {
  let tests;
  console.log(req.query);
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

router.put("/:id", async (req, res) => {
  console.log(Object.keys(req.body));

  //Find test id
  let test = await Test.findById(req.params.id).catch(err => {
    console.log(err);
    res.status(400).send(err.name + ": " + err.errmsg);
  });
  if (!test) res.status(404).send("Test does not exist");

  //Update Test with whatever property sent in request body keeping the rest same
  const result = await Test.where({ _id: req.params.id })
    .updateOne(req.body)
    .catch(err => {
      console.log(err);
      res.status(400).send(err.name + ": " + err.errmsg);
    });
  console.log(result);
  res.status(200).send("Updated");
});
module.exports = router;
