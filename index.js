const express = require("express");
const mongoose = require("mongoose");
const students = require("./routes/students");
const cors = require("cors");
const config = require("config");

// Connect to Mongo DB
const db = config.get("db");

mongoose
  //.connect("mongodb://localhost/classroom", { useNewUrlParser: true })
  .connect("mongodb+srv://abcd1234:abcd1234@cluster0-absuk.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true })
  .then(() => console.log("Connected to Mongo DB: ", db))
  .catch(err => console.log("Could not connect to Mongo DB ", err));

// 1) Create server instance
const app = express();

//express middleware to apply a Access-Control-Allow-Origin: * header to every response from the server.
// I think it should be meant only for development
app.use(cors());

// 2) Add middlewares to server instance
app.use(express.json()); // built-in middleware to parse JSON request payloads to req.body object
// 2.1) Add the Routes here..
app.use("/api/students", students);

// 3) Specify which port Listen for requests
const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));
