const express = require("express");
const { Syllabus } = require("../models/syllabusModel");

const router = express.Router();

router.get("/", async (req, res) => {
  let syllabus = await Syllabus.find(req.query);
  res.send(syllabus);
});

module.exports = router;
