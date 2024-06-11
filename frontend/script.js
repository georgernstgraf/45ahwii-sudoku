import { Sudoku, Cell } from './sudoku.js';

// do whatever you like with the solutions
window.Sudoku = Sudoku;
window.Cell = Cell;

const state = {};

function resetState() {
    Object.assign(state, {
        sudoku: null,
        foundSolutions: [],
        recursionDepth: 0,
        maxSolutions: 7,
        allSteps: [],
        intervalId: NaN
    }
    );
};
function fetchSudoku(url) {
    fetch(url).then((obj) => {
        resetState();
        state.sudoku = new Sudoku(obj, state);
    }).catch(e => console.error(e));
}

function render() {
    // den gesamten state in den div.
    // elementen anzeigen
}

function displaySudoku(sudoku) {
    // sudoku im grid anzeigen
}

function displayNextStep() {
    const sudoku = state.allSteps.shift();
    displaySudoku(sudoku);
}

