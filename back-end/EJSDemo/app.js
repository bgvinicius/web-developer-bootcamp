var express = require("express");
var app = express();

app.get("/", function(request, response) {
    response.render("home.ejs");
});

app.get("/love/:name", function(request, response) {
    var name = request.params.name;
    response.render("love.ejs", {name: name});
});

app.listen(3000);