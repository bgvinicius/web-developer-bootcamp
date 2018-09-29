/**
 * Come up with 4 different ways to select the first <p> tag from the html (selectors.html)
 */

//  first way - query selector gets the first element, so, we get the first <p>.
document.querySelector("p");

// another way, using query selector also
document.querySelector("#first");

// now using another method
document.getElementById("first");

// last way using query selector all
document.querySelectorAll(".special")[0];

// extra using adjacent selector
document.querySelector("h1 + p");