const express = require("express");
const router = express.Router();
const Comment = require("../models/comments");
const Campground = require("../models/campground");

router.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
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


router.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
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

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect("/login");
}


module.exports = router;