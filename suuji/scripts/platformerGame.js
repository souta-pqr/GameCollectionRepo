const platformerGame = (function() {
  let scoreElement;
  let livesElement;
  let canvas;
  let ctx;
 
  let score = 0;
  let lives = 3;
  let scrollY = 0;
 
  const player = {
    x: 50,
    y: 550,
    width: 30,
    height: 50,
    speed: 5,
    velX: 0,
    velY: 0,
    jumping: false,
    grounded: false
  };
 
  const keys = [];
 
  const friction = 0.8;
  const gravity = 0.5;
 
  const platforms = [
    { x: 0, y: 580, width: 800, height: 20 },
    { x: 200, y: 500, width: 100, height: 20 },
    { x: 400, y: 400, width: 100, height: 20 },
    { x: 600, y: 300, width: 100, height: 20 },
    { x: 100, y: 200, width: 100, height: 20 },
    { x: 300, y: 100, width: 100, height: 20 },
    { x: 550, y: 50, width: 100, height: 20 },
    { x: 350, y: 250, width: 100, height: 20 }
  ];
 
  const coins = [
    { x: 220, y: 450, width: 20, height: 20, collected: false },
    { x: 420, y: 350, width: 20, height: 20, collected: false },
    { x: 620, y: 250, width: 20, height: 20, collected: false },
    { x: 120, y: 150, width: 20, height: 20, collected: false },
    { x: 320, y: 50, width: 20, height: 20, collected: false },
    { x: 370, y: 200, width: 20, height: 20, collected: false }
  ];
 
  const goalPlatform = { x: 700, y: 0, width: 100, height: 20 };
 
  function init() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    scoreElement = document.getElementById('platformerScore');
    livesElement = document.getElementById('platformerLives');
    
    // キャンバスのサイズを調整
    canvas.width = 800;
    canvas.height = 600;
    
    // 変な四角を消すために、キャンバスの上下のマージンを調整
    canvas.style.marginTop = '0';
    canvas.style.marginBottom = '0';
    
    resetGame();
  }
 
  function update() {
    // Player movement
    if (keys[37] || keys[65]) {
      // Left
      if (player.velX > -player.speed) {
        player.velX--;
      }
    }
    if (keys[39] || keys[68]) {
      // Right
      if (player.velX < player.speed) {
        player.velX++;
      }
    }
    player.velX *= friction;
    player.x += player.velX;
 
    if (player.grounded) {
      player.velY = 0;
    }
 
    player.y += player.velY;
    player.velY += gravity;
 
    // Platforms collision detection
    player.grounded = false;
    for (let i = 0; i < platforms.length; i++) {
      const platform = platforms[i];
 
      if (
        player.x < platform.x + platform.width &&
        player.x + player.width > platform.x &&
        player.y + player.height >= platform.y &&
        player.y + player.height <= platform.y + platform.height
      ) {
        player.grounded = true;
        player.jumping = false;
        player.y = platform.y - player.height;
      }
    }
 
    // Coins collection
    for (let i = 0; i < coins.length; i++) {
      const coin = coins[i];
 
      if (
        !coin.collected &&
        player.x < coin.x + coin.width &&
        player.x + player.width > coin.x &&
        player.y < coin.y + coin.height &&
        player.y + player.height > coin.y
      ) {
        coin.collected = true;
        score += 10;
        if (scoreElement) {
          scoreElement.textContent = score;
        }
      }
    }
 
    // ゲームクリアの判定
    if (player.x >= goalPlatform.x && player.y <= goalPlatform.y + goalPlatform.height) {
      alert('Congratulations! You cleared the game!');
      resetGame();
      return;
    }
 
    // スクロール処理
    if (player.y < canvas.height / 2) {
      scrollY = canvas.height / 2 - player.y;
    } else {
      scrollY = 0;
    }
 
    // Fall off the screen
    if (player.y > canvas.height) {
      lives--;
      if (livesElement) {
        livesElement.textContent = lives;
      }
      resetPlayer();
 
      if (lives === 0) {
        alert('Game Over!');
        resetGame();
      }
    }
  }
 
  function resetPlayer() {
    player.x = 50;
    player.y = 550;
    player.velX = 0;
    player.velY = 0;
    player.jumping = false;
    player.grounded = false;
  }
 
  function resetGame() {
    score = 0;
    lives = 3;
    if (scoreElement) {
      scoreElement.textContent = score;
    }
    if (livesElement) {
      livesElement.textContent = lives;
    }
 
    coins.forEach(coin => {
      coin.collected = false;
    });
 
    resetPlayer();
 
    keys.fill(false);
 
    scrollY = 0;
  }
 
  function draw() {
    ctx.save();
    ctx.translate(0, scrollY);
    ctx.clearRect(0, -scrollY, canvas.width, canvas.height);
 
    // Draw player
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(player.x, player.y, player.width, player.height);
 
    // Draw platforms
    ctx.fillStyle = '#0000ff';
    platforms.forEach(platform => {
      ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
 
    // Draw coins
    ctx.fillStyle = '#ffd700';
    coins.forEach(coin => {
      if (!coin.collected) {
        ctx.fillRect(coin.x, coin.y, coin.width, coin.height);
      }
    });
 
    // Draw goal platform
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(goalPlatform.x, goalPlatform.y, goalPlatform.width, goalPlatform.height);
 
    ctx.restore();
  }
 
  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }
 
  document.body.addEventListener('keydown', event => {
    keys[event.keyCode] = true;
    if ((event.keyCode === 32 || event.keyCode === 38 || event.keyCode === 87) && !player.jumping && player.grounded) {
      player.jumping = true;
      player.grounded = false;
      player.velY = -player.speed * 2;
    }
  });
 
  document.body.addEventListener('keyup', event => {
    keys[event.keyCode] = false;
  });
 
  // ゲーム選択画面に戻るボタンの機能を追加
  function backToStart() {
    document.getElementById("platformerGameScreen").style.display = "none";
    document.getElementById("startScreen").style.display = "block";
    resetGame();
  }
 
  return {
    init: init,
    resetGame: resetGame,
    loop: loop,
    backToStart: backToStart
  };
 })();