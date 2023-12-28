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
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("blockGameScreen").style.display = "block";
  interval = setInterval(draw, 10);
}

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