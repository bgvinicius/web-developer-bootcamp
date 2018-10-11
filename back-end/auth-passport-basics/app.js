const express = require("express"),
    app = express(),
    expressSession = require("express-session"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("./models/user");

app.use(express.static("./public"));
app.set("view engine", "ejs");

// body parser
app.use(bodyParser.urlencoded({extended: true}));

// passport configs
app.use(expressSession({
    secret: "Ducks duckyyy bla bla bla",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect("mongodb://localhost/auth_demo_app");

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect("/login");
}

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", (req, res) => {
    var userName = req.body.username;
    var password = req.body.password;

    User.register(new User({username: userName}), password, (err, user) => {
        if (err) {
            console.log(err);
            res.render("register");
        } else {
            console.log(user);
            passport.authenticate("local")(req, res, () => {
                res.redirect("/secret");
            });
        }
    });
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"  
}), (req, res) => {
    
});

app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

app.get("/secret", isLoggedIn, (req, res) => {
    res.render("secret");
});

app.listen(3000);