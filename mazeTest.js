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
          this.grid[row][col] = Math.random() > 0.85 ? 1 : 0;
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

      if(player.canMove() === false){
        console.log("ded");
        maze.ctx.font = "100px Arial";
        maze.ctx.fillStyle = "red";
        maze.ctx.fillText("YOU LOSE", 256, 512);
        
      }
      if(enemy1.canMove() === false && enemy2.canMove() === false && enemy3.canMove() === false ){
        console.log("ded");
        maze.ctx.font = "100px Arial";
        maze.ctx.fillStyle = "green";
        maze.ctx.fillText("YOU WIN", 256, 512);
        
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
    addPotion(potion,potion1){
        potion.draw();
        potion1.draw();
    }
  }


class Entity{
    
    constructor(health,maxHealth,atk,def){
        this.health = 500;
        this.maxHealth=1000;
        this.atk=1;
        this.def=1;
        
    }

    h(){
        return this.health;
    }
    
    canMove(){
        if (this.health>0){
            
            return true;
            
        }
        this.color = "black";
        console.log("was")
        return false;
        
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
            (this.blockSize * this.health) / this.maxHealth,
            5
          );
    }

}

class Player extends Entity{
    constructor(maze, x, y, color,imgSrc,health,maxHealth,atk,def) {
      super(health,maxHealth,atk,def);
     
      this.maze = maze;
      this.x = x;
      this.y = y;
      this.color = color;
      this.blockSize = maze.blockSize;
      this.attack = (atk-20)*Math.floor(Math.random() * 6)+1;
      this.imgSrc=imgSrc;
    }

    checkColission(enemy,potion1,potion2){
        if(this.x === enemy.x && this.y === enemy.y)
            enemy.health-=this.attack;
        if(this.x === potion1.x && this.y === potion1.y){
            this.health+=potion1.reward;
            potion.reward = 0;
            potion1.color = "black"
        }
        if(this.x === potion2.x && this.y === potion2.y){
            this.attack+=potion2.reward;
            potion2.reward = 0;
            potion2.color = "black"
        }
    }
    
    draw() {
      let img = new Image();
      img.src = this.imgSrc;
      
      this.maze.ctx.drawImage(img,this.x * this.blockSize, this.y * this.blockSize,this.blockSize,this.blockSize)
      // this.maze.ctx.fillRect(
      //   this.x * this.blockSize,
      //   this.y * this.blockSize,
      //   this.blockSize,
      //   this.blockSize
      // );
      this.drawHealthBar()
    }
    
    moveUp() {
        if(this.canMove()){
            if (this.maze.grid[this.x][this.y-1] !== 1 ) {
                this.y -= 1;
                this.checkColission(enemy1,potion,potion1);
                this.checkColission(enemy2,potion,potion1);
                this.checkColission(enemy3,potion,potion1);
                    
            }
        }
    }
  
    moveDown() {
        if(this.canMove()){
            if (this.y < this.maze.rows - 1 && this.maze.grid[this.x][this.y+1] !== 1 ) {
                this.y += 1;
                this.checkColission(enemy1,potion,potion1);
                this.checkColission(enemy2,potion,potion1);
                this.checkColission(enemy3,potion,potion1);
            }
        }
       
    }
  
    moveLeft() {
        if(this.canMove()){
            if (this.x > 0 && this.maze.grid[this.x-1][this.y] !== 1) {
                this.x -= 1;
                console.log("left");
                this.checkColission(enemy1,potion,potion1);
                this.checkColission(enemy2,potion,potion1);
                this.checkColission(enemy3,potion,potion1);
            }
        }
        
    }
  
    moveRight() {
        if(this.canMove()){
            if (this.x < this.maze.cols - 1 && this.maze.grid[this.x+1][this.y] !== 1) {
                this.x += 1;
                this.checkColission(enemy1,potion,potion1);
                this.checkColission(enemy2,potion,potion1);
                this.checkColission(enemy3,potion,potion1);
                
            }
        }
        
        
    }
    
}
        

class Enemy extends Entity{
    constructor(maze, color, startX, startY,imgSrc,health,maxHealth,atk,def) {
      super(health,maxHealth,atk,def)
      this.maze = maze;
      this.color = color;
      this.blockSize = this.maze.blockSize;
      this.x = startX;
      this.y = startY;
      this.attack = (atk-player.def)*(Math.floor(Math.random() * 6)+1);
      this.imgSrc = imgSrc;
    }
    checkColission(player){
        if(this.x === player.x && this.y === player.y)
            
            player.health-=this.attack;
            console.log(player.health)
    }

    draw() {
      let img1 = new Image();
      img1.src = this.imgSrc;
      
      this.maze.ctx.drawImage(img1,this.x * this.blockSize, this.y * this.blockSize,this.blockSize,this.blockSize)
      // this.maze.ctx.fillRect(
      //   this.x * this.blockSize,
      //   this.y * this.blockSize,
      //   this.blockSize,
      //   this.blockSize
      // );
      this.drawHealthBar()
    }

