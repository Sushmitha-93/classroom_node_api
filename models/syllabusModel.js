const mongoose = require("mongoose");

const syllabusSchema = mongoose.Schema({
  branch: {
    type: String,
    required: true,
  },
  sem: {
    type: Number,
    required: true,
  },
  subjects: [
    {
      name: {
        type: String,
        required: true,
      },
      syllabus: {
        type: String,
        required: true,
      },
    },
  ],
});

const Syllabus = mongoose.model("Syllabus", syllabusSchema, "syllabus");

exports.Syllabus = Syllabus;
