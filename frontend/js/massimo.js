const fs = require('fs');
const data = fs.readFileSync('C:\\Users\\rober\\Documents\\SWP Sudoko\\45ahwii-sudoku-1\\frontend\\js\\unsolvedSudoku5.json', 'utf8');
const board = JSON.parse(data);
let EmptyCells;

function printBoard() {
    for (let row of board) {
        console.log(row.join(' '));
    }
}

function populateEmptyCells() {
    EmptyCells = [];
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                EmptyCells.push([row, col]);
            }
        }
    }
}

function isPossible(num, pos) {
    const { row, col } = pos;
    // check whether num is already in row
    for (let i = 0; i < board[row].length; i++) {
        if (i == col) continue;
        if (board[row][i] === num) {
            return false;
        }
    }

    for (let i = 0; i < board.length; i++) {
        if (i == row) continue;
        if (board[i][col] === num) {
            return false;
        }
    }
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
        for (let j = boxCol; j < boxCol + 3; j++) {
            if (board[i][j] === num && (i !== row || j !== col)) {
                return false;
            }
        }
    }
    return true;
}

function setNumber(num, pos) {
    const { row, col } = pos;
    board[row][col] = num;
}

function setObviousNumbers() {
    let foundCount;
    let round = 0;
    do {
        foundCount = 0;
        populateEmptyCells();
        for (let [row, col] of EmptyCells) {
            let possibleNumbers = [];


            for (let num = 1; num <= 9; num++) {
                if (isPossible(num, { row, col })) {
                    possibleNumbers.push(num);
                }
            }


            if (possibleNumbers.length === 1) {
                let num = possibleNumbers[0];
                setNumber(num, { row, col });
                foundCount++;
            }
        }
        round++;
        console.log(`Round ${round}: found ${foundCount} new numbers`);
    } while (foundCount > 0);
}


function solveSudoku() {
    setObviousNumbers();
}
printBoard();
solveSudoku();
printBoard();