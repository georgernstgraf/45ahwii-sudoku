import { Sudoku, Cell } from "./sudoku.js";

// do whatever you like with the solutions
window.Sudoku = Sudoku;
window.Cell = Cell;

const rows = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
const collumns = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

const state = {};

function initGrid() {
    const grid = document.getElementById("sudoku-container");
    for (let collumn of collumns) {
        for (let row of rows) {
            const cell = document.createElement("div");
            cell.classList.add("grid-items");
            cell.id = row + collumn;
            cell.textContent = row + collumn;
            console.log(row + collumn);
            grid.appendChild(cell);
        }
    }
}

function resetState() {
    Object.assign(state, {
        sudoku: null,
        foundSolutions: [],
        recursionDepth: 0,
        maxSolutions: 7,
        allSteps: [],
        intervalId: NaN,
    });
}
function fetchSudoku(url) {
    fetch(url)
        .then((obj) => {
            resetState();
            state.sudoku = new Sudoku(obj, state);
        })
        .catch((e) => console.error(e));
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
initGrid();
