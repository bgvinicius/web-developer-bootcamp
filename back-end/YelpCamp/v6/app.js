const express               = require("express"),
      app                   = express(),
      bodyParser            = require("body-parser"),
      mongoose              = require("mongoose"),
      expressSessionn       = require("express-session"),
      passport              = require("passport"),
      LocalStrategy         = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose"),
      fillDB                = require("./fill_db"),
      User                  = require("./models/user"),
      Campground            = require("./models/campground"),
      Comment               = require("./models/comments");

// express configs
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// passport configs
app.use(expressSessionn({
    secret: "I like ducks",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect("mongodb://localhost/yelp_camp");

fillDB();

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

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

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
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


app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
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

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", (req, res) => {
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

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), (req, res) => {});

app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect("/login");
}

app.listen(3000);