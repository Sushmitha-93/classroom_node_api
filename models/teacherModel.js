const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  tid: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 25,
  },
  branch: {
    type: String,
    maxlength: 100,
  },
  designation: {
    type: String,
    maxlength: 25,
  },
  gender: {
    type: String,
    requiredPaths: true,
  },
  phone: {
    type: String,
    required: true,
    maxlength: 10,
  },
  address: {
    type: String,
    maxlength: 50,
  },
  classes: [
    {
      branch: String,
      sem: Number,
      section: String,
      subName: String,
    },
  ],
});

const Teacher = mongoose.model("teacher", teacherSchema);

exports.Teacher = Teacher;
