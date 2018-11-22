const Comment = require("../models/comments");
const Campground = require("../models/campground");

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    req.flash("error", "Please, log in buddy");
    res.redirect("/login");
}

function checkCommentOwner(req, res, next) {
    var commentId = req.params.commentId;

    if (req.isAuthenticated()) {
        Comment.findById(commentId, (err, comment) => {
            if (err) {
                res.redirect("back");
            } else {
                if (comment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back")
    }
}

function isUserCampgroundOwner(req, res, next) {
    if (req.isAuthenticated()) {
        var campgroundId = req.params.id;
    
        Campground.findById(campgroundId, (err, result) => {
            if (err) {
                res.redirect("back");
            }
            
            if (result.author.id.equals(req.user._id)) {
                console.log(next);
                next();
            } else {
                res.redirect("back");
            }
        });
    } else {
        res.redirect("back");
    }
}

module.exports = {
    isUserCampgroundOwner: isUserCampgroundOwner,
    checkCommentOwner: checkCommentOwner,
    isLoggedIn: isLoggedIn
};