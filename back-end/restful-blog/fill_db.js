var mongoose =  require("mongoose"), 
faker =         require("faker");

mongoose.connect("mongodb://localhost/restful_blog");

var blogSchema = mongoose.Schema({
    title:  String,
    body: String,
    imageUrl: String,
    date: {type: Date, default: Date.now}
});

var BlogModel = mongoose.model("blog", blogSchema);

var QUANTITY_OF_BLOGS = 1;

var blogs = [];

for (var i = 0; i < QUANTITY_OF_BLOGS; i++) {
    var blog = {
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraph(),
        imageUrl: "https://images.unsplash.com/photo-1515524738708-327f6b0037a7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ff90e72db15176afc516fac82d04f14f&auto=format&fit=crop&w=1350&q=80"
    };

    blogs.push(blog);
}

BlogModel.insertMany(blogs, (err, result) => {
    if (err) {
        console.log("An error occurred while inserting to the database.");
        console.log(err);
    } else {
        console.log("Success, everything was inserted into the database.");
        console.log(result);
    }

    mongoose.disconnect();
});
