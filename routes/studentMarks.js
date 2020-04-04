const express = require("express");
const { StudMarks } = require("../models/studentMarksModel");

const router = express.Router();

router.get("/", async (req, res) => {
  console.log(req.query);
  const response = await StudMarks.find(req.query);
  res.send(response);
});

module.exports = router;
