const mongoose = require("mongoose");
const joi = require("@hapi/joi");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 25
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 100
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100
  }
});

const User = mongoose.model("User", userSchema);

// Joi validation for validating request
function validateUser(user) {
  const schema = joi.object({
    username: joi
      .string()
      .required()
      .min(2)
      .max(25),
    email: joi
      .string()
      .email()
      .required()
      .min(5)
      .max(100),
    password: joi
      .string()
      .required()
      .min(5)
      .max(100)
  });

  return schema.validate(user);
}

exports.userSchema = userSchema;
exports.User = User;
exports.validateUser = validateUser;
