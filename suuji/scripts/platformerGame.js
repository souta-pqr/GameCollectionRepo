
const keys = new Array(256).fill(false);

const platformerGame = (function() {
    let scoreElement;
    let livesElement;
    let canvas;
    let ctx;
  
    let score = 0;
    let lives = 3;
  
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
      { x: 600, y: 300, width: 100, height: 20 }
    ];
  
    const coins = [
      { x: 220, y: 450, width: 20, height: 20, collected: false },
      { x: 420, y: 350, width: 20, height: 20, collected: false },
      { x: 620, y: 250, width: 20, height: 20, collected: false }
    ];
  
    function init() {
      canvas = document.getElementById('gameCanvas');
      ctx = canvas.getContext('2d');
      scoreElement = document.getElementById('platformerScore');
      livesElement = document.getElementById('platformerLives');
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
          scoreElement.textContent = score;
        }
      }
  
      // Fall off the screen
      if (player.y > canvas.height) {
        lives--;
        livesElement.textContent = lives;
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
      scoreElement.textContent = score;
      livesElement.textContent = lives;
    
      coins.forEach(coin => {
        coin.collected = false;
      });
    
      resetPlayer();
      
      // キーボードの入力状態をリセット
      keys.fill(false);
    }
  
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
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
  
    return {
      init: init,
      resetGame: resetGame,
      loop: loop
    };
  })();
  
  platformerGame.init();