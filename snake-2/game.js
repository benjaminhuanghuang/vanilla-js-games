const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const scale = 10;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let gameFrame = 0;

const snake = new Snake(scale);
const fruit = new Fruit(rows, columns, scale);


document.addEventListener("keydown", (e) => {
  const direction = e.key.replace('Arrow', '');
  snake.changeDirection(direction);
});


/*
  main loop
*/
function mainLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fruit.draw();
  snake.update();
  snake.draw();

  if (snake.eat(fruit)) {
    fruit.pickLocation();
  }
  snake.checkCollision();

  document.querySelector('.score').innerText = snake.total;
  gameFrame++;
  requestAnimationFrame(mainLoop);
}
mainLoop();
