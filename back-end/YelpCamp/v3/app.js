var express = require("express");
var app = express();
var faker = require("faker");
var bodyParser = require("body-parser");
var mongoose =  require("mongoose");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost/yelp_camp");

var campgroundSchema = new mongoose.Schema({
    imageUrl: String,
    name: String,
    description: String
});

var Campground = mongoose.model("campgrounds", campgroundSchema);

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

    Campground.findById(campgroundId, (err, result) => {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            res.render("show", {campground: result});
        }
    });

});

app.listen(3000);