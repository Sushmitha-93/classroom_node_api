const mongoose = require("mongoose");

const studMarksSchema = mongoose.Schema({
  studId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  },
  testId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  },
  subId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  }
});

const StudMarks = mongoose.model("StudMarks", studMarksSchema, "studMarks"); // specifying collection name in 3rd arg.

exports.StudMarks = StudMarks;
