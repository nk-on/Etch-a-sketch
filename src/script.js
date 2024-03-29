const gridRange = document.querySelector("#grid-range");
const gridlabel = document.querySelector("#grid-label")
const colorPicker = document.querySelector("#color-picker");
const colorModeButton = document.querySelector('[color-mode]');
const rainbowModeButton = document.querySelector('[rainbow-mode]');
const eraserButton = document.querySelector('[eraser]');
const clearButton = document.querySelector('[clear]');
const drawingBoard = document.querySelector(".board");
const buttons = document.querySelectorAll("button")
function createGrid(gridNumber) {
    const gridRow = Math.sqrt(gridNumber);
    //cleaning up exsisting grid in order to draw new 
    if (drawingBoard.innerHTML.length > 0) {
        drawingBoard.innerHTML = "";
    };
    //creating grid based on gridNumber
    for (let i = 0; i < gridNumber; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.style.flex = `${100 / gridRow}%`;
        drawingBoard.appendChild(square);
    };
    gridlabel.textContent = `${gridRow}X${gridRow}`;
    const squares = document.querySelectorAll(".square");
    //adding default color mode to the squares
    squares.forEach((square) => {
        square.addEventListener("mousemove", displaySelectedColor);
    });
};
//function responsible for changing drawing mode
function manageMode() {
    const squares = document.querySelectorAll(".square");
    const mode = this.dataset.mode;
    switch (mode) {
        case "clear":
            squares.forEach((square) => {
                clearBoard(square);
            });
            break;
        case "rainbow-mode":
            squares.forEach((square) => {
                square.removeEventListener("mousemove", displayRainbowColor);
                square.addEventListener("mousemove", displayRainbowColor);
            });
            break;
        case "eraser":
            squares.forEach((square) => {
                square.removeEventListener("mousemove", eraseColor);
                square.addEventListener("mousemove", eraseColor);
            });
            break;
        default:
            squares.forEach((square) => {
                square.removeEventListener("mousemove", displaySelectedColor);
                square.addEventListener("mousemove", displaySelectedColor);
            });
            break;
    };
};
function displaySelectedColor() {
    this.style.background = colorPicker.value;
};
function displayRainbowColor() {
    const rainbowHexCodes = ['#FF0000', '#FFA500', '#FFFF00', '#008000', '#0000FF', '#4B0082', '#EE82EE'];
    const randomIdx = Math.floor(Math.random() * rainbowHexCodes.length - 1);
    this.style.background = rainbowHexCodes[randomIdx];
};
function eraseColor() {
    this.style.background = "#ededed";
};
function clearBoard(square) {
    square.style.background = "#fff";
};
//creating grid based on range value
gridRange.addEventListener("change", () => {
    createGrid(gridRange.value ** 2);
});
buttons.forEach((button) => {
    button.addEventListener("click", manageMode);
});
createGrid(16);
