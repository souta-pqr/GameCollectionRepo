// numberGame.js

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

// rockPaperScissorsGame.js

var choices = ['rock', 'scissors', 'paper'];
var images = {
  'rock': './assets/data/janken_gu.png',
  'scissors': './assets/data/janken_choki.png',
  'paper': './assets/data/janken_pa.png'
};

function startRockPaperScissors() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("rockPaperScissorsScreen").style.display = "block";
  document.getElementById("rockButton").style.display = "block";
  document.getElementById("paperButton").style.display = "block";
  document.getElementById("scissorsButton").style.display = "block";
  document.getElementById("rpsDemo").innerHTML = "あなたの手を選んでください。";
}

function playRockPaperScissors(userChoice) {
  var computerChoice = choices[Math.floor(Math.random() * 3)];
  document.getElementById("rpsImage").src = images[computerChoice];
  if(userChoice === computerChoice) {
    document.getElementById("rpsDemo").innerHTML = "引き分け！あなたは " + userChoice + "、コンピュータの手は " + computerChoice + " でした。";
  } else if((userChoice === 'rock' && computerChoice === 'scissors') || (userChoice === 'scissors' && computerChoice === 'paper') || (userChoice === 'paper' && computerChoice === 'rock')) {
    document.getElementById("rpsDemo").innerHTML = "おめでとうございます！あなたの勝ちです！あなたは " + userChoice + "、コンピュータの手は " + computerChoice + " でした。";
  } else {
    document.getElementById("rpsDemo").innerHTML = "残念、あなたの負けです。あなたは " + userChoice + "、コンピュータの手は " + computerChoice + " でした。";
  }
  document.getElementById("rpsResult").innerHTML = document.getElementById("rpsDemo").innerHTML;
  document.getElementById("rockPaperScissorsScreen").style.display = "none";
  document.getElementById("rockPaperScissorsEndScreen").style.display = "block";
}

function restartRockPaperScissors() {
  document.getElementById("rockPaperScissorsEndScreen").style.display = "none";
  document.getElementById("rockPaperScissorsScreen").style.display = "block";
  document.getElementById("rpsDemo").innerHTML = "あなたの手を選んでください。";
}

// typingGame.js

var words = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon', 'mango', 'nectarine', 'orange', 'peach', 'plum', 'quince', 'raspberry', 'strawberry', 'tangerine', 'watermelon', 'xigua', 'yuzu', 'zucchini'];
var currentWord = '';
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

function updateTimer() {
  timer--;
  document.getElementById("timer").innerHTML = "残り時間: " + timer;
  if(timer <= 0) {
    clearInterval(intervalId);
    alert('時間切れ！あなたのスコアは ' + score + ' です！');
    backToStart();
  }
}

// blockGame.js

var canvas = document.getElementById("blockGameCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var ballColor = "#0095DD";

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
  bricks[c] = [];
  for(var r=0; r<brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

var isGameOver = false;

function startBlockGame() {
  isGameOver = false;
  x = canvas.width/2;
  y = canvas.height-30;
  dx = 2;
  dy = -2;
  paddleX = (canvas.width-paddleWidth)/2;
  rightPressed = false;
  leftPressed = false;
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
  }

  document.getElementById("startScreen").style.display = "none";
  document.getElementById("blockGameScreen").style.display = "block";
  interval = setInterval(draw, 10);
}

function drawBricks() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      if(bricks[c][r].status == 1) {
        var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function draw() {
  if (isGameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  collisionDetection();

  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
    ballColor = getRandomColor();
  }
  if(y + dy < ballRadius) {
    dy = -dy;
    ballColor = getRandomColor();
  } else if(y + dy > canvas.height-ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
      ballColor = getRandomColor();
    } else {
      isGameOver = true;
      alert("GAME OVER");
      document.location.reload();
      clearInterval(interval);
    }
  }
  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
  } else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
  x += dx;
  y += dy;
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = ballColor;
  ctx.fill();
  ctx.closePath();
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function collisionDetection() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
      if(b.status == 1) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
          dy = -dy;
          b.status = 0;
          if(isGameClear()) {
            alert("GAME CLEAR");
            document.location.reload();
            clearInterval(interval);
          }
        }
      }
    }
  }
}

function isGameClear() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      if(bricks[c][r].status == 1) {
        return false;
      }
    }
  }
  return true;
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function keyDownHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  }
  else if(e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  }
  else if(e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
