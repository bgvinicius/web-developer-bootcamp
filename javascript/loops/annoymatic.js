

/**
 * Ask the user are we there yet,
 * keep asking until user inputs yes or yeah.
 * Then, output "yay, we finally made it".
 */


var userInput;

while (userInput !== "yes" && userInput !== "yeah") {
    userInput = prompt("Are we there yet?").toLowerCase();
    console.log(userInput);
}

alert("Yay, we finally made it!");
