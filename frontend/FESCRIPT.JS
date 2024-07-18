// Initialize the 2D array
let sudokuBoard = [];

// Function to create and initialize the 2D array
function initializeSudokuBoard() {
    sudokuBoard = Array(9).fill().map(() => Array(9).fill(0));
}

getdocumentbyid('1').addEventListener('hover', function () {
    this.style.backgroundColor = 'red';
    this.style.color = 'white';
});
function getdocumentbyid(id) {
    return document.getElementById(id);
}

function updateDisplay() {
    console.log("updateDisplay function called");
    let cellsFound = 0;
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            let cell = document.querySelector(`.sudoku-cell[data-x="${x}"][data-y="${y}"]`);
            if (cell) {
                cell.textContent = sudokuBoard[y][x];
                cellsFound++;
            } else {
                console.log(`Cell not found: x=${x}, y=${y}`);
            }
        }
    }
    console.log(`Total cells found: ${cellsFound}`);

    // Check if the grid exists
    const grid = document.querySelector('.sudoku-grid');
    console.log('Grid found:', !!grid);

    // Check all cells with a single query
    const allCells = document.querySelectorAll('.sudoku-cell');
    console.log('Total .sudoku-cell elements found:', allCells.length);
}

// Function to get the value of a specific cell
function getCellValue(x, y) {
    return sudokuBoard[y][x];
}

// Function to set the value of a specific cell
function setCellValue(x, y, value) {
    sudokuBoard[y][x] = value;
    updateDisplay(); // Update the HTML to reflect the change
}

function sudokuJSONhandler() {
    fetch('../SUDOKUS/unsolvedSudoku1.json')
        .then(response => response.json())
        .then(data => {
            sudokuBoard = data;
            updateDisplay();
        })
        .catch(error => {
            console.error('Error fetching or parsing JSON:', error);
        });
}

sudokuJSONhandler();