const express = require("express");
const router = express.Router();
const { Student, validateStudent } = require("../models/studentModel");

router.get("/", async (req, res) => {
  const students = await Student.find();
  res.send(students);
});

router.get("/:id", async (req, res) => {
  const student = await Student.findById(req.params.id).catch(err => {
    console.log(error);
    res.status(400).send(err.name + ": " + err.errmsg);
  });
  if (!student) return res.status(404).send("Student does not exist");
  res.send(student);
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

router.put("/:id", async (req, res) => {
  //validate student
  const result = validateStudent(req.body);
  if (result.error) return res.status(400).send("Invalid Student");

  //check if student exists
  const student = await Student.findById(req.params.id).catch(err =>
    console.log(err)
  );
  if (!student) res.status(404).send("Student does not exist");

  //update
  student.name = req.body.name;
  if (student.rollno !== req.body.rollno) student.rollno = req.body.rollno;
  student.class = req.body.class;
  student.phone = req.body.phone;
  student.address = req.body.address;
  const updatedStud = await student.save().catch(err => {
    console.log(err);
    res.status(400).send(err.name + ": " + err.errmsg);
  });
  res.send(updatedStud);
});

router.delete("/:id", async (req, res) => {
  //check if id exists
  const student = await Student.findByIdAndDelete(req.params.id).catch(err => {
    console.log(err);
    res.status(400).send(err.name + ": " + err.errmsg);
  });

  if (!student) return res.status(404).send("Student does not exist");
  res.send(student);
});
module.exports = router;
