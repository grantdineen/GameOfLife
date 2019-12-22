
const HEIGHT = 800;
const WIDTH = 800;
const SQUARES_PER_ROW = 30;
const SQUARES_PER_COL = 30;

let board = [];

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//on mouse click listener
canvas.addEventListener('click', function (event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    let colIndex = Math.floor(y / HEIGHT * SQUARES_PER_COL);
    let rowIndex = Math.floor(x / WIDTH * SQUARES_PER_ROW);
    board[colIndex][rowIndex] = 1;
    drawBoard();
}, false);

function initializeArray() {
    board = [SQUARES_PER_COL];
    for (let i = 0; i < SQUARES_PER_COL; i++) {
        board[i] = [];
        for (let j = 0; j < SQUARES_PER_ROW; j++) {
            board[i][j] = 0;
        }
    }
}

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

initializeArray();
drawBoard();