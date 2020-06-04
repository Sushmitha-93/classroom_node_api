const express = require("express");
const { Teacher } = require("../models/teacherModel");

const router = express.Router();

router.get("/", async (req, res) => {
  let teachers = await Teacher.find(req.query);
  res.send(teachers);
});

router.delete("/:id", async (req, res) => {
  //check if id exists
  const teacher = await Teacher.findByIdAndDelete(req.params.id).catch(
    (err) => {
      console.log(err);
      res.status(400).send(err.name + ": " + err.errmsg);
    }
  );

  if (!teacher) return res.status(404).send("Teacher does not exist");
  res.send(teacher);
});

router.post("/", async (req, res) => {
  let teacher = new Teacher({
    tid: req.body.tid,
    name: req.body.name,
    branch: req.body.branch,
    designation: req.body.designation,
    gender: req.body.gender,
    phone: req.body.phone,
    address: req.body.address,
    classes: req.body.classes,
  });

  teacher = await teacher
    .save()
    .then(() => {
      console.log("Inserted new Teacher: ", teacher);
      return res.send(teacher);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).send(err);
    });
});

router.put("/:id", async (req, res) => {
  // Check if teacher exist
  console.log(req.params.id);
  let teacher = await Teacher.findById(req.params.id).catch((err) =>
    console.log(err)
  );
  if (!teacher) res.status(404).send("Teacher does not exist");

  // Update teacher
  teacher.name = req.body.name;
  teacher.tid = req.body.tid;
  teacher.phone = req.body.phone;
  teacher.designation = req.body.designation;
  teacher.address = req.body.address;
  teacher.classes = req.body.classes;
  teacher.subject = req.body.subject;
  teacher.branch = req.body.branch;
  teacher.gender = req.body.gender;

  // call save to update above teacher object
  const updatedTeacher = await teacher.save().catch((err) => {
    console.log(err);
    res.status(400).send(err);
  });
  res.send(updatedTeacher);
});

module.exports = router;
