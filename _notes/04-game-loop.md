

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