
## Method 3
```
let lastTime = 0;
function gameLoop(timestamp) {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  game.update(deltaTime);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
```

## Method 1
```
  /*
    main loop
  */
  function mainLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    update();

    draw();

    requestAnimationFrame(mainLoop);
  }
  mainLoop();
```


##  Method 2
```
setInterval(() => {
  requestAnimationFrame(gameLoop);
}, 1000 / FR);

```