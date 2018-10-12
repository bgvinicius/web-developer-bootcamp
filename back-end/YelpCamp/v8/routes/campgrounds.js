const express = require("express");
const router = express.Router({mergeParams: true});
const Campground = require("../models/campground");

router.get("/", function(req, res) {
    Campground.find({}, (err, results) => {
        res.render("campgrounds/campgrounds", {campgrounds: results});
    })
});

router.get("/new", isLoggedIn, function(req, res) {
    res.render("campgrounds/newcampground");
});

router.post("/", isLoggedIn, function(req, res) {
    var campgroundName = req.body.campgroundName;
    var campgroundUrl = req.body.campgroundUrl;
    var campgroundDesc = req.body.desc;

    var newCampground = 
    {
        name: campgroundName, 
        imageUrl: campgroundUrl, 
        description: campgroundDesc,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    };
    Campground.create(newCampground, (err, results) => {
        res.redirect("/campgrounds");
    });

});

router.get("/:id", function(req, res) {
    var campgroundId = req.params.id;

    Campground.findById(campgroundId).populate("comments").exec((err, result) => {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            res.render("campgrounds/show", {campground: result});
        }
    })
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect("/login");
}

module.exports = router;

