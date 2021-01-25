


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