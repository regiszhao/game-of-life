function createEmptyGrid(numCols, numRows) {
    let grid = new Array(numRows);
    for (let i = 0; i < numRows; i++) {
        grid[i] = new Array(numCols);
    }
    return grid;
}

function clearGrid(grid, numCols, numRows) {
    for (let y = 0; y < numRows; y++) {
        for (let x = 0; x < numCols; x++) {
            grid[y][x] = 0;
        }
    }
    return grid;
}

function setGrid(grid, gridSetup, numCols, numRows) {
    clearGrid(grid, numCols, numRows);
    
    gridSetup.forEach((coord) => {
        grid[coord[1]][coord[0]] = 1;
    })
}

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

function detCurCellState(coord, gridSetup) {
    return Number(gridSetup.some((elem) => arrsAreEqual(elem, coord))) 
}

function detNumLiveNeighbours(coord, gridSetup) {
    let numLiveNeighbours = 0;
    let xCoord = coord[0];
    let yCoord = coord[1];
    
    for (let x = xCoord-1; x <= xCoord+1; x++) {
        for (let y = yCoord-1; y <= yCoord+1; y++) {
            if (!arrsAreEqual([x, y], coord)) {
                if (detCurCellState([x, y], gridSetup)) {
                    console.log([x,y])
                    numLiveNeighbours += 1;
                }
            }
        }
    } 
    return numLiveNeighbours;
}

function detCellNextState(coord, gridSetup) {
    let curState = detCurCellState(coord, gridSetup);
    let numLiveNeighbours = detNumLiveNeighbours(coord, gridSetup);
    if (curState == 0) {
        return (Number(numLiveNeighbours == 3));
    } else {
        return (Number((numLiveNeighbours == 2) || (numLiveNeighbours == 3)));
    }
}

let numCols, numRows, gridSetup;
let numLiveNeighbours;
let nextState;
numCols = 10;
numRows = 10;
gridSetup = [[0,0], [4,5], [8,2], [1,0], [2,1], [3,1]];
let grid = createEmptyGrid(numCols, numRows);
clearGrid(grid, numCols, numRows);
setGrid(grid, gridSetup, numCols, numRows)
console.table(grid)
numLiveNeighbours = detNumLiveNeighbours([0,0], gridSetup)
console.log(numLiveNeighbours)
nextState = detCellNextState([4,5], gridSetup)
console.log(nextState)