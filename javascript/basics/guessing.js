

var secretNumber = 15;
var guess = Number(prompt("Your guess"));

if (secretNumber === guess) {
    alert("You won the game!!");
} else if (guess > secretNumber) {
    alert("Higher!!");
} else   {
    alert("Lower!!");
}