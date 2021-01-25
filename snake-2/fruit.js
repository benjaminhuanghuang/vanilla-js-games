class Fruit {
  constructor(rows, columns, scale) {
    this.rows = rows;
    this.columns = columns;
    this.scale = scale;

    this.pickLocation();
  }

  pickLocation() {
    this.x = (Math.floor(Math.random() *
      this.columns - 1) + 1) * this.scale;
    this.y = (Math.floor(Math.random() *
      this.rows - 1) + 1) * this.scale;
  }
  draw() {
    ctx.fillStyle = "#4cafab";
    ctx.fillRect(this.x, this.y, this.scale, this.scale);
  }
}

/*
function Fruit() {
  this.x;
  this.y;

  this.pickLocation = function() {
    this.x = (Math.floor(Math.random() *
      columns - 1) + 1) * scale;
    this.y = (Math.floor(Math.random() *
      rows - 1) + 1) * scale;
  }

  this.draw = function() {
    ctx.fillStyle = "#4cafab";
    ctx.fillRect(this.x, this.y, scale, scale)
  }
}
*/
