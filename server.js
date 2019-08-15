//importing routes from Router folder
const todo = require("./routes/todo.route");
const user = require("./routes/user.route");

//Other Configurations and module import
const dbConfig = require("./config/database.config.js");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });
app.use(express.json());
app.use("/api/user", user);
app.use("/api/todo", todo);

// listen for requests
app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
