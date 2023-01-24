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

// Draw the maze on the canvas
for (var row = 0; row < maze.length; row++) {
  for (var col = 0; col < maze[row].length; col++) {
    if (maze[row][col] === 1) {
    //   ctx.fillStyle = "black";
    //   ctx.fillRect(row * 64, col * 64, 64, 64);
    ctx.fillStyle = "brown";
        ctx.fillRect(row * 64 + 22, col * 64 + 44, 20, 20);
        
        // Draw the tree crown
        ctx.beginPath();
        ctx.arc(row * 64 + 42, col * 64 + 30, 20, 0, 2 * Math.PI);
        ctx.arc(row * 64 + 20, col * 64 + 30, 20, 0, 2 * Math.PI);
        ctx.arc(row * 64 + 30, col * 64 + 20, 20, 0, 2 * Math.PI);
        ctx.fillStyle = "green";
        ctx.fill();
    } else {
        ctx.fillStyle = "rgb(255,160,2)";
        ctx.fillRect(row * 64, col * 64, 64, 64);
    }
  
  }
}
