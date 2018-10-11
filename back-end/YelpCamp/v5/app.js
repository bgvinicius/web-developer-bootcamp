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
var Comment = require("./models/comments");

fillDB();

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/campgrounds", function(req, res) {
    Campground.find({}, (err, results) => {
        res.render("campgrounds/campgrounds", {campgrounds: results});
    })
});

app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/newcampground");
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
            res.render("campgrounds/show", {campground: result});
        }
    })
});

app.get("/campgrounds/:id/comments/new", function(req, res) {
    var campgroundId = req.params.id;

    Campground.findById(campgroundId, (err, result) => {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            res.render("comments/newcomment", {campground: result});
        }
    })
});


app.post("/campgrounds/:id/comments", function(req, res) {
    var campgroundId = req.params.id;

    var commentAuthor = req.body.author;
    var commentText = req.body.text;

    var newComment = {author: commentAuthor, text: commentText};

    Campground.findById(campgroundId, (err, foundCampground) => {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(newComment, (err, createdComment) => {
                if (err) {
                    console.log(err);
                } else {
                    foundCampground.comments.push(createdComment);
                    foundCampground.save();

                    res.redirect("/campgrounds/" + campgroundId);
                }
            });
        }
    })
});

app.listen(3000);