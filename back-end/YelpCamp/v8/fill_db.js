var faker = require("faker");

var Comment = require("./models/comments");
var Campground = require("./models/campground.js");

module.exports = function() {
    Campground.deleteMany({}, err => console.log(err));
    
    var campgrounds = [
        {
            imageUrl: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f8c67fa7e8b6bb_340.jpg",
            name:  faker.address.city() + " "  + faker.random.word(),
            description: faker.lorem.sentence()
        },
        {
            imageUrl: "https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104496f8c67fa7e8b6bb_340.jpg",
            name:  faker.address.city() + " "  + faker.random.word(),
            description: faker.lorem.sentence()
        },
        {
            imageUrl: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg",
            name:  faker.address.city() + " "  + faker.random.word(),
            description: faker.lorem.sentence()
        },
        {
            imageUrl: "https://farm6.staticflickr.com/5616/15367422639_644310f605.jpg",
            name:  faker.address.city() + " "  + faker.random.word(),
            description: faker.lorem.sentence()
        },
        {
            imageUrl: "https://farm9.staticflickr.com/8039/7930464504_d02f777308.jpg",
            name:  faker.address.city() + " "  + faker.random.word(),
            description: faker.lorem.sentence()
        },
        {
            imageUrl: "https://farm2.staticflickr.com/1266/973330600_c1360f7cd3.jpg",
            name:  faker.address.city() + " "  + faker.random.word(),
            description: faker.lorem.sentence()
        },
        {
            imageUrl: "https://farm3.staticflickr.com/2465/3775233423_84a09ee68b.jpg",
            name:  faker.address.city() + " "  + faker.random.word(),
            description: faker.lorem.sentence()
        },
        {
            imageUrl: "https://farm3.staticflickr.com/2573/3682137318_a903f106b5.jpg",
            name:  faker.address.city() + " "  + faker.random.word(),
            description: faker.lorem.sentence()
        },
        {
            imageUrl: "https://farm8.staticflickr.com/7456/16332582188_e779c8614b.jpg",
            name:  faker.address.city() + " "  + faker.random.word(),
            description: faker.lorem.sentence()
        },
        {
            imageUrl: "https://farm7.staticflickr.com/6227/6258740484_bfd046b209.jpg",
            name:  faker.address.city() + " "  + faker.random.word(),
            description: faker.lorem.sentence()
        },
        {
            imageUrl: "https://farm9.staticflickr.com/8154/7397642422_58b003e9b8.jpg",
            name:  faker.address.city() + " "  + faker.random.word(),
            description: faker.lorem.sentence()
        }
    ];
    
    Campground.insertMany(campgrounds, (err, createdCampgrounds) => {
        if (err) {
            console.log("An error occurred while inserting to the database.");
            console.log(err);
        } else {
            console.log("The data was successfully inserted to the database.");
            createdCampgrounds.forEach((createdCampground) => {
                Comment.create({text: faker.lorem.sentence(), author: faker.name.firstName()}, (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        createdCampground.comments.push(result);
                        createdCampground.save();
                    }
                });
            });
        }
    });   
}