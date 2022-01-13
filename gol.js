// function createEmptyGrid(numCols, numRows) {
//     let grid = new Array(numRows);
//     for (let i = 0; i < numRows; i++) {
//         grid[i] = new Array(numCols);
//     }
//     return grid;
// }

// function clearGrid(grid, numCols, numRows) {
//     for (let y = 0; y < numRows; y++) {
//         for (let x = 0; x < numCols; x++) {
//             grid[y][x] = 0;
//         }
//     }
//     return grid;
// }

// function setGrid(grid, gridSetup, numCols, numRows) {
//     clearGrid(grid, numCols, numRows);
//     gridSetup.forEach((coord) => {
//         grid[coord[1]][coord[0]] = 1;
//     })
// }

function arrsAreEqual(arr1, arr2) {
    if (arr1.length != arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] != arr2[i]) {
            return false;
        }
    }
    return true;
}

function removeFromArr(arr, elem) {
    let index;
    for (let i = 0; i < arr.length; i++) {
        if (arrsAreEqual(arr[i], elem)) {
            index = i;
            break;
        }
        if (i == arr.length-1) {
            return 'ELEMENT IS NOT HERE BRO';
        }
    } 
    arr.splice(index, 1);
    return arr 
}

function detCellState(coord, gridSetup) {
    return Number(gridSetup.some((elem) => arrsAreEqual(elem, coord))) 
}

function detNumLiveNeighbours(coord, gridSetup) {
    let numLiveNeighbours = 0;
    let xCoord = coord[0];
    let yCoord = coord[1];
    
    for (let x = xCoord-1; x <= xCoord+1; x++) {
        for (let y = yCoord-1; y <= yCoord+1; y++) {
            if (!arrsAreEqual([x, y], coord)) {
                if (detCellState([x, y], gridSetup)) {
                    numLiveNeighbours += 1;
                }
            }
        }
    } 
    return numLiveNeighbours;
}

function detCellNextState(coord, gridSetup) {
    let curState = detCellState(coord, gridSetup);
    let numLiveNeighbours = detNumLiveNeighbours(coord, gridSetup);
    if (curState == 0) {
        return (Number(numLiveNeighbours == 3));
    } else {
        return (Number((numLiveNeighbours == 2) || (numLiveNeighbours == 3)));
    }
}

function detGridNextState(curGridSetup, numCols, numRows) {
    let newGridSetup = [];
    for (let y = 0; y < numRows; y++) {
        for (let x = 0; x < numCols; x++) {
            if (detCellNextState([x, y], curGridSetup)) {
                newGridSetup.push([x, y]);
            }
        }
    }
    return newGridSetup;
}

let gridSetup;
let numLiveNeighbours;
let nextState, nextGridState;
gridSetup = [[5,5], [5,6], [5,7], [6,7], [7, 6]]


// DRAWING

let numCols, numRows;
let cellSize;
let canvasWidth, canvasHeight;
let speed;
let refreshIntervalId;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

numCols = 70;
numRows = 30;
cellSize = 20;
speed = 300;

canvasWidth = numCols * cellSize;
canvasHeight = numRows * cellSize;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

function drawGridLines(numCols, numRows, cellSize) {
    ctx.strokeStyle = 'rgb(150, 150, 150)';
    for (let x = 0; x < numCols+1; x++) {
        xPos = x * cellSize;
        ctx.beginPath();
        ctx.moveTo(xPos, 0);
        ctx.lineTo(xPos, canvas.height);
        ctx.stroke()
    }
    for (let y = 0; y < numRows+1; y++) {
        yPos = y * cellSize;
        ctx.beginPath();
        ctx.moveTo(0, yPos);
        ctx.lineTo(canvas.width, yPos);
        ctx.stroke()
    }
}

function drawGrid(gridSetup, numCols, numRows, cellSize) {
    let xPos, yPos;
    ctx.fillStyle = 'rgb(20, 20, 20)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGridLines(numCols, numRows, cellSize);
    for (let y = 0; y < numRows; y++) {
        for (let x = 0; x < numCols; x++) {
            if (detCellState([x, y], gridSetup)) {
                xPos = x * cellSize;
                yPos = y * cellSize;
                ctx.fillStyle = 'white';
                ctx.strokeStyle = 'rgb(150, 150, 150)'
                ctx.fillRect(xPos, yPos, cellSize, cellSize);
                ctx.strokeRect(xPos, yPos, cellSize, cellSize);
            }
        }
    }
}

function runGame() {
    gridSetup = detGridNextState(gridSetup, numCols, numRows);
    drawGrid(gridSetup, numCols, numRows, cellSize);
}

function gameButtonHandler() {
    let buttonState = document.getElementById('gameButton').textContent;
    if (buttonState == 'Start') {
        refreshIntervalId = setInterval(runGame, speed);
        document.getElementById('gameButton').textContent = 'Stop';
    } 
    else {
        clearInterval(refreshIntervalId);
        document.getElementById('gameButton').textContent = 'Start';
    }
}

function getMousePos(event) {
    let canvasRect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - canvasRect.left,
        y: event.clientY - canvasRect.top,
    };
}

function detCellClicked(event, cellSize) { 
    let mousePos, x, y;
    mousePos = getMousePos(event);
    x = Math.floor(mousePos.x / cellSize);
    y = Math.floor(mousePos.y / cellSize);
    return [x, y];
}

function switchCellState(event) {
    let curState, nextState;
    cellClicked = detCellClicked(event, cellSize);
    curState = detCellState(cellClicked, gridSetup);
    nextState = !(Boolean(curState));
    if (nextState) {
        gridSetup.push(cellClicked)
    }
    else {
        gridSetup = removeFromArr(gridSetup, cellClicked);
    }
    drawGrid(gridSetup, numCols, numRows, cellSize);
}

function clearGrid() {
    gridSetup = [];
    drawGrid(gridSetup, numCols, numRows, cellSize); 
}

function setup() {
    drawGrid(gridSetup, numCols, numRows, cellSize);
    canvas.addEventListener('click', switchCellState);
}

window.onload = setup;