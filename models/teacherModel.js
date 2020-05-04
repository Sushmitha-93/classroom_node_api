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
    maxlength: 10,
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
  subjects: [
    {
      subName: {
        type: String,
      },
      classes: [
        {
          branch: String,
          sem: Number,
          section: String,
        },
      ],
    },
  ],
});

const Teacher = mongoose.model("Teacher", teacherSchema);

exports.Teacher = Teacher;
