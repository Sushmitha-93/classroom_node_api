const mongoose = require("mongoose");
const joi = require("@hapi/joi");

// 1)Create mongoose schema
// 2)Create mongoose model

// 3)Validate using Joi

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 25
  },
  rollno: {
    type: Number,
    unique: true,
    required: true,
    min: 1,
    max: 100
  },
  class: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 3
  },
  phone: {
    type: String,
    minlength: 10,
    maxlength: 10
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true
  },
  address: {
    type: String,
    maxlength: 100
  }
});

const Student = mongoose.model("student", studentSchema);

// Joi validation to validate request body
function validateStudent(student) {
  const schema = joi.object({
    name: joi
      .string()
      .required()
      .min(4)
      .max(25),
    rollno: joi
      .number()
      .min(1)
      .max(100)
      .required(),
    class: joi
      .string()
      .min(2)
      .max(3),
    phone: joi
      .string()
      .length(10)
      .required(),
    gender: joi.string().required(),
    address: joi.string().max(100)
  });
  return schema.validate(student);
}

exports.studentSchema = studentSchema;
exports.Student = Student;
exports.validateStudent = validateStudent;
