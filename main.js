const Sudoku = require('./sudoku');
const sudoku2js = require('./converter');

const converted = sudoku2js(process.argv[1]);
const sudoku = new Sudoku(converted);

const solutions = sudoku.solutions({ max: 5 });

// do whatever you like with the solutions