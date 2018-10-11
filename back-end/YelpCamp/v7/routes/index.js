const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");

router.get("/", function(req, res) {
    res.render("home");
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", (req, res) => {
    var userName = req.body.username;
    var password = req.body.password;
    
    var newUser = new User({ username: userName });
    User.register(newUser, password, (err, createdUser) => {
        if (err) {
            console.log(err);
            res.render("register");
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/campgrounds");
            });
        }
    });
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), (req, res) => {});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect("/login");
}

module.exports = router;