var numberToGuess = Math.floor(Math.random() * 100) + 1;
var lastGuess = null;
var remainingGuesses = 10;

function startNumberGame() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";
  document.getElementById("playButton").style.display = "block";
  document.getElementById("demo").innerHTML = "あなたの予想は？";
}

function playNumberGame() {
  var userGuess = prompt("あなたの予想は？");
  if(isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
    document.getElementById("demo").innerHTML = "入力は1から100の半角数字でお願いします。";
    return;
  }
  lastGuess = userGuess;
  document.getElementById("history").innerHTML = "前回の予想: " + lastGuess;
  remainingGuesses--;
  document.getElementById("remaining").innerHTML = "残り回数: " + remainingGuesses;
  if(userGuess == numberToGuess) {
    document.getElementById("demo").innerHTML = "おめでとうございます！正解です！";
    document.getElementById("result").innerHTML = "おめでとうございます！正解です！";
    document.getElementById("gameScreen").style.display = "none";
    document.getElementById("endScreen").style.display = "block";
  } else if(userGuess < numberToGuess) {
    document.getElementById("demo").innerHTML = "もっと大きい数です。";
  } else if(userGuess > numberToGuess) {
    document.getElementById("demo").innerHTML = "もっと小さい数です。";
  }
  if(remainingGuesses <= 0 && userGuess != numberToGuess) {
    document.getElementById("demo").innerHTML = "ゲームオーバー！";
    document.getElementById("result").innerHTML = "ゲームオーバー！正解は " + numberToGuess + " でした。";
    document.getElementById("gameScreen").style.display = "none";
    document.getElementById("endScreen").style.display = "block";
  }
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