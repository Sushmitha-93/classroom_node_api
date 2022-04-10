const mongoose = require("mongoose");
const joi = require("@hapi/joi");

// 1)Create mongoose schema
// 2)Create mongoose model

// 3)Validate function using Joi

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 25,
  },
  branch: {
    type: String,
    required: true,
    maxlength: 50,
  },
  sem: {
    type: Number,
    required: true,
    min: 1,
    max: 8,
  },
  section: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 1,
  },
  USN: {
    type: String,
    required: true,
    maxlength: 10,
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
    branch: joi.string().max(50).required(),
    sem: joi.number().min(1).max(8).required(),
    section: joi.string().min(1).max(1),
    USN: joi.string().max(10).required(),
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
