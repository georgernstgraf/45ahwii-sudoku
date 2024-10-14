const express = require('express');
const sudoku = require('sudoku');
const app = express();
const port = 3000;

// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static('public'));

// API route to generate a puzzle
app.get('/generate', (req, res) => {
  const puzzle = sudoku.makepuzzle();
  res.json(puzzle);
});

// API route to solve a puzzle
app.post('/solve', express.json(), (req, res) => {
  const { puzzle } = req.body;
  const solution = sudoku.solvepuzzle(puzzle);
  res.json(solution);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
