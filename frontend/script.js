import { Sudoku, Cell } from './sudoku.js';

// do whatever you like with the solutions
window.Sudoku = Sudoku;
window.Cell = Cell;

const state = resetState();

function resetState() {
    return {
        sudoku: null,
        foundSolutions: [],
        recursionDepth: 0,
        maxSolutions: 7,
        allSteps: []
    };
};
function fetchSudoku(url) {
    fetch(url).then((obj) => {
        state.sudoku = new Sudoku(obj, state);
    }



