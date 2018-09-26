var maxScore = 5;

var FIRST_PLAYER_ID = "player-one";
var SECOND_PLAYER_ID = "player-two";
var FIRST_PLAYER_SCORE_ELEMENT = document.getElementById("first-score")
var SECOND_PLAYER_SCORE_ELEMENT = document.getElementById("second-score");
var RESET_ID = "reset";
var hasWinner = false;

function clickEvent() {
    if (hasWinner) {
        return;
    }

    if (this.id === FIRST_PLAYER_ID) {
        incrementPlayerScore(FIRST_PLAYER_SCORE_ELEMENT);
    } else {
        incrementPlayerScore(SECOND_PLAYER_SCORE_ELEMENT);
    }
}

function incrementPlayerScore(scoreElement) {
    var currentPlayerScore = Number(scoreElement.textContent);
    if (currentPlayerScore < maxScore) {
        setPlayerScore(scoreElement, ++currentPlayerScore);
    }

    checkWinner(currentPlayerScore, scoreElement);
}

function setPlayerScore(scoreElement, currentPlayerScore) {
    scoreElement.textContent = currentPlayerScore;
}

function setPlayerColor(scoreElement, color) {
    scoreElement.style.color = color;
}

function checkWinner(currentPlayerScore, scoreElement) {
    if (currentPlayerScore === maxScore) {
        hasWinner = true;
        setPlayerColor(scoreElement, "green");
    }
}

function reset() {
    hasWinner = false;
    setPlayerColor(FIRST_PLAYER_SCORE_ELEMENT, "inherit");
    setPlayerScore(FIRST_PLAYER_SCORE_ELEMENT, 0);
    setPlayerColor(SECOND_PLAYER_SCORE_ELEMENT, "inherit");
    setPlayerScore(SECOND_PLAYER_SCORE_ELEMENT, 0);
}

function updateMaxScore() {
    var newScore = this.value;
    reset();
    maxScore = Number(newScore);
    document.querySelector("#max-score").textContent = newScore;
}

document.getElementById(FIRST_PLAYER_ID).addEventListener("click", clickEvent);
document.getElementById(SECOND_PLAYER_ID).addEventListener("click", clickEvent);
document.getElementById(RESET_ID).addEventListener("click", reset);
document.querySelector("input").addEventListener("change", updateMaxScore);