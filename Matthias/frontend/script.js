import { Sudoku, Cell } from "./sudoku.js";

// do whatever you like with the solutions
window.Sudoku = Sudoku;
window.Cell = Cell;

const rows = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
const collumns = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

const state = {};

function initGrid() {
    const grid = document.getElementById("sudoku-container");

    for (let i = 1; i <= 9; i++) {
        const subgrid = document.createElement("div");
        subgrid.classList.add("subgrid");
        subgrid.id = "subgrid-" + i;
        for (let key of getSubGridKeys(i)) {
            const cell = document.createElement("div");
            cell.classList.add("grid-items");
            cell.id = key;
            cell.textContent = key;
            subgrid.appendChild(cell);
            console.log(key);
        }
        grid.appendChild(subgrid);
    }
}
function getSubGridKeys(num) {
    const col = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
    const row = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    num = num - 1;
    let firstColIndex = (num % 3) * 3;
    let firstRowIndex = Math.floor(num / 3) * 3;
    let keys = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            keys.push(col[firstColIndex + j] + row[firstRowIndex + i]);
        }
    }
    console.log(keys);
    return keys;
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
