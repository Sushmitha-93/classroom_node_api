const express = require("express");
const { Teacher } = require("../models/teacherModel");

const router = express.Router();

router.get("/", async (req, res) => {
  let teachers = await Teacher.find(req.query);
  res.send(teachers);
});

module.exports = router;
