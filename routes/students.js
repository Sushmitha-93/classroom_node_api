const express = require("express");
const router = express.Router(); // remember to export this router
const { Student, validateStudent } = require("../models/studentModel");
const authMidware = require("../middlewares/authMidware");

const _ = require("lodash");

var ObjectId = require("mongodb").ObjectID;

router.get("/", async (req, res) => {
  const students = await Student.find(req.query);
  res.send(students);
});

router.get(
  "/:id",
  /*authMidware,*/ async (req, res) => {
    const student = await Student.findById(req.params.id).catch((err) => {
      console.log(error);
      res.status(400).send(err.name + ": " + err.errmsg);
    });
    if (!student) return res.status(404).send("Student does not exist");
    res.send(student);
  }
);

// New student Bio data
router.post("/", authMidware, async (req, res) => {
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
    address: req.body.address,
  });

  student = await student
    .save()
    .then(() => res.send(student))
    .catch((err) => res.status(400).send(err.name + ": " + err.errmsg)); // Catches duplicate rollno errors
});

router.put("/marksSheet", async (req, res) => {
  let setProperty = {};
  let testScoreProperty = {};
  setProperty["marksSheet.$.testScores." + req.body.subName] = req.body.marks;

  // Update existing document using student _id and testId
  let updateResult = await Student.updateOne(
    {
      _id: ObjectId(req.body.studId),
      "marksSheet.testId": ObjectId(req.body.testId),
    },
    {
      $set: setProperty,
    }
  );
  console.log(updateResult);

  // If not create push as new item to marksSheet item
  if (updateResult.n === 0) {
    testScoreProperty[req.body.subName] = req.body.marks;

    updateResult = await Student.findByIdAndUpdate(req.body.studId, {
      $push: {
        marksSheet: {
          testId: ObjectId(req.body.testId),
          testName: req.body.testName,
          testScores: testScoreProperty,
        },
      },
    });
  }

  res.send(updateResult);
});

router.put("/:id", authMidware, async (req, res) => {
  //validate student
  const result = validateStudent(req.body);
  if (result.error) return res.status(400).send("Invalid Student");

  //check if student exists
  let student = await Student.findById(req.params.id).catch((err) =>
    console.log(err)
  );
  if (!student) res.status(404).send("Student does not exist");

  //update
  student.name = req.body.name;
  if (student.rollno !== req.body.rollno) student.rollno = req.body.rollno;
  student.class = req.body.class;
  student.phone = req.body.phone;
  student.address = req.body.address;
  const updatedStud = await student.save().catch((err) => {
    console.log(err);
    res.status(400).send(err.name + ": " + err.errmsg);
  });
  res.send(updatedStud);
});

router.delete("/:id", authMidware, async (req, res) => {
  //check if id exists
  const student = await Student.findByIdAndDelete(req.params.id).catch(
    (err) => {
      console.log(err);
      res.status(400).send(err.name + ": " + err.errmsg);
    }
  );

  if (!student) return res.status(404).send("Student does not exist");
  res.send(student);
});

module.exports = router;
