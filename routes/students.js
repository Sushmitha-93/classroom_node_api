const express = require("express");
const router = express.Router();
const { Student, validateStudent } = require("../models/studentModel");

router.get("/", async (req, res) => {
  const students = await Student.find();
  res.send(students);
});

router.post("/", async (req, res) => {
  // validate request body
  // check if student roll id exists.. NOT NEEDED because unique property in mongoose schema gives error.
  // save in database

  const result = validateStudent(req.body);
  if (result.error) return res.status(400).send("Invalid Student");

  let student = new Student({
    name: req.body.name,
    rollno: req.body.rollno,
    class: req.body.class,
    phone: req.body.phone,
    gender: req.body.gender,
    address: req.body.address
  });

  student = await student
    .save()
    .then(() => res.send(student))
    .catch(err => res.status(400).send(err.name + ": " + err.errmsg)); // Catches duplicate rollno errors
});

module.exports = router;
