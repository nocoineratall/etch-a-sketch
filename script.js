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
    square.style.color = "grey";
    // takes into account the border thickness when computing the square size
    let squareStyleBorder = (square.style.border = "1px solid black");
    let squareStyleBorderSize = squareStyleBorder.charAt(0);
    square.style.width =
      String(gridWidth / _gridSize - 2 * squareStyleBorderSize) + "px";
    square.style.height =
      String(gridHeight / _gridSize - 2 * squareStyleBorderSize) + "px";
    container.appendChild(square);
  }
}

// creates the button to make a new grid base on input
const newGridBtn = document.querySelector(".new-grid");
newGridBtn.addEventListener("click", () => {
  gridSize = prompt("Enter the size of the grid");
  newGrid(gridSize);
});

//empties the grid
function removeAllChild(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
