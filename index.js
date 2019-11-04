const express = require("express");
const mongoose = require("mongoose");
const students = require("./routes/students");

// Connect to Mongo DB
mongoose
  .connect("mongodb://localhost/classroom", { useNewUrlParser: true })
  .then(() => console.log("Connected to Mongo DB"))
  .catch(err => console.log("Could not connect to Mongo DB ", err));

// 1) Create server instance
const app = express();

// 2) Add middlewares to server instance
app.use(express.json()); // built-in middleware to parse JSON request payloads to req.body object
// 2.1) Add the Routes here..
app.use("/api/students", students);

// 3) Specify which port Listen for requests
const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));
