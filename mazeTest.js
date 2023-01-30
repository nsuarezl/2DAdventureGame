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
      this.canvas.width = 32*32;
      this.canvas.height = 32*32;
      this.blockSize = 64;
    }
    
    generate() {
      for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.cols; col++) {
          this.grid[row][col] = Math.random() > 0.7 ? 1 : 0;
        }
      }
      console.log(this.grid)
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
            this.grid[row][col] = 1
            this.ctx.fillStyle = "rgba(255, 0, 0, 1)";
            this.ctx.fillRect(row * 64, col * 64, 64, 64);
            this.ctx.fillStyle = "rgba(150, 0, 0, 0.5)";
            this.ctx.fillRect(row * 64 + 5, col * 64 + 5, 54, 54);
          }
        }
      }
    }
    addPlayer(player) {
        this.player = player;
        this.player.draw();
    }
    addEnemy(enemy,enemy1,enemy2){
        this.enemy = enemy;
        this.enemy1 = enemy1;
        this.enemy2 = enemy2;
        enemy.draw();
        enemy1.draw();
        enemy2.draw();
    }
  }


class Entity{

    constructor(health){
        this.health = 100;
    }

    draw() {
        this.maze.ctx.fillStyle = this.color;
        this.maze.ctx.fillRect(
          this.x * this.blockSize,
          this.y * this.blockSize,
          this.blockSize,
          this.blockSize
        );
        this.drawHealthBar();
      }
  
      drawHealthBar() {
          this.maze.ctx.fillStyle = "red";
          this.maze.ctx.fillRect(
            this.x * this.blockSize,
            (this.y + 1) * this.blockSize,
            this.blockSize,
            5
          );
          this.maze.ctx.fillStyle = "green";
          this.maze.ctx.fillRect(
            this.x * this.blockSize,
            (this.y + 1) * this.blockSize,
            (this.blockSize * this.health) / 100,
            5
          );
    }


}

class Player extends Entity{
    constructor(maze, x, y, color,health) {
      super(health);
      this.maze = maze;
      this.x = x;
      this.y = y;
      this.color = color;
      this.blockSize = maze.blockSize;
    }
    
    moveUp() {
        if (this.maze.grid[this.x][this.y-1] !== 1 ) {
            this.y -= 1;
            console.log(this.maze.grid[this.x][this.y -1])
        }
    }
  
    moveDown() {
        if (this.y < this.maze.rows - 1 && this.maze.grid[this.x][this.y+1] !== 1) {
            this.y += 1;
        }
    }
  
    moveLeft() {
        if (this.x > 0 && this.maze.grid[this.x-1][this.y] !== 1) {
            this.x -= 1;
        }
    }
  
    moveRight() {
        if (this.x < this.maze.cols - 1 && this.maze.grid[this.x+1][this.y] !== 1) {
            this.x += 1;
        }
    }
}
        

class Enemy extends Entity{
    constructor(maze, color, startX, startY,health) {
      super(health)
      this.maze = maze;
      this.color = color;
      this.blockSize = this.maze.blockSize;
      this.health = 100;
      this.x = startX;
      this.y = startY;
    }
    
    move() {
      // Generate a random number to determine the direction of movement
      let move = Math.floor(Math.random() * 4);
      switch (move) {
        case 0:
          if (this.y > 0 && this.maze.grid[this.x][this.y-1] !== 1) {
            this.y -= 1;
          }
          break;
        case 1:
          if (
            this.y < this.maze.rows - 1 &&
            this.maze.grid[this.x][this.y+1] !== 1
          ) {
            this.y += 1;
          }
          break;
        case 2:
          if (this.x > 0 && this.maze.grid[this.x-1][this.y] !== 1) {
            this.x -= 1;
          }
          break;
        case 3:
          if (
            this.x < this.maze.columns - 1 &&
            this.maze.grid[this.x+1][this.y] !== 1
          ) {
            this.x += 1;
          }
          break;
      }
    }
  }
        
        
        

  
  const maze = new Maze(16, 16, "maze-canvas");
  maze.generate();
  maze.render();
  
  const player = new Player(maze, 1, 1, "red");
        maze.addPlayer(player);
        
        document.addEventListener("keydown", (event) => {
        switch (event.keyCode) {
        case 37:
        player.moveLeft();
        break;
        case 38:
        player.moveUp();
        break;
        case 39:
        player.moveRight();
        break;
        case 40:
        player.moveDown();
        break;
        }
        maze.render();
        player.draw();
        enemy1.draw();
        enemy2.draw();
        enemy3.draw();
        });
const enemy1 = new Enemy(maze, "red", 5, 5);
const enemy2 = new Enemy(maze, "blue", 10, 10);
const enemy3 = new Enemy(maze, "green", 11, 11);

maze.addEnemy(enemy1,enemy2,enemy3)
setInterval(() => {
    
    enemy1.move();
    enemy2.move();
    enemy3.move();
    maze.render();
    player.draw();
    enemy1.draw();
    enemy2.draw();
    enemy3.draw();
    
  }, 500);