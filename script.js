// creates the initial grid and UI
let gridSize = 16; //intended 16x16
let userColor = "bisque"; //defaulted to bisque
let isRainbow = false;
let squareWidthHeight = "10px"; //defaulted to 10px
const gridWidth = 760; //px
const gridHeight = gridWidth;
const container = document.querySelector(".container");
container.style.maxWidth = String(gridWidth) + "px"; // no need to set maxHeight also
printGrid(gridSize);
makePresetColors();

function printGrid(_gridSize) {
  removeAllChild(container);
  for (let i = 1; i <= _gridSize ** 2; i++) {
    const square = document.createElement("div");
    square.classList = "square";
    //square.textContent = i;
    // takes into account the border thickness when computing the square size
    setSquareSize(square, _gridSize);
    square.addEventListener("mouseover", () => {
      if (!isRainbow) {
        square.style.backgroundColor = userColor;
      } else {
        // random rgb color when "rainbow" mode is active
        let randomR = Math.floor(Math.random() * 256);
        let randomG = Math.floor(Math.random() * 256);
        let randomB = Math.floor(Math.random() * 256);
        let randomRGB = `rgb(${randomR}, ${randomG}, ${randomB})`;
        square.style.backgroundColor = randomRGB;
      }
    });
    container.appendChild(square);
  }
}

function setSquareSize(_square, _gridSize) {
  let squareStyleBorder = (_square.style.border = "1px solid slategrey");
  let squareStyleBorderSize = squareStyleBorder.charAt(0);
  squareWidthHeight =
    String(gridWidth / _gridSize - 2 * squareStyleBorderSize) + "px";
  _square.style.width = squareWidthHeight;
  _square.style.height = squareWidthHeight;
}

// creates the button to make a new grid based on input
const newGridBtn = document.querySelector(".new-grid");
newGridBtn.addEventListener("click", () => {
  gridSize = prompt("Enter the size of the grid (1-100)");
  if (gridSize > 0 && gridSize <= 100) {
    printGrid(gridSize);
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

// button to reset grid
const resetBtn = document.querySelector(".reset-btn");
resetBtn.addEventListener("click", () => {
  printGrid(gridSize);
});

// button for color picking
const changeColorBtn = document.querySelector(".change-color-btn");

function promptColor() {
  let color = prompt("type the name of a color:");
  return color;
}

function setCurrentColor() {
  const currentColor = document.querySelector(".current-color");
  currentColor.textContent = userColor;
  currentColor.style.backgroundColor = userColor;
}

changeColorBtn.addEventListener("click", () => {
  userColor = promptColor();
  setCurrentColor();
});

// preset colors
function makePresetColors() {
  const presetColors = document.querySelectorAll(".preset-colors button");
  presetColors.forEach((button) => {
    button.style.width = squareWidthHeight;
    button.style.height = squareWidthHeight;
    button.style.backgroundColor = button.className;

    button.addEventListener("click", () => {
      userColor = button.className;
      setCurrentColor();
      if (userColor == "rainbow") isRainbow = true;
    });
  });
}
