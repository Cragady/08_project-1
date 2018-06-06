// GLOBAL VARIABLES
var wordList = ["water", "box", "hobo", "stuff", "things", "whatnot"];
var word = "";
var wins = 0;
var lettersGuessed = [];
var remainingGuesses = 14;
var gameStarted = false;
var gameOver = false;

function startGame() {

    reset();

    word = wordList[Math.floor(Math.random() * (wordList.length))];
    guessingWord = [];
    console.log(guessingWord);
    for (var i = 0; i < wordList.length; i++) {
        guessingWord.push("_");
    }
    updateHtml();
}

document.onkeyup = function (event) {
    if (gameOver) {
        startGame();
        gameOver = false;
    } else {
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            userGuess(event.key.toLowerCase());
            remainingGuesses--;
        }
    }
    updateHtml();
}
function userGuess(letter) {
    if (remainingGuesses > 0) {
        if (lettersGuessed.indexOf(letter) === -1) {
            lettersGuessed.push(letter);
            evaluateGuess(letter);
        }
    }
}
function evaluateGuess(letter) {
    for (var j = 0; j < word.length; j++) {
        if (letter == word[j]) {
            lettersGuessed[j] = letter;
            guessingWord[j] = letter;
            console.log(guessingWord);
        } else {
            // remainingGuesses--;

        }
    }
}
// INNER HTML UPDATING
function updateHtml() {
    document.getElementById("word").innerHTML = guessingWord.join(" ");
    document.getElementById("remainingGuesses").innerHTML = remainingGuesses;
    document.getElementById("guessedLetters").innerHTML = lettersGuessed;
    document.getElementById("wins").innerHTML = wins;
}
function reset() {
    var lettersGuessed = [];
    var remainingGuesses = 14;
}