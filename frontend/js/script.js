// do whatever you like with the solutions
const state = { error: "OK" };
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
        }
    }
    error$.innerText = state.error;
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
    console.log("now fetching: ", url);
    state.error = "now fetching";
    try {
        await fetchSudoku(url);
        state.error = "OK";
    }
    catch (e) {
        state.error = e.message;
    };
    render();
}

// 7 - was war das noch?
// 8 - initial render
initGrid();
render();