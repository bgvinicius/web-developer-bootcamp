var express = require("express");

var app = express();

app.get("/", function(request, response) {
    response.send("Hello World!!");
});

app.get("/bye", function(request, response) {
    response.send("Bye!!");
});

app.get("/pizza", function(request, response) {
    response.send("NICE REQUEST!! Get /pizza is always good!!!!!!");
});

app.listen(3000, "localhost");