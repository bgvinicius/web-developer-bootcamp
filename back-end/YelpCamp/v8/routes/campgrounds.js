const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");

router.get("/campgrounds", function(req, res) {
    Campground.find({}, (err, results) => {
        res.render("campgrounds/campgrounds", {campgrounds: results});
    })
});

router.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/newcampground");
});

router.post("/campgrounds", function(req, res) {
    var campgroundName = req.body.campgroundName;
    var campgroundUrl = req.body.campgroundUrl;
    var campgroundDesc = req.body.desc;

    var newCampground = {name: campgroundName, imageUrl: campgroundUrl, description: campgroundDesc};
    Campground.create(newCampground, (err, results) => {
        res.redirect("/campgrounds");
    });

});

router.get("/campgrounds/:id", function(req, res) {
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

module.exports = router;

