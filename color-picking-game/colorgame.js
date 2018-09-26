var currentColors;
var quantityOfColors = 6;
var winnerColorIndex;
var squares = document.querySelectorAll("div.square");
var rgbHeader = document.querySelector("h1");
var hasWinner = false;

function getRandomRGB() {
    var red = getRandomInt(0, 256);
    var green = getRandomInt(0, 256);
    var blue = getRandomInt(0, 256);

    return "rgb(" +  red + ", " + green + ", " +  blue + ")";
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function startGame() {
    document.querySelector("#reset").textContent = "New Color";
    document.querySelector(".header").style.backgroundColor = "steelblue";
    document.querySelector("div span").textContent = "";
    hasWinner = false;
    currentColors = [];
    for (var i = 0; i < quantityOfColors; i++) {
        var randomColor = getRandomRGB();
        currentColors.push(randomColor);
        squares[i].style.backgroundColor = randomColor;
        squares[i].addEventListener("click", checkSquare);
    }

    winnerColorIndex = getRandomInt(0, quantityOfColors);
    rgbHeader.textContent = currentColors[winnerColorIndex];
}

function winGame() {
    hasWinner = true;
    document.querySelector("#reset").textContent = "Play Again?";
    
    var winnerColor = currentColors[winnerColorIndex];
    document.querySelector(".header").style.backgroundColor = winnerColor;
    for (var i = 0; i < quantityOfColors; i++) {
        squares[i].style.backgroundColor = winnerColor;
    }
}

function checkSquare() {
    if (hasWinner || this.style.backgroundColor === "inherit") {
        return;
    }

    if (this.style.backgroundColor === currentColors[winnerColorIndex]) {
        document.querySelector("div span").textContent = "Correct!!";
        winGame();
    } else {
        this.style.backgroundColor = "inherit";
        document.querySelector("div span").textContent = "Try again!";
    }
}

function changeDifficulty() {
    document.querySelector("#hard").classList.remove("selected");
    document.querySelector("#easy").classList.remove("selected");

    if (this.id == "easy") {
        for (var i = 3; i < quantityOfColors; i++) {
            squares[i].style.backgroundColor = "inherit";
        }
        quantityOfColors = 3;
        document.querySelector("#easy").classList.add("selected");
    } else {
        quantityOfColors = 6;
        document.querySelector("#hard").classList.add("selected");
    }

    startGame();
}

startGame();

document.querySelector("#reset").addEventListener("click", startGame);
document.querySelector("#easy").addEventListener("click", changeDifficulty);
document.querySelector("#hard").addEventListener("click", changeDifficulty);