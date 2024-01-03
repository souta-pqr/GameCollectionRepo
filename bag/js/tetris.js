const canvas = document.getElementById('tetrisCanvas');
const context = canvas.getContext('2d');

const sWidth = 800;
const sHeight = 700;
const playWidth = 300;
const playHeight = 600;
const block_size = 30;

const top_left_x = (sWidth - playWidth) / 2;
const top_left_y = sHeight - playHeight;

const S = [
  ['.....', '.....', '..00.', '.00..', '.....'],
  ['.....', '..0..', '..00.', '...0.', '.....']
];

const Z = [
  ['.....', '.....', '.00..', '..00.', '.....'],
  ['.....', '..0..', '.00..', '.0...', '.....']
];

const I = [
  ['.....', '.....', '0000.', '.....', '.....'],
  ['.....', '..0..', '..0..', '..0..', '..0..']
];

const O = [
  ['.....', '.....', '.00..', '.00..', '.....']
];

const J = [
  ['.....', '.0...', '.000.', '.....', '.....'],
  ['.....', '..00.', '..0..', '..0..', '.....'],
  ['.....', '.....', '.000.', '...0.', '.....'],
  ['.....', '..0..', '..0..', '.00..', '.....']
];

const L = [
  ['.....', '...0.', '.000.', '.....', '.....'],
  ['.....', '..0..', '..0..', '..00.', '.....'],
  ['.....', '.....', '.000.', '.0...', '.....'],
  ['.....', '.00..', '..0..', '..0..', '.....']
];

const T = [
  ['.....', '..0..', '.000.', '.....', '.....'],
  ['.....', '..0..', '..00.', '..0..', '.....'],
  ['.....', '.....', '.000.', '..0..', '.....'],
  ['.....', '..0..', '.00..', '..0..', '.....']
];

const shapes = [S, Z, I, O, J, L, T];
const shape_colors = [
  'rgb(0, 255, 0)', 'rgb(255, 0, 0)', 'rgb(0, 255, 255)',
  'rgb(255, 255, 0)', 'rgb(255, 165, 0)', 'rgb(0, 0, 255)',
  'rgb(128, 0, 128)'
];

class Piece {
  constructor(column, row, shape) {
    this.x = column;
    this.y = row;
    this.shape = shape;
    this.color = shape_colors[shapes.indexOf(shape)];
    this.rotation = 0;
  }
}

function createGrid(lockedPositions) {
  const grid = new Array(20).fill(null).map(() => new Array(10).fill('rgb(0, 0, 0)'));

  for (const [x, y] of Object.keys(lockedPositions)) {
    const color = lockedPositions[[x, y]];
    grid[y][x] = color;
  }

  return grid;
}

function convertShapeFormat(piece) {
  const positions = [];
  const format = piece.shape[piece.rotation % piece.shape.length];

  for (let i = 0; i < format.length; i++) {
    const row = [...format[i]];
    for (let j = 0; j < row.length; j++) {
      if (row[j] === '0') {
        positions.push([piece.x + j, piece.y + i]);
      }
    }
  }

  for (let i = 0; i < positions.length; i++) {
    positions[i][0] -= 2;
    positions[i][1] -= 4;
  }

  return positions;
}

function validSpace(piece, grid) {
  const acceptedPositions = Array.from({ length: 20 }, (_, i) => (
    Array.from({ length: 10 }, (_, j) => [j, i]).filter(([x, y]) => grid[y][x] === 'rgb(0, 0, 0)')
  )).flat();

  const formatted = convertShapeFormat(piece);

  for (const pos of formatted) {
    if (!acceptedPositions.some(([x, y]) => x === pos[0] && y === pos[1])) {
      if (pos[1] > -1) {
        return false;
      }
    }
  }

  return true;
}

function checkLost(positions) {
  for (const [x, y] of positions) {
    if (y < 1) {
      return true;
    }
  }

  return false;
}

function getShape() {
  return new Piece(5, 0, shapes[Math.floor(Math.random() * shapes.length)]);
}

function drawTextMiddle(text, size, color) {
  context.font = `${size}px sans-serif`;
  context.fillStyle = color;
  context.textAlign = 'center';
  context.fillText(text, top_left_x + playWidth / 2, top_left_y + playHeight / 2);
}

function drawGrid(grid) {
  for (let i = 0; i < grid.length; i++) {
    context.beginPath();
    context.moveTo(top_left_x, top_left_y + i * block_size);
    context.lineTo(top_left_x + playWidth, top_left_y + i * block_size);
    context.strokeStyle = 'rgb(128, 128, 128)';
    context.stroke();

    for (let j = 0; j < grid[i].length; j++) {
      context.beginPath();
      context.moveTo(top_left_x + j * block_size, top_left_y);
      context.lineTo(top_left_x + j * block_size, top_left_y + playHeight);
      context.strokeStyle = 'rgb(128, 128, 128)';
      context.stroke();

      context.fillStyle = grid[i][j];
      context.fillRect(top_left_x + j * block_size, top_left_y + i * block_size, block_size, block_size);
    }
  }
}

