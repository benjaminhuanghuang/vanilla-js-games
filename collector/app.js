// Globals
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 500;

const canvas = document.getElementById("game_canvas");
// css did not set the canvas.width/height
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
const ctx = canvas.getContext("2d");
ctx.font = "50px Georgia";
let canvasPosition = canvas.getBoundingClientRect();

let score = 0;
let gameFrame = 0;

const mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  click: false,
};
/*
  the x, y are related to the browser
*/
canvas.addEventListener("mousedown", (e) => {
  mouse.click = true;
  mouse.x = e.x - canvasPosition.left;
  mouse.y = e.y - canvasPosition.top;
});

canvas.addEventListener("mouseup", (e) => {
  mouse.click = false;
});

/*
  Player
*/
const playerLeft = new Image();
playerLeft.src = "images/fish_left.png";
const playerRight = new Image();
playerRight.src = "images/fish_right.png";

class Player {
  constructor() {
    this.x = CANVAS_WIDTH / 2;
    this.y = CANVAS_HEIGHT / 2;
    this.radius = 50;
    this.angle = 0;
    // frame index in the sprite sheet
    this.frameX = 0;
    this.frameY = 0;
    this.frame = 0;
    this.spriteWidth = 498;
    this.spriteHeight = 327;
  }

  update() {
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    let theta = Math.atan2(dy, dx);
    this.angle = theta;

    if (mouse.x != this.x) {
      this.x -= dx / 30; // give a speed
    }
    if (mouse.y != this.y) {
      this.y -= dy / 30;
    }
  }

  draw() {
    if (mouse.click) {
      ctx.lineWidth = 0.2;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    }
    //* For debugging  
    // ctx.fillStyle = "red";
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    // ctx.fill();
    // ctx.closePath();
    // ctx.fillRect(this.x, this.y, this.radius, 10);

    // ctx.save();
    // ctx.translate(this.x, this.y);
    // ctx.rotate(this.angle);

    let spriteImg = playerLeft;
    if (this.x < mouse.x) {
      spriteImg = playerRight;
    }
    ctx.drawImage(
      spriteImg,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.x - 60,
      this.y - 45,
      this.spriteWidth / 4,
      this.spriteHeight / 4
    );
    // ctx.restore();
  }
}

const player = new Player();

/*
  Bubbles
*/
const bubblesArray = [];
class Bubble {
  constructor() {
    this.x = Math.random() * CANVAS_WIDTH;
    this.y = CANVAS_HEIGHT + 100;
    this.radius = 50;
    this.speed = Math.random() * 5 + 1;
    this.distance;
    this.counted = false;
    this.sound = Math.random() <= 0.5 ? "sound1" : "sound2";
  }

  update() {
    this.y -= this.speed;
    const dx = this.x - player.x;
    const dy = this.y - player.y;
    this.distance = Math.sqrt(dx * dx + dy * dy);
  }

  draw() {
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
  }
}
const bubblePop1 = document.createElement("audio");
bubblePop1.src = "sounds/bubble.wav";

const bubblePop2 = document.createElement("audio");
bubblePop2.src = "sounds/plop.ogg";

function handleBubbles() {
  if (gameFrame % 50 === 0) {
    bubblesArray.push(new Bubble());
  }

  for (let i = 0; i < bubblesArray.length; i++) {
    bubblesArray[i].update();
    bubblesArray[i].draw();

    let bubble = bubblesArray[i];
    if (bubblesArray[i].y < 0 - bubblesArray[i].radius * 2) {
      bubblesArray.splice(i, 1);
    }
    if (bubble) {
      // collision
      if (bubble.distance < bubble.radius + player.radius) {
        if (!bubble.counted) {
          if (bubble.sound === "sound1") {
            bubblePop1.play();
          } else {
            bubblePop2.play();
          }
          score++;
          bubble.counted = true;
        }
        bubblesArray.splice(i, 1);
      }
    }
  }
}

/*
  main loop
*/
function mainLoop() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  handleBubbles();
  player.update();
  player.draw();
  ctx.fillStyle = "black";
  ctx.fillText("Score: " + score, 10, 50);
  gameFrame++;
  requestAnimationFrame(mainLoop);
}
mainLoop();
