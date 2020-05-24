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

module.exports = router;
