var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");
var config = require("./api/config");

var todoController = require("./api/todos.js");

// initialize environment
require("dotenv").config();

console.log(process.env);

var app = express();
var port = process.env.PORT || 3000;

app.use("/assets", express.static(__dirname + "/assets"));
// app.use("/")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.engine("html", require("ejs").renderFile);

app.set("view engine", "ejs");

console.log(config.getConnectionString());

mongoose.connect(config.getConnectionString());

todoController(app);

app.get("/", function (req, res) {
  res.render("index");
});

app.listen(port, function () {
  console.log("App listening on port: " + port);
});
