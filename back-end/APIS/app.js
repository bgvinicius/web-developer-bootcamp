var express = require("express");
var app = express();

app.set("view engine", "ejs");

var request = require("request");

app.get("/results", function(req, res) {
    var movieName = req.query.movieName;
    console.log(movieName);
    var searchUrl = "http://www.omdbapi.com/?apikey=thewdb&s=" + movieName;
    console.log(searchUrl);

    request(searchUrl, function(error, response, body) {
        var decodedJson = JSON.parse(body);
        res.render("result", {movies: decodedJson.Search});
    });
});

app.get("/", function(req, res) {
    res.render("search");
});

app.listen(3000);