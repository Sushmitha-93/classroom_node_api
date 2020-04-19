const mongoose = require("mongoose");

const branchSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    require: true,
  },
});

const Branch = mongoose.model("Branch", branchSchema);

exports.Branch = Branch;
