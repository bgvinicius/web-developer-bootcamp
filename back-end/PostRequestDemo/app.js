var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(request, response) {
    response.render("home");
});

var friends = ["Line", "Ze", "Hiago", "Zimzs", "Muniqs"];

app.get("/friends", function(request, response) {
    response.render("friends", {friends: friends});
});

app.post("/addfriend", function(request, response) {
    var newFriend = request.body.name;
    friends.push(newFriend);
    response.redirect("/friends");
});

app.listen(3000);