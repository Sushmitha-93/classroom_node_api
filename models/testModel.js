const mongoose = require("mongoose");

const testSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  month: {
    type: String,
    require: true
  },
  subjects: {
    type: Array
  }
});

const Test = mongoose.model("Test", testSchema);

exports.Test = Test;
