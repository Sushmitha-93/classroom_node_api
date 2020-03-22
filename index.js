const express = require("express");
const mongoose = require("mongoose");
const students = require("./routes/students");
const users = require("./routes/users");
const tests = require("./routes/tests");
const login = require("./routes/loginAuth");
const cors = require("cors");
const config = require("config");

// Connect to Mongo DB
const db = config.get("db");

mongoose
  //.connect("mongodb://localhost/classroom", { useNewUrlParser: true })
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to Mongo DB: ", db))
  .catch(err => console.log("Could not connect to Mongo DB ", err));

// 1) Create server instance
const app = express();

//express middleware to apply a Access-Control-Allow-Origin: * header to every response from the server.
// I think it should be meant only for development
// Below is needed if you want to access custom headers like x-jwt
app.use(
  cors({
    exposedHeaders: [
      "x-jwt",
      "Content-Type",
      "X-Auth-Token",
      "Origin",
      "Authorization"
    ]
  })
);

// 2) Add middlewares to server instance
app.use(express.json()); // built-in middleware to parse JSON request payloads to req.body object
// 2.1) Add the Routes here..
app.use("/api/students", students);
app.use("/api/users", users);
app.use("/api/login", login);
app.use("/api/tests", tests);

// 3) Specify which port Listen for requests
const port = process.env.PORT || 3000; // because port gets assigned dynamically by hosting service
app.listen(port, () => console.log(`Listening to port ${port}`));
