// 1: State
const state = { maxSolutions: 1 };
// 2: State access and mod
function resetState() {
    Object.assign(state, {
        sudoku: null,
        foundSolutions: [],
        recursionDepth: 0,
        allSteps: [],
        intervalId: NaN,
        error: "OK"
    });
}
function initGrid() {
    //Matthias war hier
    state.sudoku = null;
    const grid = sudokuGrid$;
    Array.from(sudokuGrid$.children).forEach(c => c.remove());
    for (let i = 1; i <= 9; i++) {
        const subgrid = document.createElement("div");
        subgrid.classList.add("subgrid");
        subgrid.id = "subgrid-" + i;
        for (let key of getSubGridKeys(i)) {
            const cell = document.createElement("div");
            cell.classList.add("grid-item");
            cell.id = key;
            cell.textContent = key;
            subgrid.appendChild(cell);
            // console.log(key);
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
    // console.log(keys);
    return keys;
}
async function fetchSudoku(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const obj = await response.json();
    resetState();
    const sudoku = new Sudoku({ data: obj, recursionDepth: 0, state });
    state.sudoku = sudoku;
}

// 3 - dom node refs
const error$ = document.getElementById("error");
const sudokuGrid$ = document.getElementById("sudoku-container");
const beispieleSelect$ = document.getElementById("beispieleSelect");
const maxSolutionsIn$ = document.getElementById("max-solves-in");
const maxSolutionsOut$ = document.getElementById("max-solves-out");
const solvesCountOut$ = document.getElementById("solves-count-out");
const startSolving$ = document.getElementById("start-solving");

// 4 - dom node creation
// 5 -render functions
function render() {
    // den gesamten state in den div.
    // elementen anzeigen
    console.log('render called');
    if (state.sudoku) {
        try {
            state.sudoku.renderInto(sudokuGrid$);
        }
        catch (e) {
            state.error = e.message;
            console.error(e);
        }
    }
    error$.innerText = state.error;
    if (state.error == "OK") {
        error$.classList.remove("bg-danger");
    } else {
        error$.classList.add("bg-danger");
    }
    maxSolutionsOut$.innerText = state.maxSolutions;

}

function displaySudoku(sudoku) {
    sudoku.renderInto(sudokuGrid$);
}
function displayNextStep() {
    const sudoku = state.allSteps.shift();
    displaySudoku(sudoku);
}
// 6 Event Handlers
async function onSelectSudoku() {
    const url = beispieleSelect$.value;
    console.log("start fetching: ", url);
    state.error = "now fetching";
    render();
    try {
        await fetchSudoku(url);
        state.error = "OK";
    }
    catch (e) {
        state.error = e.message;
        console.error(e);
    };
    render();
}
function onMaxSolutionsSlider() {
    state.maxSolutions = maxSolutionsIn$.value;
    render();
}
function onStartSolving() {
    if (!state.sudoku) {
        state.error = "No Sudoku loaded";
        render();
        return;
    }
    state.error = "Now solving ..";
    render();
}
// 7 - init bindings
maxSolutionsIn$.onchange = onMaxSolutionsSlider;
startSolving$.onclick = onStartSolving;
// 8 - initial render
initGrid();
resetState();
render();