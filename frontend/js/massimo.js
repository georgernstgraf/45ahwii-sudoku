const fs = require('fs');


const data = fs.readFileSync('unsolvedSudoku3.json', 'utf8');
const board = JSON.parse(data);

function printBoard(board) {
    for (let row of board) {
        console.log(row.join(' '));
    }
}


 
function findEmpty(board) {
   
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                EmptyCells.push([row, col]);
                
            }
        }
    }
    return EmptyCells;

}


function isValid(board, num, pos) {

    const [row, col] = pos;
    
    for (let i = 0; i < board[row].length; i++) {
        if (board[row][i] === num && i !== col) {
            return false;
        }
    }
                                                 
  
    for (let i = 0; i < board.length; i++) {
        if (board[i][col] === num && i !== row) {
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
}
function solveSudoku(board) {
   
    findEmpty(board);

    function setNumbers() {
        for (let [row, col] of EmptyCells) {
            for (let num = 1; num <= 9; num++) {
                if (isValid(board, num, [row, col])) {
                    board[row][col] = num;
                    if (setNumbers()) {
                        return true;
                    }
                    board[row][col] = 0; 
                }
            }
            return false; 
        }
        return true; 
    }

    return setNumbers();
}




if (solveSudoku(board)) {

    printBoard(board);
} else {
    return false;
}
