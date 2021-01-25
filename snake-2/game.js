const BG_COLOUR = "#231f20";
const SNAKE_COLOUR = "#c2c2c2";
const FOOD_COLOUR = "#e66916";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = canvas.height = 400;

const FRAME = 3;
const SCALE = 20;
const COLUMNS = canvas.width / SCALE;
const ROWS = canvas.height / SCALE;

let pos, velocity, food, snake;

// restart the game
function init() {
  pos = { x: 10, y: 10 };
  velocity = { x: 0, y: 0 };

  snake = [
    { x: 8, y: 10 },   
    { x: 9, y: 10 },
    { x: 10, y: 10 },
  ];

  randomFood();
}

function end() {
  velocity = { x: 0, y: 0 };
}
init();

function randomFood() {
  food = {
    x: Math.floor(Math.random() * COLUMNS),
    y: Math.floor(Math.random() * ROWS),
  };

  // if food is eaten, call it again
  for (let cell of snake) {
    if (cell.x === food.x && food.y === cell.y) {
      return randomFood();
    }
  }
}

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft": {
      return (velocity = { x: -1, y: 0 });
    }
    case "ArrowUp": {
      return (velocity = { x: 0, y: -1 });
    }
    case "ArrowRight": {
      return (velocity = { x: 1, y: 0 });
    }
    case "ArrowDown": {
      return (velocity = { x: 0, y: 1 });
    }
  }
});

setInterval(() => {
  requestAnimationFrame(gameLoop);
}, 1000 / FRAME);

function gameLoop() {
  // fill background
  ctx.fillStyle = BG_COLOUR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = SNAKE_COLOUR;
  for (let cell of snake) {
    ctx.fillRect(cell.x * SCALE, cell.y * SCALE, SCALE, SCALE);
  }

  ctx.fillStyle = FOOD_COLOUR;
  ctx.fillRect(food.x * SCALE, food.y * SCALE, SCALE, SCALE);

  pos.x += velocity.x;
  pos.y += velocity.y;

  // Rule 1
  // if (pos.x < 0 || pos.x > T || pos.y < 0 || pos.y > T) {
  //   init();
  // }

  if (pos.x > COLUMNS) {
    pos.x = 0;
  }

  if (pos.y > ROWS) {
    pos.y = 0;
  }

  if (pos.x < 0) {
    pos.x = COLUMNS - 1;
  }

  if (pos.y < 0) {
    pos.y = ROWS - 1;
  }

  // eat
  if (food.x === pos.x && food.y === pos.y) {
    snake.push({ ...pos });
    pos.x += velocity.x;
    pos.y += velocity.y;
    randomFood();
  }

  // move
  if (velocity.x || velocity.y) {
    for (let cell of snake) {
      if (cell.x === pos.x && cell.y === pos.y) {
        return end();
      }
    }
    snake.push({ ...pos });
    snake.shift(); // remove item from the beginning
  }
}
