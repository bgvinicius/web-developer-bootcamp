var express = require("express");
var app = express();
var faker = require("faker");
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

var campgrounds = [
    {
        imageUrl: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f8c67fa7e8b6bb_340.jpg",
        name:  faker.address.city() + " "  + faker.random.word()
    },
    {
        imageUrl: "https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104496f8c67fa7e8b6bb_340.jpg",
        name:  faker.address.city() + " "  + faker.random.word()
    },
    {
        imageUrl: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg",
        name:  faker.address.city() + " "  + faker.random.word()
    },
    {
        imageUrl: "https://farm6.staticflickr.com/5616/15367422639_644310f605.jpg",
        name:  faker.address.city() + " "  + faker.random.word()
    },
    {
        imageUrl: "https://farm9.staticflickr.com/8039/7930464504_d02f777308.jpg",
        name:  faker.address.city() + " "  + faker.random.word()
    },
    {
        imageUrl: "https://farm2.staticflickr.com/1266/973330600_c1360f7cd3.jpg",
        name:  faker.address.city() + " "  + faker.random.word()
    },
    {
        imageUrl: "https://farm3.staticflickr.com/2465/3775233423_84a09ee68b.jpg",
        name:  faker.address.city() + " "  + faker.random.word()
    },
    {
        imageUrl: "https://farm3.staticflickr.com/2573/3682137318_a903f106b5.jpg",
        name:  faker.address.city() + " "  + faker.random.word()
    },
    {
        imageUrl: "https://farm8.staticflickr.com/7456/16332582188_e779c8614b.jpg",
        name:  faker.address.city() + " "  + faker.random.word()
    },
    {
        imageUrl: "https://farm7.staticflickr.com/6227/6258740484_bfd046b209.jpg",
        name:  faker.address.city() + " "  + faker.random.word()
    },
    {
        imageUrl: "https://farm9.staticflickr.com/8154/7397642422_58b003e9b8.jpg",
        name:  faker.address.city() + " "  + faker.random.word()
    }
];

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", function(req, res) {
    res.render("newcampground");
});

app.post("/campgrounds", function(req, res) {
    var campgroundName = req.body.campgroundName;
    var campgroundUrl = req.body.campgroundUrl;

    var newCampground = {name: campgroundName, imageUrl: campgroundUrl};
    campgrounds.push(newCampground);

    res.redirect("/campgrounds");
});

app.listen(3000);