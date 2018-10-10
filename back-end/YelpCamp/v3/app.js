var express = require("express");
var app = express();
var faker = require("faker");
var bodyParser = require("body-parser");
var mongoose =  require("mongoose");
var fillDB = require("./fill_db");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost/yelp_camp");

var Campground = require("./models/campground");

fillDB();

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/campgrounds", function(req, res) {
    Campground.find({}, (err, results) => {
        res.render("campgrounds", {campgrounds: results});
    })
});

app.get("/campgrounds/new", function(req, res) {
    res.render("newcampground");
});

app.post("/campgrounds", function(req, res) {
    var campgroundName = req.body.campgroundName;
    var campgroundUrl = req.body.campgroundUrl;
    var campgroundDesc = req.body.desc;

    var newCampground = {name: campgroundName, imageUrl: campgroundUrl, description: campgroundDesc};
    Campground.create(newCampground, (err, results) => {
        res.redirect("/campgrounds");
    });

});

app.get("/campgrounds/:id", function(req, res) {
    var campgroundId = req.params.id;

    Campground.findById(campgroundId).populate("comments").exec((err, result) => {
        console.log(result);
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            res.render("show", {campground: result});
        }
    })
});

app.listen(3000);