// creates the initial grid and UI
let gridSize = 16; //intended 16x16
let userColor = "bisque"; //defaulted to bisque
let isRainbow = false;
let squareSize = "10px"; //defaulted to 10px
let gridThickness = "1px";
const gridWidth = 640; //px
const gridHeight = gridWidth;
const container = document.querySelector(".container");
const square = document.createElement("div");
container.style.maxWidth = String(gridWidth) + "px"; // no need to set maxHeight also

//mode selection
const modeInputs = document.querySelectorAll("input");
let mode = "mouseover"; //defaulted to flow mode
modeInputs.forEach((input) => {
  input.addEventListener("click", () => {
    if (input.value == "flow") mode = "mouseover";
    if (input.value == "point") mode = "click";
    printGrid(gridSize, square);
  });
});

printGrid(gridSize, square);
makePresetColors();

function printGrid(_gridSize, _square) {
  removeAllChild(container);
  for (let i = 1; i <= _gridSize ** 2; i++) {
    const tempSquare = document.createElement("div");
    tempSquare.classList = "square";
    tempSquare.style = _square.style.backgroundColor;
    tempSquare.style.width = calcSquareSize(_gridSize, tempSquare);
    tempSquare.style.height = calcSquareSize(_gridSize, tempSquare);

    tempSquare.addEventListener(mode, () => {
      if (!isRainbow) {
        tempSquare.style.backgroundColor = userColor;
      } else {
        // random rgb color when "rainbow" mode is active
        let randomR = Math.floor(Math.random() * 256);
        let randomG = Math.floor(Math.random() * 256);
        let randomB = Math.floor(Math.random() * 256);
        let randomRGB = `rgb(${randomR}, ${randomG}, ${randomB})`;
        tempSquare.style.backgroundColor = randomRGB;
      }
    });
    container.appendChild(tempSquare);
  }
}

// allows the grid toggle to rebuild the current grid as it is
function printSingleSquare(_gridSize, _currentSquare) {
  const tempSquare = document.createElement("div");
  tempSquare.classList = "square";
  tempSquare.style.backgroundColor = _currentSquare.style.backgroundColor;
  tempSquare.style.width = calcSquareSize(_gridSize, tempSquare);
  tempSquare.style.height = calcSquareSize(_gridSize, tempSquare);

  tempSquare.addEventListener("click", () => {
    if (!isRainbow) {
      tempSquare.style.backgroundColor = userColor;
    } else {
      // random rgb color when "rainbow" mode is active
      let randomR = Math.floor(Math.random() * 256);
      let randomG = Math.floor(Math.random() * 256);
      let randomB = Math.floor(Math.random() * 256);
      let randomRGB = `rgb(${randomR}, ${randomG}, ${randomB})`;
      tempSquare.style.backgroundColor = randomRGB;
    }
  });
  container.appendChild(tempSquare);
}

function calcSquareSize(_gridSize, _square) {
  let squareStyleBorder =
    (_square.style.border = `${gridThickness} solid black`);
  let squareStyleBorderSize = squareStyleBorder.charAt(0);
  // takes into account the border thickness when computing the square size
  squareSize = String(gridWidth / _gridSize - 2 * squareStyleBorderSize) + "px";
  return squareSize;
}

// makes a new grid based on input
const newGridBtn = document.querySelector(".new-grid");
newGridBtn.addEventListener("click", () => {
  gridSize = prompt("Enter the size of the grid (1-100)");
  if (gridSize > 0 && gridSize <= 100) {
    printGrid(gridSize, square);
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

// Turns grid On-Off
function toggleGridOnOff(currentGridThickness) {
  if (currentGridThickness == "0px") gridThickness = "1px";
  if (currentGridThickness == "1px") gridThickness = "0px";

  // saves current grid, clears it and prints
  let currentGrid = document.querySelectorAll(".container .square");
  removeAllChild(container);
  currentGrid.forEach((currentSquare) => {
    printSingleSquare(gridSize, currentSquare);
  });
}

const gridSelector = document.querySelector(".grid-selector-btn");
gridSelector.addEventListener("click", () => {
  toggleGridOnOff(gridThickness);
});

// button to reset grid
const resetBtn = document.querySelector(".reset-btn");
resetBtn.addEventListener("click", () => {
  printGrid(gridSize, square);
});

// button for color picking
const changeColorBtn = document.querySelector(".change-color-btn");

function promptColor() {
  isRainbow = false;
  let color = prompt("type the name of a color:");
  return color;
}

function setCurrentColor() {
  const currentColor = document.querySelector(".current-color");
  currentColor.textContent = userColor;
  if (!isRainbow) {
    currentColor.style.backgroundColor = userColor;
  } else {
    currentColor.style.backgroundColor = "rgb(120, 194, 255)";
  }
}

changeColorBtn.addEventListener("click", () => {
  userColor = promptColor();
  setCurrentColor();
});

// preset colors
function makePresetColors() {
  const presetColors = document.querySelectorAll(".preset-colors button");
  presetColors.forEach((button) => {
    button.style.width = squareSize;
    if (button.className == "rainbow-mode") {
      button.style.width = 2 * squareSize;
    }
    button.style.height = squareSize;
    button.style.backgroundColor = button.className;

    button.addEventListener("click", () => {
      userColor = button.className;
      isRainbow = false;
      if (userColor == "rainbow-mode") {
        isRainbow = true;
      }
      setCurrentColor();
    });
  });
}
