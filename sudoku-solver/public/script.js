// script.js
async function fetchSudoku() {
    const response = await fetch('http://localhost:3000/sudoku');
    return response.json();
}

async function solveSudoku(board) {
    const response = await fetch('http://localhost:3000/solve', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ board }),
    });
    return response.json();
}

function renderSudoku(board) {
    const container = document.getElementById('sudoku-container');
    container.innerHTML = ''; // Clear the grid
    board.forEach((row) => {
        row.forEach((value) => {
            const cell = document.createElement('div');
            cell.classList.add('grid-item');
            cell.textContent = value === 0 ? '' : value; // Display empty for 0
            container.appendChild(cell);
        });
    });
}

// Initialize the grid and load the Sudoku puzzle
fetchSudoku().then(renderSudoku);

// Event listener for the "Show Solutions" button
document.getElementById('show-solves').addEventListener('click', async () => {
    const cells = document.querySelectorAll('.grid-item');
    const board = [];
    
    // Fill the board from the displayed Sudoku
    for (let i = 0; i < 9; i++) {
        board[i] = [];
        for (let j = 0; j < 9; j++) {
            const cell = cells[i * 9 + j];
            board[i][j] = parseInt(cell.textContent) || 0; // Use 0 for empty cells
        }
    }

    const solvedBoard = await solveSudoku(board);
    renderSudoku(solvedBoard);
});
