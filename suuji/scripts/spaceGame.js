let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;
let spaceGameScore = 0;
let isSpaceGameActive = false;
let gameObjects = [];
let animationFrameId;
let gameLoopId;

const spacecraft = document.getElementById('spacecraft');

function startSpaceGame() {
   document.getElementById("startScreen").style.display = "none";
   document.getElementById("spaceGameScreen").style.display = "block";
   document.body.classList.add('space-game-active');
   
   // 初期化
   createStars();
   spaceGameScore = 0;
   isSpaceGameActive = true;
   gameObjects = [];
   updateSpaceScore();
   
   // アニメーションとゲームループを開始
   updateSpacecraftPosition();
   startGameLoop();

   // マウス移動のイベントリスナーを追加
   document.addEventListener('mousemove', handleMouseMove);
}

function updateSpacecraftPosition() {
   targetX = mouseX - spacecraft.offsetWidth / 2;
   targetY = mouseY - spacecraft.offsetHeight / 2;

   const currentX = parseFloat(spacecraft.style.left || 0);
   const currentY = parseFloat(spacecraft.style.top || 0);
   
   const dx = targetX - currentX;
   const dy = targetY - currentY;
   
   spacecraft.style.left = `${currentX + dx * 0.2}px`;
   spacecraft.style.top = `${currentY + dy * 0.2}px`;

   const rotation = Math.atan2(dy, dx) * 180 / Math.PI;
   spacecraft.style.transform = `rotate(${rotation + 90}deg)`;

   if (isSpaceGameActive) {
       animationFrameId = requestAnimationFrame(updateSpacecraftPosition);
   }
}

function handleMouseMove(e) {
   e.preventDefault();
   mouseX = e.clientX;
   mouseY = e.clientY;
}

function createStars() {
   const stars = document.querySelector('.stars');
   stars.innerHTML = ''; // Clear existing stars
   const count = 200;
   
   for (let i = 0; i < count; i++) {
       const star = document.createElement('div');
       star.className = 'star';
       
       const x = Math.random() * 100;
       const y = Math.random() * 100;
       const size = Math.random() * 3;
       
       star.style.left = `${x}%`;
       star.style.top = `${y}%`;
       star.style.width = `${size}px`;
       star.style.height = `${size}px`;
       star.style.setProperty('--duration', `${Math.random() * 3 + 1}s`);
       
       stars.appendChild(star);
   }
}

class GameObject {
   constructor(type, speed) {
       this.element = document.createElement('div');
       this.element.className = `game-object ${type}`;
       this.element.textContent = type === 'meteor' ? '☄️' : '⭐';
       this.speed = speed;
       this.x = Math.random() * (window.innerWidth - 30);
       this.y = -30;
       this.update();
       document.getElementById('spaceGameScreen').appendChild(this.element);
   }

   update() {
       this.y += this.speed;
       this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
   }

   remove() {
       this.element.remove();
   }

   getBounds() {
       const rect = this.element.getBoundingClientRect();
       return rect;
   }
}

function startGameLoop() {
   function gameLoop() {
       if (!isSpaceGameActive) return;

       if (Math.random() < 0.03) {
           gameObjects.push(new GameObject('meteor', 3 + Math.random() * 2));
       }
       if (Math.random() < 0.02) {
           gameObjects.push(new GameObject('star-item', 2 + Math.random() * 2));
       }

       const spacecraftBounds = spacecraft.getBoundingClientRect();
       
       for (let i = gameObjects.length - 1; i >= 0; i--) {
           const obj = gameObjects[i];
           obj.update();

           if (obj.y > window.innerHeight) {
               obj.remove();
               gameObjects.splice(i, 1);
               continue;
           }

           const objBounds = obj.getBounds();
           if (isColliding(spacecraftBounds, objBounds)) {
               if (obj.element.className.includes('meteor')) {
                   spaceGameOver();
                   return;
               } else if (obj.element.className.includes('star-item')) {
                   spaceGameScore += 100;
                   updateSpaceScore();
                   obj.remove();
                   gameObjects.splice(i, 1);
               }
           }
       }

       gameLoopId = requestAnimationFrame(gameLoop);
   }

   gameLoop();
}

function isColliding(rect1, rect2) {
   const margin = 10;
   return !(rect2.left + margin > rect1.right - margin || 
           rect2.right - margin < rect1.left + margin || 
           rect2.top + margin > rect1.bottom - margin ||
           rect2.bottom - margin < rect1.top + margin);
}

function updateSpaceScore() {
   document.getElementById("spaceGameScore").textContent = `スコア: ${spaceGameScore}`;
}

function spaceGameOver() {
   isSpaceGameActive = false;
   cancelAnimationFrame(gameLoopId);
   cancelAnimationFrame(animationFrameId);
   document.getElementById("spaceFinalScore").textContent = `最終スコア: ${spaceGameScore}`;
   document.getElementById("spaceGameOverScreen").style.display = "block";
   
   // ゲームオーバー時にマウスカーソルを再表示
   document.body.classList.remove('space-game-active');
   
   // ゲームオーバー画面のボタンのカーソルスタイルを戻す
   const gameOverButtons = document.getElementById("spaceGameOverScreen").getElementsByTagName("button");
   for (let button of gameOverButtons) {
       button.style.cursor = "pointer";
   }
}

function restartSpaceGame() {
   document.getElementById("spaceGameOverScreen").style.display = "none";
   gameObjects.forEach(obj => obj.remove());
   gameObjects = [];
   spaceGameScore = 0;
   updateSpaceScore();
   
   // ゲーム再開時にマウスカーソルを非表示に
   document.body.classList.add('space-game-active');
   
   isSpaceGameActive = true;
   startGameLoop();
   updateSpacecraftPosition();
}

function backToStartSpace() {
   // ゲームのクリーンアップ
   isSpaceGameActive = false;
   cancelAnimationFrame(gameLoopId);
   cancelAnimationFrame(animationFrameId);
   
   // 画面の表示/非表示を制御
   document.getElementById("spaceGameScreen").style.display = "none";
   document.getElementById("spaceGameOverScreen").style.display = "none";
   document.getElementById("startScreen").style.display = "block";
   
   // カーソルの表示を戻す
   document.body.classList.remove('space-game-active');
   
   // イベントリスナーを削除
   document.removeEventListener('mousemove', handleMouseMove);
   
   // ゲームオブジェクトをクリア
   gameObjects.forEach(obj => obj.remove());
   gameObjects = [];

   // スコアをリセット
   spaceGameScore = 0;
   updateSpaceScore();
}

// DOMContentLoadedイベントリスナーを追加
document.addEventListener('DOMContentLoaded', function() {
   const backButton = document.getElementById("spaceGameOverScreen")
       .querySelector('button[onclick="backToStart()"]');
   if (backButton) {
       backButton.onclick = backToStartSpace;
   }
});

// ウィンドウのクリーンアップ
window.addEventListener('beforeunload', () => {
   cancelAnimationFrame(animationFrameId);
   cancelAnimationFrame(gameLoopId);
});