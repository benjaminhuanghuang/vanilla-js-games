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

let scroe = 0;
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

class Player {
  constructor() {
    this.x = CANVAS_WIDTH / 2;
    this.y = CANVAS_HEIGHT / 2;
    this.radius = 50;
    this.angle = 0;
    // frame index in the sprite sheet
    this.frameX = 0;
    this.fraemY = 0;
    this.frame = 0;
    this.spriteWidth = 498;
    this.spriteWidth = 327;
  }

  update() {
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    if (mouse.x != this.x) {
      this.x -= dx/30;  // give a speed
    }
    if (mouse.y != this.y) {
      this.y -= dy/30;
    }
  }

  draw (){
    if(mouse.click){ 
      ctx.lineWidth = 0.2;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    }

    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();
    ctx.fillRect(this.x, this.y, this.radius, 10);
  }
}

const player = new Player();

/*
  main loop
*/
function mainLoop(){
  ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
  player.update();
  player.draw();

  requestAnimationFrame(mainLoop);
}
mainLoop();