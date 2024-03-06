// creates the initial grid and implement the function to create new grids
let gridSize = 16; //intended 16x16
const gridWidth = 640; //px
const gridHeight = gridWidth;
const container = document.querySelector(".container");
container.style.maxWidth = String(gridWidth) + "px"; // no need to set maxHeight also
newGrid(gridSize);

function newGrid(_gridSize) {
  removeAllChild(container);
  for (let i = 1; i <= _gridSize ** 2; i++) {
    const square = document.createElement("div");
    square.classList = "square";
    square.textContent = i;
    // takes into account the border thickness when computing the square size
    let squareStyleBorder = (square.style.border = "1px solid slategrey");
    let squareStyleBorderSize = squareStyleBorder.charAt(0);
    square.style.width =
      String(gridWidth / _gridSize - 2 * squareStyleBorderSize) + "px";
    square.style.height =
      String(gridHeight / _gridSize - 2 * squareStyleBorderSize) + "px";

    square.addEventListener("mouseover", () => {
      square.style.backgroundColor = "bisque";
    });
    container.appendChild(square);
  }
}

// creates the button to make a new grid based on input
const newGridBtn = document.querySelector(".new-grid");
newGridBtn.addEventListener("click", () => {
  gridSize = prompt("Enter the size of the grid (1-100)");
  if (gridSize > 0 && gridSize <= 100) {
    newGrid(gridSize);
  } else {
    alert("Input denied - Set a size from 1 to 100");
  }
});

//empties the grid
function removeAllChild(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// button to reset grid color
const resetBtn = document.querySelector(".reset-btn");
resetBtn.addEventListener("click", () => {
  newGrid(gridSize);
});
