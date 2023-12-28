// blockGame.js

// ゲーム選択画面に戻る関数
function backToStart() {
    document.getElementById("typingGameScreen").style.display = "none";
    document.getElementById("rockPaperScissorsScreen").style.display = "none";
    document.getElementById("rockPaperScissorsEndScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "none";
    document.getElementById("endScreen").style.display = "none";
    document.getElementById("blockGameScreen").style.display = "none";  // ブロック崩しゲームの画面を非表示にする
    document.getElementById("startScreen").style.display = "block";
    document.getElementById("userInput").value = '';
    clearInterval(intervalId); // タイマーを停止
    clearInterval(interval);  // 既存のsetIntervalをクリア
}

// ブロック崩しゲームの変数
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

// ブロックの設定
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

// ボールの色
var ballColor = "#0095DD";

// ブロックの配列を作成
var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
  bricks[c] = [];
  for(var r=0; r<brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

// ブロック崩しゲームを開始する関数
function startBlockGame() {
  // ゲームの状態をリセット
  isGameOver = false;
  x = canvas.width/2;
  y = canvas.height-30;
  dx = 2;  // ボールのx方向の速度をリセット
  dy = -2;  // ボールのy方向の速度をリセット
  paddleX = (canvas.width-paddleWidth)/2;
  rightPressed = false;
  leftPressed = false;
  // ブロックの配列をリセット
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
  }

  document.getElementById("startScreen").style.display = "none";
  document.getElementById("blockGameScreen").style.display = "block";
  interval = setInterval(draw, 10);  // 10ミリ秒ごとにdraw関数を呼び出す
}

// ブロックを描画する関数
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

// ゲームの状態を管理する変数
var isGameOver = false;

// ブロック崩しゲームの描画関数
function draw() {
  if (isGameOver) return;  // ゲームオーバーなら描画を停止

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  collisionDetection();

  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
    ballColor = getRandomColor();  // 壁に当たったら色を変える
  }
  if(y + dy < ballRadius) {
    dy = -dy;
    ballColor = getRandomColor();  // 壁に当たったら色を変える
  } else if(y + dy > canvas.height-ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
      ballColor = getRandomColor();  // パドルに当たったら色を変える
    } else {
      isGameOver = true;  // ゲームオーバーをtrueに設定
      alert("GAME OVER");  // ゲームオーバーのアラートを表示
      document.location.reload();
      clearInterval(interval); // ゲームが終了したらsetIntervalをクリア
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

// ボールを描画する関数
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = ballColor;
  ctx.fill();
  ctx.closePath();
}

// ランダムな色を生成する関数
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// ブロックとボールの衝突を検出する関数
function collisionDetection() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
      if(b.status == 1) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
          dy = -dy;
          b.status = 0;
          // ブロックがすべて消えたらゲームクリア
          if(isGameClear()) {
            alert("GAME CLEAR");
            document.location.reload();
            clearInterval(interval); // Needed for Chrome to end game
          }
        }
      }
    }
  }
}

// ゲームクリア判定を行う関数
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

// パドルを描画する関数
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// キーボードのキーを押したときのイベントハンドラ
function keyDownHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  }
  else if(e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}

// キーボードのキーを離したときのイベントハンドラ
function keyUpHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  }
  else if(e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}

// イベントリスナーを追加
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
