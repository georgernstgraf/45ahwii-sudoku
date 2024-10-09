// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { solveSudoku } = require('./sudoku');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Sample Sudoku puzzle (0 represents empty cells)
const sampleSudoku = [
    [0, 0, 0, 0, 7, 0, 1, 0, 0],
    [3, 0, 0, 0, 7, 8, 0, 0, 0],
    [8, 0, 0, 0, 0, 0, 9, 2, 0],
    [0, 0, 9, 0, 0, 0, 7, 4, 0],
    [0, 1, 0, 0, 0, 0, 0, 5, 0],
    [4, 0, 0, 0, 2, 0, 0, 0, 7],
    [7, 0, 0, 8, 0, 0, 0, 4, 0],
    [0, 0, 3, 0, 0, 4, 0, 0, 5],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

// Endpoint to get the sample Sudoku puzzle
app.get('/sudoku', (req, res) => {
    res.json(sampleSudoku);
});

// Endpoint to solve the Sudoku puzzle
app.post('/solve', (req, res) => {
    const { board } = req.body;
    const solvedBoard = solveSudoku(board);
    res.json(solvedBoard);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
