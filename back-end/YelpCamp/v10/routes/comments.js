const express = require("express");
const router = express.Router({mergeParams: true});
const Comment = require("../models/comments");
const Campground = require("../models/campground");
const Middlewares = require("../middleware");

router.get("/new", Middlewares.isLoggedIn, function(req, res) {
    var campgroundId = req.params.id;

    Campground.findById(campgroundId, (err, result) => {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            res.render("comments/newcomment", {campground: result});
        }
    });
});


router.post("/", Middlewares.isLoggedIn, function(req, res) {
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
                    createdComment.author.username = req.user.username;
                    createdComment.author.id = req.user._id;
                    createdComment.save();
                    foundCampground.comments.push(createdComment);
                    foundCampground.save();

                    res.redirect("/campgrounds/" + campgroundId);
                }
            });
        }
    });
});

router.get("/:commentId/edit", Middlewares.checkCommentOwner, function(req, res) {
    var campgroundId = req.params.id;
    var commentId = req.params.commentId;
    
    Campground.findById(campgroundId, (err, foundCampground) => {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            Comment.findById(commentId, (err, comment) => {
                if (err) {
                    res.redirect("back");
                } else {
                    res.render("comments/edit", {comment: comment, campground: foundCampground});
                }
            });
        }
    });
});

router.put("/:commentId", Middlewares.checkCommentOwner, (req, res) => {
    var commentId = req.params.commentId;
    var campgroundId = req.params.id;
    var updatedText = req.body.text;

    console.log("campground id: " + campgroundId);

    Comment.findByIdAndUpdate(commentId, {text: updatedText}, (err, comment) => {
        if (err) {
            res.redirect("/campgrounds/" + campgroundId);
        } else {
            res.redirect("/campgrounds/" + campgroundId);
        }
    });
});

router.delete("/:commentId", Middlewares.checkCommentOwner, (req, res) => {
    var commentId = req.params.commentId;
    var campgroundId = req.params.id;

    Comment.findByIdAndRemove(commentId, (err, comment) => {
        if (err) {
            res.redirect("/campgrounds/" + campgroundId);
        } else {
            res.redirect("/campgrounds/" + campgroundId);
        }
    });
});

module.exports = router;