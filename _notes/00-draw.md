Create the canvas and context
```
  <canvas id="game-canvas" width="400" height="500"></canvas>

  const gameCanvas = document.getElementById('game-canvas');
  const ctx = gameCanvas.getContext('2D');

```

Game Loop
```
fuction loop() {
  clearOrDrawBackground();
  
  draw();

  update();
  ...

  // When browser is ready to render the next frame
  requestAninationFrame(loop);
}
```

Draw rect
```
  function drawRect(x, y) {
    ctx.fillStyle = 'blue';
    ctx.fillRect(x, y, 50, 50);
  }
```

Draw box
```
  function drawBox(color, x, y, width, height) {
    ctx.strokeStyle = '#ffcd05';
    ctx.strokeRect(x, y, width, height);
  }
```

Draw circle
```
  ctx.beginPath();
  // start from 0 to 2*PI
  ctx.arc(x, y, radius, 0, Math.PI*2);
  ctx.fillStyle = "#ffcd05";
  ctx.fill();
  
  ctx.strokeStyle = "#2e3548";
  ctx.stroke();
  
  ctx.closePath();
```

Draw Image
```
  const img = new Image();
  img.src = "";

  ctx.drawImage(img, 0, 0);
```

Move object
```
  drawRect(x, y);
  ctx.clear(0,0, cvs.width, cvs.height);
  drawRect(x1, y1);
```

Response to input
``` 
  document.addEventListener("keydown", inputHandeler);

  function inputHandler(event) {

  }
```