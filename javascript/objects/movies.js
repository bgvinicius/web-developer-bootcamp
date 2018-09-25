/**
 * Create an array of movie objects. Each movie should have a title, rating, and hasWatched properties. 
 * Iterate through the array and print out something like;
 * 
 * You have watched "In Bruges" - 5 stars
 * You have not seen "Frozen" - 4.5 stars
 */

var movies = [
    {
        "title": "Matrix",
        rating: 5,
        hasWatched: true
    }, {
        title: 300,
        rating: 4.9,
        hasWatched: true
    }, {
        title: "Star Wars Episode X",
        rating: 10,
        "hasWatched": false,
    }, {
        title: "Star Trek 4",
        "rating": 10,
        hasWatched: false,
    }
]

movies.forEach(function(movie) {
    console.log("You have " + (movie.hasWatched ? "watched " : "not seen ") + 
    "\"" + movie.title + "\"" + " - " + movie.rating + " stars");
});