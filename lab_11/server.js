var express = require("express");
var app = express();
var knockknock = require("knock-knock-jokes");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.send("Hello World! (by express)");
});

app.get("/test", function (req, res) {
  res.send("this is route 2");
});

app.get("/knock", function (req, res) {
  var randomJoke = knockknock();
  res.send(randomJoke);
});

app.get("/add", function (req, res) {
  var x = parseInt(req.query.x);
  var y = parseInt(req.query.y);
  var output = x + y;
  res.send("x + y = " + output);
});

app.get("/calc", function (req, res) {
  var x = parseInt(req.query.x);
  var y = parseInt(req.query.y);
  var operator = req.query.operator;
  var output = "INVALID";

  if (operator == "add") {
    var output = x + y;
  }

  if (operator == "sub") {
    var output = x - y;
  }

  if (operator == "mul") {
    var output = x * y;
  }

  if (operator == "div") {
    var output = x / y;
  }
  res.send("Hey guys what's up: " + output);
});

app.get("/getform", function (req, res) {
  var name = req.query.name;
  var quest = req.query.quest;
  res.send("Hi " + name + " I am sure you will " + quest);
});

app.post("/postform", function (req, res) {
  var name = req.body.name;
  var quest = req.body.quest;
  res.send("Hi " + name + " I am sure you will " + quest);
});

app.get("/user/:userID/books/:bookID", function (req, res) {
  var userID = req.params.userID;
  var bookID = req.params.bookID;
  res.send("AWESOME TEST: " + "User ID: " + userID + " Book ID: " + bookID);
});

app.use(function (req, res) {
  res.send("Yeah you're stupid... 404!!");
});

app.listen(8080);
