/*let sudokuiscorrect = false;
let board = []

(function() {

    window.addEventListener('load', generateSudoku);
    document.addEventListener('DOMContentLoaded', generateSudoku);

    generateSudoku();
    console.log("Script loaded");
})();

function generateSudoku() {
    console.log("generateSudoku function called");
    const cells = document.getElementsByClassName('sudoku-cell');
    console.log(`Found ${cells.length} cells`);
    
    for (let cell of cells) {
        const x = cell.getAttribute('data-x');
        const y = cell.getAttribute('data-y');
        cell.textContent = Math.floor(Math.random() * 9) + 1;
        console.log(`Set value for cell: x=${x}, y=${y}`);
    }
}

function checkSudoku(){

    for (let j = 1; j++; j<=9 ){
    for (let i=1;i++;i<=9){







        let xs =[0,0,0,0,0,0,0,0,0]
        document.querySelector(`.sudoku-cell[data-x=${i}][data-y=${j}]`)



    }}
    xs.sort
    cell.getAttribute()
    

    let ys = [0,0,0,0,0,0,0,0,0]


    
    ys.sort

        if (xs[i] == xs[i+1]){
            generateSudoku
        }
    



}
        */


// Initialize the 2D array
let sudokuBoard = [];

// Function to create and initialize the 2D array
function initializeSudokuBoard() {
    sudokuBoard = Array(9).fill().map(() => Array(9).fill(0));
}

// Function to generate random numbers for the Sudoku board
function generateSudoku() {
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            sudokuBoard[y][x] = Math.floor(Math.random() * 9) + 1;
        }
    }
}

// Function to update the HTML display based on the 2D array
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

function main() {
    console.log("Main function called");
    checkHTMLStructure();
    initializeSudokuBoard();
    generateSudoku();
    updateDisplay();
    console.log("Sudoku board generated and displayed");
}

// Call the main function when the page loads
document.addEventListener('DOMContentLoaded', function() {

    main();
});

// Also attach main to the window object in case you need to call it manually
window.main = main;

function checkHTMLStructure() {
    const grid = document.querySelector('.sudoku-grid');
    if (!grid) {
        console.error("Sudoku grid container not found!");
        return;
    }

    const cells = grid.children;
    console.log(`Found ${cells.length} direct children in the grid`);

    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        console.log(`Cell ${i}:`, {
            class: cell.className,
            'data-x': cell.dataset.x,
            'data-y': cell.dataset.y
        });
    }
}