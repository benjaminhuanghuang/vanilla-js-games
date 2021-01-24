// Globals
const canvas = document.getElementById("game_canvas");
canvas.width = 800;
canvas.height = 500;
const ctx = canvas.getContext("2d");
ctx.font = "50px Georgia";

let canvasPosition = canvas.getBoundingClientRect();

import Stage1 from "./scenes/Stage1.js";
let scene = new Stage1(canvas);

//////////////

// Global Listeners
window.addEventListener("resize", () => {
  canvasPosition = canvas.getBoundingClientRect();
});

canvas.addEventListener("mousedown", (e) => {
  mouse.click = true;
  mouse.x = e.x - canvasPosition.left;
  mouse.y = e.y - canvasPosition.top;
});

canvas.addEventListener("mouseup", (e) => {
  mouse.click = false;
});

let pause = false;
document.addEventListener("keypress", (e) => {
  if (e.code === "KeyP") {
    pause = !pause;
  }
});

// Main Loop
function gameLoop() {
  if (!pause) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    scene.step(canvas, ctx, mouse);
  }
  requestAnimationFrame(gameLoop);
}
gameLoop();
