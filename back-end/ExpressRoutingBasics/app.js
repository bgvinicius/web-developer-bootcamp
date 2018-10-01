/**
 * Express Routing Basics Exercise
 * 
 * Visiting "/" should print "Hi there, welcome to my assignment";
 * 
 * Visiting "/speak/pig" should print "The pig says 'Oink'";
 * Visiting "/speak/cow" should print "The cow says 'Moo'";
 * Visiting "/speak/dog" should print "The dog says 'Woof Woof!'";
 * 
 * Visiting "/repeat/hello/3" should print "hello hello hello!'";
 * Visiting "/repeat/hello/5" should print "hello hello hello hello hello!'";
 * Visiting "/repeat/blah/2" should print "blah blah!'";
 * 
 * Visiting any other route should print "Sorry, page not found... What are you doing with your life"
 */

 var express = require("express");

 var app = express();

 app.get("/", function(request, response) {
    response.send("Hi there, welcome to my assignment");
 });

var animals = {
    pig: "Oink",
    cow: "Moo",
    dog: "Woof Woof!"
};

 app.get("/speak/:animal", function(req, res) {
    var animal = req.params.animal.toLowerCase();
    var sound = animals[animal];

    if (sound === undefined) {
        res.redirect("/404");
    } else {
        res.send("The " + animal + " says '" + sound + "'");
    }
 });

 app.get("/repeat/:word/:times", function(req, res) {
    var word = req.params.word;
    var times = Number(req.params.times);

    res.send(word.concat(" ").repeat(times));
 });

 app.get("*", function(req, res) {
    res.send("Sorry, page not found... What are you doing with your life");
 });

 app.listen(3000);