    move() {
      // Generate a random number to determine the direction of movement
      let move = Math.floor(Math.random() * 4);
      switch (move) {
        case 0:
          if(this.canMove()){
            if (this.y > 0 && this.maze.grid[this.x][this.y-1] !== 1 ) {
                this.y -= 1;
                this.checkColission(player);
              }
              break;
          }
          
        case 1:
          if(this.canMove()){
            if (
                this.y < this.maze.rows - 1 &&
                this.maze.grid[this.x][this.y+1] !== 1
              ) {
                this.y += 1;
                this.checkColission(player);
              }
              break;
          }
          
        case 2:
        if(this.canMove()){
            if (this.x > 0 && this.maze.grid[this.x-1][this.y] !== 1) {
                this.x -= 1;
                this.checkColission(player);
              }
              break;
        }
          
        case 3:
          if(this.canMove()){
            if (
                this.x < this.maze.columns - 1 &&
                this.maze.grid[this.x+1][this.y] !== 1
              ) {
                this.x += 1;
                this.checkColission(player);
              }
              break;
          }
          
      }
    }
  }
        
        
        
class Potions{
    constructor(reward,color){
        this.reward = reward;
        this.color = color
    }
    draw() {
        this.maze.ctx.fillStyle = "purple";
            this.maze.ctx.fillRect(this.x * 64 + 20, this.y * 64+5, 20, 40);
            
            // Draw the tree crown
            this.maze.ctx.beginPath();
            this.maze.ctx.arc(this.x * 64 + 42, this.y * 64 + 45, 20, 0, 2 * Math.PI);
            this.maze.ctx.arc(this.x * 64 + 20, this.y * 64 + 45, 20, 0, 2 * Math.PI);
            this.maze.ctx.arc(this.x * 64 + 30, this.y * 64 + 35, 20, 0, 2 * Math.PI);
            this.maze.ctx.fillStyle = this.color;
            this.maze.ctx.fill();
            
    
    }
    checkColission(){
        if(this.maze.grid[this.x][this.y] ===1)
            this.x+=0;
            this.y-=0;
    }

}

class healthPotion extends Potions{
    constructor(maze,reward,color,x,y){
        super(reward);
        this.maze = maze;
        this.color = color;
        this.blockSize = this.maze.blockSize;
        this.x = x;
        this.y = y;
        this.checkColission();
    }
}

class fightPotion extends Potions{
    constructor(maze,reward,color,x,y){
        super(reward);
        this.maze = maze;
        this.color = color;
        this.blockSize = this.maze.blockSize;
        this.x = x;
        this.y = y;
        this.checkColission();
    }
}


  const maze = new Maze(16, 16, "maze-canvas");
  maze.generate();

var playerx=Math.floor(Math.random() *15)+1;
var playery=Math.floor(Math.random() *15)+1;
console.log(playerx);
console.log(playery);
while(maze.grid[playerx][playery] === 1){
  playerx=Math.floor(Math.random() *15)+1;
  playery=Math.floor(Math.random() *15)+1;
}

var enemy1x=Math.floor(Math.random() *15)+1;
var enemy1y=Math.floor(Math.random() *15)+1;

while(maze.grid[enemy1x][enemy1y] === 1){
  enemy1x=Math.floor(Math.random() *15)+1;
  enemy1y=Math.floor(Math.random() *15)+1;
}


var enemy2x=Math.floor(Math.random() *15)+1;
var enemy2y=Math.floor(Math.random() *15)+1;
while(maze.grid[enemy2x][enemy2y] === 1){
  enemy2x=Math.floor(Math.random() *15)+1;
  enemy2y=Math.floor(Math.random() *15)+1;
}


var enemy3x=Math.floor(Math.random() *15)+1;
var enemy3y=Math.floor(Math.random() *15)+1;

while(maze.grid[enemy3x][enemy3y] === 1){
  enemy3x=Math.floor(Math.random() *15)+1;
  enemy3y=Math.floor(Math.random() *15)+1;
}


  const player = new Player(maze, playerx, playery, "red","player.png");

  const enemy1 = new Enemy(maze, "red", enemy1x, enemy1y,'monstr.png');
  const enemy2 = new Enemy(maze, "blue", enemy2x, enemy2y,'monsterblu.png');
  const enemy3 = new Enemy(maze, "green", enemy3x, enemy3y,'monsterpink.png');

maze.addEnemy(enemy1,enemy2,enemy3)
  maze.render();
  
  

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
        potion.draw();
        potion1.draw();
        enemy1.draw();
        enemy2.draw();
        enemy3.draw();
        });



        

setInterval(() => {
 
    
    enemy1.move();
    enemy2.move();
    enemy3.move();
    maze.render();
    player.draw();
    potion.draw();
    potion1.draw();
    enemy1.draw();
    enemy2.draw();
    enemy3.draw();
   
    
    
  }, 500);

  var potx=Math.floor(Math.random() *15)+1;
  var poty=Math.floor(Math.random() *15)+1;
  
  while(maze.grid[potx][poty] === 1){
    potx=Math.floor(Math.random() *15)+1;
    poty=Math.floor(Math.random() *15)+1;
  }
  var pot1x=Math.floor(Math.random() *15)+1;
  var pot1y=Math.floor(Math.random() *15)+1;
  
  while(maze.grid[pot1x][pot1y] === 1){
    pot1x=Math.floor(Math.random() *15)+1;
    pot1y=Math.floor(Math.random() *15)+1;
  }
const potion= new healthPotion(maze,200,"#00FF00",potx,poty);
const potion1= new fightPotion(maze,200,"#FF4433",pot1x,pot1y);
maze.addPotion(potion,potion1);