function drawWindow(grid, score, lastScore) {
  context.fillStyle = 'rgb(0, 0, 0)';
  context.fillRect(0, 0, sWidth, sHeight);

  context.font = '60px sans-serif';
  context.fillStyle = 'rgb(255, 255, 255)';
  context.textAlign = 'center';
  context.fillText('Tetris', top_left_x + playWidth / 2, 30);

  context.font = '30px sans-serif';
  context.fillText(`Score: ${score}`, top_left_x + playWidth + 50, top_left_y + playHeight / 2 - 100 + 160);
  context.fillText(`Last Score: ${lastScore}`, top_left_x - 200 + 20, top_left_y + 200 + 160);

  drawGrid(grid);

  context.beginPath();
  context.rect(top_left_x, top_left_y, playWidth, playHeight);
  context.strokeStyle = 'rgb(255, 0, 0)';
  context.lineWidth = 5;
  context.stroke();
}

function clearRows(grid, locked) {
  let inc = 0;
  for (let i = grid.length - 1; i >= 0; i--) {
    const row = grid[i];
    if (!row.includes('rgb(0, 0, 0)')) {
      inc++;
      const ind = i;
      for (let j = 0; j < row.length; j++) {
        delete locked[[j, i]];
      }
    }
  }

  if (inc > 0) {
    const sortedLocked = Object.entries(locked)
      .sort((a, b) => a[1][1] - b[1][1])
      .map(([key, value]) => ({ key: key.split(',').map(Number), value }));
    
    for (const { key, value } of sortedLocked.reverse()) {
      const [x, y] = key;
      if (y < ind) {
        const newKey = [x, y + inc];
        locked[newKey] = value;
        delete locked[key];
      }
    }
  }

  return inc;
}

function drawNextShape(shape) {
  context.font = '30px sans-serif';
  context.fillStyle = 'rgb(255, 255, 255)';
  context.fillText('Next Shape', top_left_x + playWidth + 50 + 10, top_left_y + playHeight / 2 - 100 + 160 - 30);

  const sx = top_left_x + playWidth + 50;
  const sy = top_left_y + playHeight / 2 - 100;

  const format = shape.shape[shape.rotation % shape.shape.length];

  for (let i = 0; i < format.length; i++) {
    const row = [...format[i]];
    for (let j = 0; j < row.length; j++) {
      if (row[j] === '0') {
        context.fillStyle = shape.color;
        context.fillRect(sx + j * block_size, sy + i * block_size, block_size, block_size);
      }
    }
  }
}

function updateScore(nscore) {
  const score = maxScore();

  if (parseInt(score) > nscore) {
    localStorage.setItem('tetrisScore', score);
  } else {
    localStorage.setItem('tetrisScore', nscore);
  }
}

function maxScore() {
  const score = localStorage.getItem('tetrisScore') || '0';
  return score;
}

function drawGameOver() {
  drawTextMiddle('YOU LOST!', 80, 'rgb(255, 255, 255)');
}

function main() {
  const lastScore = maxScore();
  const lockedPositions = {};
  let grid = createGrid(lockedPositions);

  let changePiece = false;
  let run = true;
  let currentPiece = getShape();
  let nextPiece = getShape();
  const fallSpeed = 0.27;
  let fallTime = 0;
  let levelTime = 0;
  let score = 0;

  function gameLoop() {
    grid = createGrid(lockedPositions);
    fallTime += 1000 / 60;
    levelTime += 1000 / 60;

    if (levelTime / 1000 > 5) {
      levelTime = 0;
      if (fallSpeed > 0.12) {
        fallSpeed -= 0.005;
      }
    }

    if (fallTime / 1000 > fallSpeed) {
      fallTime = 0;
      currentPiece.y += 1;
      if (!validSpace(currentPiece, grid) && currentPiece.y > 0) {
        currentPiece.y -= 1;
        changePiece = true;
      }
    }

    drawWindow(grid, score, lastScore);
    drawNextShape(nextPiece);

    if (changePiece) {
      const shapePos = convertShapeFormat(currentPiece);

      for (let i = 0; i < shapePos.length; i++) {
        const [x, y] = shapePos[i];
        if (y > -1) {
          grid[y][x] = currentPiece.color;
        }
      }

      for (const pos of shapePos) {
        const p = pos.join(',');
        lockedPositions[p] = currentPiece.color;
      }

      currentPiece = nextPiece;
      nextPiece = getShape();
      changePiece = false;
      score += clearRows(grid, lockedPositions) * 10;

      if (checkLost(Object.keys(lockedPositions).map(pos => pos.split(',').map(Number)))) {
        drawGameOver();
        updateScore(score);
        run = false;
        return;
      }
    }

    requestAnimationFrame(gameLoop);
  }

  gameLoop();
}

function mainMenu() {
  context.fillStyle = 'rgb(0, 0, 0)';
  context.fillRect(0, 0, sWidth, sHeight);

  drawTextMiddle('Press Any Key To Play', 60, 'rgb(255, 255, 255)');

  function handleKeyPress() {
    window.removeEventListener('keydown', handleKeyPress);
    main();
  }

  window.addEventListener('keydown', handleKeyPress);
}

// キー入力待ち
function waitForAnyKey() {
    drawTextMiddle('Press Any Key To Play', 60, 'rgb(255, 255, 255)');

    function handleKeyPress() {
      window.removeEventListener('keydown', handleKeyPress);
      main();
    }

  window.addEventListener('keydown', handleKeyPress);
}

const tetrisCanvas = document.createElement('canvas');
tetrisCanvas.id = 'tetrisCanvas';
tetrisCanvas.width = sWidth;
tetrisCanvas.height = sHeight;
document.body.appendChild(tetrisCanvas);

mainMenu();
// キー入力待ちを開始
waitForAnyKey();
