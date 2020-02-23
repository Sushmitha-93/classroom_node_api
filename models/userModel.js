const mongoose = require("mongoose");
const joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    //required: true,
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
    maxlength: 1024
  }
});

// this method can be called by any object of User model. which are returned on calling mongoose queries.
userSchema.methods.generateJWTforUser = function() {
  const token = jwt.sign(
    { _id: this._id, username: this.username },
    config.get("JWTSecretKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

// Joi validation for validating request
function validateUser(user) {
  const schema = joi.object({
    username: joi
      .string()
      //.required()
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
      .max(1024)
  });

  return schema.validate(user);
}

exports.userSchema = userSchema;
exports.User = User;
exports.validateUser = validateUser;
