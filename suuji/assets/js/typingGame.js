var score = 0;
var timer = 30;
var intervalId;

function startTypingGame() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("typingGameScreen").style.display = "block";
  currentWord = words[Math.floor(Math.random() * words.length)];
  document.getElementById("wordToType").innerHTML = currentWord;
  score = 0;
  timer = 30;
  document.getElementById("score").innerHTML = "スコア: " + score;
  document.getElementById("timer").innerHTML = "残り時間: " + timer;
  intervalId = setInterval(updateTimer, 1000);
}

function checkInput() {
  var userInput = document.getElementById("userInput").value;
  if(userInput === currentWord) {
    score++;
    document.getElementById("score").innerHTML = "スコア: " + score;
    document.getElementById("userInput").value = '';
    currentWord = words[Math.floor(Math.random() * words.length)];
    document.getElementById("wordToType").innerHTML = currentWord;
  }
}
