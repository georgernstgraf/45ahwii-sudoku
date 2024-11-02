import { Sudoku } from './sudoku.js';
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    // 1: State
    const state = {
        maxSolutions: 1,
    };
    // 2: State access and mod
    function resetState() {
        Object.assign(state, {
            sudoku: null,
            original: null,
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
            subgrid.classList.add("border");
            subgrid.classList.add("border-2");
            subgrid.classList.add("rounded-2");
            subgrid.id = "subgrid-" + i;
            for (let key of getSubGridKeys(i)) {
                const cell = document.createElement("div");
                cell.classList.add("grid-item");
                cell.classList.add("border");
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
        resetState();
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const obj = await response.json();
        const sudoku = new Sudoku({ data: obj, recursionDepth: 0, state });
        state.sudoku = sudoku;
        state.original = new Sudoku(sudoku);
    }

    // 3 - dom node refs
    const error$ = document.getElementById("error");
    const sudokuGrid$ = document.getElementById("sudoku-container");
    state.domNode = sudokuGrid$;
    const beispieleSelect$ = document.getElementById("beispieleSelect");
    const maxSolutionsIn$ = document.getElementById("max-solves-in");
    const maxSolutionsOut$ = document.getElementById("max-solves-out");
    const solvesCountOut$ = document.getElementById("solves-count-out");
    const startSolving$ = document.getElementById("start-solving");
    const stopSolving$ = document.getElementById("stop-solving");
    // 4 - dom node creation
    // 5 -render functions
    function render() {
        // den gesamten state in den div.
        // elementen anzeigen
        if (state.sudoku) {
            try {
                state.sudoku.render(sudokuGrid$);
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
        solvesCountOut$.innerText = state.foundSolutions.length;
    };

    function displaySudoku(sudoku) {
        sudoku.render(sudokuGrid$);
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
    function onStopSolving() {
        clearInterval(state.interval);
        state.interval = undefined;
    }
    function onStartSolving() {
        if (!state.sudoku) {
            state.error = "No Sudoku loaded";
            render();
            return;
        }
        state.error = "Now solving ..";
        state.sudoku.solve();
        // state.error ="OK";
        state.interval = setInterval(nextStep, 200);
    }
    function nextStep() {
        let obj = state.allSteps.pop();
        if (!obj) obj = [undefined, undefined];
        const [sud, func] = obj;
        if (state.foundSolutions.length >= state.maxSolutions || !sud || !func) {
            if (state.foundSolutions.length >= state.maxSolutions) {
                console.info("Stop. Enough solutions");
            }
            if (!sud) {
                console.info("Stop. No sud");
            }
            if (!func) {
                console.info("Stop. No func");
            }
            onStopSolving();
            state.sudoku = state.foundSolutions[0];
            state.error = "OK";
            render();
            return;
        }
        func();
        state.sudoku = sud;
        render();
    }
    // 7 - init bindings
    maxSolutionsIn$.onchange = onMaxSolutionsSlider;
    stopSolving$.onclick = onStopSolving;
    startSolving$.onclick = onStartSolving;
    beispieleSelect$.onchange = onSelectSudoku;
    const self = this;
    // 8 - initial render
    // Your initialization code here
    initGrid();
    resetState();
    maxSolutionsIn$.value = state.maxSolutions;
    window.gg = {
        "s": state, "d": displaySudoku,
    };
    render();
});