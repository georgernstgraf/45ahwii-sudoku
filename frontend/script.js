// do whatever you like with the solutions

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
    }).catch(e => {
        console.error(e);
        error$.innerText = e.message;
    });
}
// 3 - dom node refs
const error$ = document.getElementById('error');
// 5 -render functions
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
// 6 Event Handlers
function onSelectSudoku() {
    const beispieleSelect$ = document.getElementById('beispieleSelect');
    const url = beispieleSelect$.value;
    console.log("now fetching: ", url);
    fetchSudoku(url);
}