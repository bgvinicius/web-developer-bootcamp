var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(request, response) {
    response.render("home");
});

app.get("/love/:name", function(request, response) {
    var name = request.params.name;
    response.render("love", {name: name});
});

app.get("/foods/:favoriteFood", function(request, response) {
    var favoriteFood = request.params.favoriteFood;
    response.render("conditional", {favoriteFood: favoriteFood});
});

app.get("/posts/", function(request, response) {
    var posts = [
        {title: "First", text: "Some Text"}, 
        {title: "Second", text: "Another Text"}, 
        {title: "Third", text: "The last text"}
    ];
    
    response.render("posts", {posts: posts});
});

app.listen(3000);