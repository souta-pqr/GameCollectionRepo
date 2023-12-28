// typingGame.js

// ゲーム選択画面に戻る関数
function backToStart() {
    document.getElementById("typingGameScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "none";
    document.getElementById("endScreen").style.display = "none";
    document.getElementById("startScreen").style.display = "block";
    document.getElementById("userInput").value = '';
    clearInterval(intervalId); // タイマーを停止
    timer = 30; // タイマーをリセット
    clearInterval(interval);  // 既存のsetIntervalをクリア
}

// typingGame.js

var words = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon', 'mango', 'nectarine', 'orange', 'peach', 'plum', 'quince', 'raspberry', 'strawberry', 'tangerine', 'watermelon', 'xigua', 'yuzu', 'zucchini'];
var currentWord = '';
var score = 0; // 追加した行
var timer = 30; // 追加した行
var intervalId; // 追加した行

function startTypingGame() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("typingGameScreen").style.display = "block";
  currentWord = words[Math.floor(Math.random() * words.length)];
  document.getElementById("wordToType").innerHTML = currentWord;
  score = 0;
  timer = 30;
  document.getElementById("score").innerHTML = "スコア: " + score;
  document.getElementById("timer").innerHTML = "残り時間: " + timer;
  intervalId = setInterval(updateTimer, 1000); // 追加した行
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

function updateTimer() { // 追加した行
  timer--;
  document.getElementById("timer").innerHTML = "残り時間: " + timer;
  if(timer <= 0) {
    clearInterval(intervalId);
    alert('時間切れ！あなたのスコアは ' + score + ' です！');
    backToStart();
  }
}