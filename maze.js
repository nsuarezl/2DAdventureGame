var canvas = document.getElementById("maze-canvas");
var ctx = canvas.getContext("2d");
canvas.width = 64*64;
canvas.height = 64*64;

// Set the size of the maze
var rows = 16;
var cols = 16;
// Create an empty 2D array to represent the maze
var maze = new Array(rows);
for (var i = 0; i < maze.length; i++) {
  maze[i] = new Array(cols);
}

// Initialize the maze with all walls
for (var row = 0; row < rows; row++) {
  for (var col = 0; col < cols; col++) {
    maze[row][col] = 1;
  }
}

// Create a recursive function to generate the maze
function generateMaze(row, col) {
  var directions = ["up", "down", "left", "right"];
  shuffle(directions);

  for (var i = 0; i < directions.length; i++) {
    var newRow = row;
    var newCol = col;

    if (directions[i] === "up") {
      newRow = row - 2;
    } else if (directions[i] === "down") {
      newRow = row + 2;
    } else if (directions[i] === "left") {
      newCol = col - 2;
    } else if (directions[i] === "right") {
      newCol = col + 2;
    }

    if (newRow > 0 && newRow < rows - 1 && newCol > 0 && newCol < cols - 1) {
      if (maze[newRow][newCol] === 1) {
        maze[newRow][newCol] = 0;
        maze[row + (newRow - row) / 2][col + (newCol - col) / 2] = 0;
        generateMaze(newRow, newCol);
      }
    }
  }
}

// Shuffle an array
function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// Start generating the maze from a random cell
var startRow = Math.floor(Math.random() * rows);
var startCol = Math.floor(Math.random() * cols);
generateMaze(startRow, startCol);

function bricks(x,y){
  ctx.fillStyle = "rgba(234,170,0, 1)";
  ctx.fillRect(x * 64, y * 64, 64, 64);
  ctx.fillStyle = "rgba(200,170,0, 1)";
  ctx.fillRect(x * 64 + 5, y * 64 + 5, 54, 54);
}

for (var y = 0; y < maze.length; y++) {
  for (var x = 0; x < maze[y].length; x++) {
    if (maze[y][x] === 1) {
      bricks(x,y)
      
      ctx.fillStyle = "brown";
      ctx.fillRect(x * 64 + 22, y * 64 + 44, 20, 20);
      
      // Draw the tree crown
      ctx.beginPath();
      ctx.arc(x * 64 + 42, y * 64 + 30, 20, 0, 2 * Math.PI);
      ctx.arc(x * 64 + 20, y * 64 + 30, 20, 0, 2 * Math.PI);
      ctx.arc(x * 64 + 30, y * 64 + 20, 20, 0, 2 * Math.PI);
      ctx.fillStyle = "green";
      ctx.fill();
    } else {
      // Draw the interior of the maze
      bricks(x,y)
    }
    // Check if the current position is on the border of the maze
    if (y === 0 || y === maze.length - 1 || x === 0 || x === maze[y].length - 1) {
      // Draw the border of the maze with red brick texture
      ctx.fillStyle = "rgba(255, 0, 0, 1)";
      ctx.fillRect(x * 64, y * 64, 64, 64);
      ctx.fillStyle = "rgba(150, 0, 0, 0.5)";
      ctx.fillRect(x * 64 + 5, y * 64 + 5, 54, 54);
    }
  }
}