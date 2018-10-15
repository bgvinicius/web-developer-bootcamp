const express = require("express");
const router = express.Router({mergeParams: true});
const Campground = require("../models/campground");
const Middlewares = require("../middleware");

router.get("/", function(req, res) {
    Campground.find({}, (err, results) => {
        res.render("campgrounds/campgrounds", {campgrounds: results});
    })
});

router.get("/new", Middlewares.isLoggedIn, function(req, res) {
    res.render("campgrounds/newcampground");
});

router.post("/", Middlewares.isLoggedIn, function(req, res) {
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

router.get("/:id/edit", Middlewares.isUserCampgroundOwner, function(req, res) {
    var campgroundId = req.params.id;
    
    Campground.findById(campgroundId, (err, result) => {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            res.render("campgrounds/edit", {campground: result});
        }
    });
});

router.put("/:id", Middlewares.isUserCampgroundOwner, function(req, res) {
    var campgroundId = req.params.id;

    var campgroundName = req.body.campgroundName;
    var campgroundUrl = req.body.campgroundUrl;
    var campgroundDesc = req.body.desc;

    var updatedCampground = 
    {
        name: campgroundName, 
        imageUrl: campgroundUrl, 
        description: campgroundDesc
    };
    
    Campground.findByIdAndUpdate(campgroundId, updatedCampground, (err, result) => {
        if (err) {
            console.log("==========ERRROR=============");
            console.log(err);
            res.redirect("/");
        } else {
            res.redirect("/campgrounds/" + campgroundId);
        }
    });
});

router.delete("/:id", Middlewares.isUserCampgroundOwner, (req, res) => {
    var campgroundId = req.params.id;

    Campground.findByIdAndDelete(campgroundId, (err, result)  => {
        res.redirect("/campgrounds");
    });
});

module.exports = router;

