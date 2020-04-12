const mongoose = require("mongoose");
const joi = require("@hapi/joi");

// 1)Create mongoose schema
// 2)Create mongoose model

// 3)Validate using Joi

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 25,
  },
  rollno: {
    type: Number,
    required: true,
    min: 1,
    max: 200,
  },
  class: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 3,
  },
  phone: {
    type: String,
    minlength: 10,
    maxlength: 10,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  address: {
    type: String,
    maxlength: 500,
  },
  marksSheet: [
    {
      testId: {
        type: mongoose.SchemaTypes.ObjectId,
      },
      testName: {
        type: String,
      },
      testScores: {
        type: Object,
      },
    },
  ],
});

//studentSchema.index({ rollno: 1, class: 1 }, { unique: true });

// Creating Mongoose object using whcih we can call CRUD functions of Mongoose
const Student = mongoose.model("student", studentSchema);

// Joi validation to validate request body
function validateStudent(student) {
  const schema = joi.object({
    name: joi.string().required().min(2).max(25),
    rollno: joi.number().min(1).max(200).required(),
    class: joi.string().min(2).max(3),
    phone: joi.string().length(10).required(),
    gender: joi.string().required(),
    address: joi.string().max(500),
    marksSheet: joi.array().items(
      joi.object().keys({
        testId: joi.string(),
        testName: joi.string(),
        subName: joi.string(),
        marks: joi.number(),
      })
    ),
  });
  return schema.validate(student);
}

exports.studentSchema = studentSchema;
exports.Student = Student;
exports.validateStudent = validateStudent;
