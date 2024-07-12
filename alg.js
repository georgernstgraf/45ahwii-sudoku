
let recursionDepth = 0;
let maxRecursionDepth = 0;


function getCell(row, col) {
    return board[row][col];
}
function setCell(row, col, value) {
    board[row][col] = value;
}

function isValidInRow(row, value) {
    return !board[row].includes(value);
}
function isValidInColumn(col, value) {
    for (let i = 0; i < 9; i++) {
        if (board[i][col] === value) {
            return false;
        }
    }
    return true;
}
function isValidInBlock(row, col, value) {
    const blockRow = Math.floor(row / 3) * 3;
    const blockCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[blockRow + i][blockCol + j] === value) {
                return false;
            }
        }
    }
    return true;
}




function solveSudoku() {

    recursionDepth++;

    if (recursionDepth > maxRecursionDepth) {
        maxRecursionDepth = recursionDepth;
    }

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValidInRow(row, num) && isValidInColumn(col, num) && isValidInBlock(row, col, num)) {
                        board[row][col] = num;
                        if (solveSudoku()) {
                            recursionDepth--;
                            return true;
                        }
                        board[row][col] = 0;
                    }
                }
                recursionDepth--;


                return false;


            }
        }
    }

    recursionDepth--;


    return true;
}
function printBoard() {
    for (let row of board) {
        console.log(row.join(' '));
    }
}
console.log("Ursprüngliches Sudoku:");
printBoard();

if (solveSudoku()) {
    console.log("\nGelöstes Sudoku:");
    printBoard();
    console.log("\nMaximale Rekursionstiefe:", maxRecursionDepth);
} else {
    console.log("\nKeine Lösung gefunden.");
}