var lastGuess = null;
var remainingGuesses = 10;

function startNumberGame() {
  var userGuess = prompt("あなたの予想は？");
  if(isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
    document.getElementById("demo").innerHTML = "入力は1から100の半角数字でお願いします。";
    return;
  }
  lastGuess = userGuess;
  document.getElementById("history").innerHTML = "前回の予想: " + lastGuess;
  remainingGuesses--;
  document.getElementById("remaining").innerHTML = "残り回数: " + remainingGuesses;
  // 以下、元のコード...
}

function restartGame() {
  numberToGuess = Math.floor(Math.random() * 100) + 1;
  lastGuess = null;
  remainingGuesses = 10;
  document.getElementById("history").innerHTML = "前回の予想: なし";
  document.getElementById("remaining").innerHTML = "残り回数: 10";
  document.getElementById("endScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";
  document.getElementById("demo").innerHTML = "あなたの予想は？";
}
