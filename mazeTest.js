class Maze {
    constructor(rows, cols, canvasId) {
      this.rows = rows;
      this.cols = cols;
      this.grid = new Array(rows);
      for (let i = 0; i < rows; i++) {
        this.grid[i] = new Array(cols);
      }
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas.getContext("2d");
      this.canvas.width = 64*64;
      this.canvas.height = 64*64;
      this.blockSize = 64;
    }
    
    generate() {
      for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.cols; col++) {
          this.grid[row][col] = Math.random() > 0.7 ? 1 : 0;
        }
      }
    }
    

    bricks(x,y){
        this.ctx.fillStyle = "rgba(234,170,0, 1)";
        this.ctx.fillRect(x * 64, y * 64, 64, 64);
        this.ctx.fillStyle = "rgba(200,170,0, 1)";
        this.ctx.fillRect(x * 64 + 5, y * 64 + 5, 54, 54);
    }

    render() {
      for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.cols; col++) {
          if (this.grid[row][col] === 1) {
            maze.bricks(row,col)
      
            this.ctx.fillStyle = "brown";
            this.ctx.fillRect(row * 64 + 22, col * 64 + 44, 20, 20);
            
            // Draw the tree crown
            this.ctx.beginPath();
            this.ctx.arc(row * 64 + 42, col * 64 + 30, 20, 0, 2 * Math.PI);
            this.ctx.arc(row * 64 + 20, col * 64 + 30, 20, 0, 2 * Math.PI);
            this.ctx.arc(row * 64 + 30, col * 64 + 20, 20, 0, 2 * Math.PI);
            this.ctx.fillStyle = "green";
            this.ctx.fill();
          } else {
            maze.bricks(row,col)
          }
          if (col === 0 || col === this.grid.length - 1 || row === 0 || row === this.grid[col].length - 1) {
            // Draw the border of the maze with red brick texture
            this.ctx.fillStyle = "rgba(255, 0, 0, 1)";
            this.ctx.fillRect(row * 64, col * 64, 64, 64);
            this.ctx.fillStyle = "rgba(150, 0, 0, 0.5)";
            this.ctx.fillRect(row * 64 + 5, col * 64 + 5, 54, 54);
          }
        }
      }
    }
  }
  
  const maze = new Maze(16, 16, "maze-canvas");
  maze.generate();
  maze.render();
  