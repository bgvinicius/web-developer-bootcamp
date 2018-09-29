/* if age is negative, print an error message
if age is 21, print happy 21st birthday
if age is odd, print your age is odd
if age is a perfect square, print "perfect square"
*/

var age = prompt("Enter your age");

if (age < 0) {
    console.log("Error!");
} else {
    if (age == 21) {
        console.log("Happy 21st birthday!!");
    }

    if (age % 2 != 0) {
        console.log("Your age is odd!");
    }

    if (Number.isInteger(Math.sqrt(age))) {
        console.log("Your age is a perfect square!!");
    }
}