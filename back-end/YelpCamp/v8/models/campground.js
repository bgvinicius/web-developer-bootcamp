var comment = require("./comments");
var mongoose =  require("mongoose");

var campgroundSchema = new mongoose.Schema({
    imageUrl: String,
    name: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Comment"
        }
    ],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

var Campground = mongoose.model("campgrounds", campgroundSchema);

module.exports = Campground;