
## Key
Response to input
``` 
  document.addEventListener("keydown", inputHandeler);

  function inputHandler(event) {

  }
```


## Mouse

```
  let canvasPosition = canvas.getBoundingClientRect();

  /*
    the x, y are related to the browser window
  */
  canvas.addEventListener("mousedown", (e) => {
    console.log(e.x, e.y);

    mouse.x = e.x - canvasPosition.left;
    mouse.y = e.y - canvasPosition.top;
  });

  canvas.addEventListener("mouseup", (e) => {
  });
```