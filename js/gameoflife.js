
const HEIGHT = 800;
const WIDTH = 800;
const SQUARES_PER_ROW = 30;
const SQUARES_PER_COL = 30;

let playButton = document.getElementById("playButton");
let randomButton = document.getElementById("randomButton");
let clearButton = document.getElementById("clearButton");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let board = [];
let isPlaying = false;

//Create 2d array intialized to 0's
function initializeArray(array) {
    array = [SQUARES_PER_COL];
    for (let i = 0; i < SQUARES_PER_COL; i++) {
        array[i] = [];
        for (let j = 0; j < SQUARES_PER_ROW; j++) {
            array[i][j] = 0;
        }
    }
    return array;
}

//randomly populate 2d array with 1's and 0's (33% chance of a live cell)
function randomizeArray(array) {
    array = [SQUARES_PER_COL];
    for (let i = 0; i < SQUARES_PER_COL; i++) {
        array[i] = [];
        for (let j = 0; j < SQUARES_PER_ROW; j++) {
            let randomNumber = getRandomNumber(1, 3);
            if (randomNumber === 3)
                array[i][j] = 1;
            else
                array[i][j] = 0;
        }
    }
    return array;
}

//play button listener
playButton.addEventListener('click', function (event) {
    playButton.textContent = isPlaying ? "Play" : "Stop";
    playButton.className = isPlaying ? "btn btn-success" : "btn btn-danger";
    isPlaying = !isPlaying;
}, false);

//random button listener
randomButton.addEventListener('click', function (event) {
    board = randomizeArray(board);
    drawBoard();
}, false);

//clear button listener
clearButton.addEventListener('click', function (event) {
    board = initializeArray(board);
    drawBoard();
}, false);

//on mouse click listener
canvas.addEventListener('click', function (event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    let colIndex = Math.floor(y / HEIGHT * SQUARES_PER_COL);
    let rowIndex = Math.floor(x / WIDTH * SQUARES_PER_ROW);
    board[colIndex][rowIndex] = board[colIndex][rowIndex] === 0 ? 1 : 0;
    drawBoard();

}, false);

//draw the grid to the canvas
function drawBoard() {
    for (let y = 0; y < HEIGHT; y += HEIGHT / SQUARES_PER_COL) {
        for (let x = 0; x < WIDTH; x += WIDTH / SQUARES_PER_ROW) {

            let colIndex = Math.round(y / HEIGHT * SQUARES_PER_COL);
            let rowIndex = Math.round(x / WIDTH * SQUARES_PER_ROW);

            if (colIndex >= SQUARES_PER_COL || rowIndex >= SQUARES_PER_ROW)
                continue;

            if (board[colIndex][rowIndex] == 1)
                ctx.fillStyle = '#000000';
            else
                ctx.fillStyle = '#ffffff';


            ctx.fillRect(x, y, WIDTH / SQUARES_PER_ROW, HEIGHT / SQUARES_PER_COL);
            ctx.strokeRect(x, y, WIDTH / SQUARES_PER_ROW, HEIGHT / SQUARES_PER_COL); // draw an outline so white squares are still visible
        }
    }
}

//update the board based on Conway's Game of Life rules
function update() {
    let tempArray;
    tempArray = initializeArray(tempArray);

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            let numOfLiveCells = getNumberOfSurroundingLiveCells(board, i, j);

            if (board[i][j] === 0 && numOfLiveCells === 3) // create new living cells
                tempArray[i][j] = 1;
            else if (board[i][j] === 1 && (numOfLiveCells < 2 || numOfLiveCells > 3)) //kill over/under populated cells
                tempArray[i][j] = 0;
            else
                tempArray[i][j] = board[i][j];
        }
    }

    board = tempArray;
}

//get the number of live cells around a particular cell
function getNumberOfSurroundingLiveCells(array, col, row) {
    let numOfLiveCells = 0;

    //get boundaries
    let colIndex = Math.max(0, col - 1);
    let colLength = Math.min(array.length - 1, col + 1);
    let rowIndex = Math.max(0, row - 1);
    let rowLength = Math.min(array[0].length - 1, row + 1);

    for (let i = colIndex; i <= colLength; i++) {
        for (let j = rowIndex; j <= rowLength; j++) {
            if (i == col && j === row)
                continue;

            if (array[i][j] === 1)
                numOfLiveCells++;
        }
    }

    return numOfLiveCells;
}

//generate a random number between two values
function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// game loop
function gameLoop() {
    if (!isPlaying)
        return;
    update();
    drawBoard();
}

board = initializeArray(board);
drawBoard();
window.setInterval(gameLoop, 250);