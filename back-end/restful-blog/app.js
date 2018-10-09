var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var mongoose =  require("mongoose");
var methodOverride = require("method-override");

app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost/restful_blog");

var blogSchema = mongoose.Schema({
    title:  String,
    body: String,
    imageUrl: String,
    date: {type: Date, default: Date.now}
});

var Blogs = mongoose.model("blog", blogSchema);

app.get("/", function(req, res) {
    res.redirect("/blogs");
});

//  INDEX
app.get("/blogs", function(req, res) {
    Blogs.find({}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            res.render("blogs", {blogs: result});
        }
    });
});

// NEW
app.get("/blogs/new", function(req, res) {
    res.render("new");
});

// CREATE
app.post("/blogs", function(req, res) {
    var blogPost = req.body.blog;

    Blogs.create(blogPost, (err, result) => {
        if (err) {
            console.log(err);
        }

        res.redirect("/blogs");
    });
});

// SHOW
app.get("/blogs/:blogId", function(req, res) {
    Blogs.findById(req.params.blogId, (err, result) => {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: result});
        }
    });
});

// EDIT
app.get("/blogs/:blogId/edit", function(req, res) {
    Blogs.findById(req.params.blogId, (err, result) => {
        if (err) {
            res.redirect("/blogs/" + req.params.blogId);
        } else {
            res.render("edit", {blog: result});
        }
    });
});

// UPDATE
app.put("/blogs/:id", function(req, res) {
    var blogPostToUpdate = req.body.blog;
    Blogs.findByIdAndUpdate(req.params.id, blogPostToUpdate, (err, result) => {
        res.redirect("/blogs/" + req.params.id);
    });
});

// DELETE
app.delete("/blogs/:blogId", function(req, res) {
    Blogs.findByIdAndDelete(req.params.blogId, (err, result) => {
        res.redirect("/blogs");
    })
});

app.listen(3000);