const canvasContainer = document.querySelector('.canvas-container');

//Clear the canvas and then add CSS grid properties to the canvas element
let gridRatio = 2;
let gridSize = 10;

let mouseDown = false
window.onmousedown = () => mouseDown = true;
window.onmouseup = () => mouseDown = false;

setupNewCanvas(gridSize);
addSquares(gridSize);

//Clear the canvas and then add CSS grid properties to the canvas element
function setupNewCanvas(gridSize) {
    canvasContainer.innerHTML = '';
    canvasContainer.style.gridTemplateColumns = `repeat(${gridSize * gridRatio}, 1fr)`;
    canvasContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
};

//Add the correct amount of divs to the grid
function addSquares(gridSize) {
    for (let i = 1; i <= gridSize * (gridSize * gridRatio); i++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('grid-square');
        gridSquare.id = `Sq${i}`;
        gridSquare.addEventListener('mousedown', setBg);
        gridSquare.addEventListener('mouseover', mousetrail);
        canvasContainer.appendChild(gridSquare);
    };
};

function mousetrail(e) {
    if (mouseDown === true) {
        setBg(e);
    }
    e.target.classList.add('hover');
    e.target.addEventListener('transitionend', () => e.target.classList.remove('hover'));
};

//Change the background colour of the squares
function setBg(e) {
    if (drawMode === "Draw") {
        if (colorChoice === "Classic") {
            e.target.style.backgroundColor = "rgb(60, 60, 60)";
        } else if (colorChoice === "Rainbow") {
            //This line generates a random HEX value
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            e.target.style.backgroundColor = "#" + randomColor;
        } else if (colorChoice === "Tint") {
            tintBg(e);
        } else if (colorChoice === "70s") {
            colourSwatches(e);
        } else if (colorChoice === "Picker") {
            e.target.style.backgroundColor = pickedColor;
        };
        //If drawMode is not 'draw', assume it's 'erase' and remove the backbround colour
    } else {
        e.target.style.backgroundColor = "";
    };
};
