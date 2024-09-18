const colNames = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
const rowNames = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
class Sudoku {
    #recursion_depth;
    _maxSolutions;
    _data;
    _foundSolutions;
    constructor({ data, recursionDepth, state }) {
        this.grid = new Grid(data);
        this.recursionDepth = recursionDepth;
        this.state = state;
    }

    solveObvious() {
        // so lange obviuos felder befüllen bis sich nix mehr tut
        // a) massimo  // TODO fehler in schleife
        const countInital = this.grid.cellCount();
        let countBefore = countInital;
        while (true) {
            doMassimos(); // grid befüllen mit new Cell()'s
            const countAfter = this.grid.cellCount();
            if (countBefore === countAfter) break; // nix mehr zu holen
            countBefore = countAfter;
        }
        const massimos = this.grid.cellCount() - countBefore;
        if (massimos > 0) {
            console.log(
                `Massimo found ${massimos} new values / depth: ${
                    this.#recursion_depth
                }`
            );
        }
        // b) amin / andreas
        countBefore = this.grid.cellCount();
        while (true) {
            doAminAndreas(); // grid befüllen mit new Cell()'s
            const countAfter = this.grid.cellCount();
            if (countBefore === countAfter) break; // nix mehr zu holen
            countBefore = countAfter;
        }
        const aminadreas = this.grid.cellCount() - countBefore;
        if (aminadreas > 0) {
            console.log(
                `Amin / Andreas found ${aminadreas} new values / depth: ${
                    this.#recursion_depth
                }`
            );
        }
        return this.grid.cellCount() - countInital;
    }
    makeAssumptions() {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators
        // iterator bauen, der neue Sudoku Objekte liefert!!
        for (sudoku of this.assumptions()) {
            sudoku.solve();
            if (this.state.foundSolutions <= this.state.maxSolutions) break;
        }
        return;
    }
    // probiere für jede Annahme das Sudoku neu zu lösen
    solve() {
        if (this.grid.isFull()) {
            console.error(
                "ERROR: Sudoku is already solved, but you called solve()."
            );
            return;
        }
        const newCellCount = this.solveObvious();
        if (newCellCount > 0) {
            console.log(
                `obvious found ${newCellCount} new values at depth ${
                    this.#recursion_depth
                }`
            );
        }
        if (this.grid.isFull()) {
            if (!this.grid.isValid()) {
                throw new Error("PANIC: Grid is full but invalid");
            }
            this.state.foundSolutions.push(this.grid);
            return;
        }
        this.makeAssumptions();
    }
    renderInto(domNode) {
        Array.from(domNode.querySelectorAll(".grid-item")).forEach(
            (e) => (e.innerHTML = "")
        );
        for (let pos in this.grid.data) {
            domNode.querySelector(`#${pos}`).innerText = this.grid.data[pos];
        }
        for (let pos in this.grid.data) {
            const yo = document.getElementById(`#${pos}`);
            yo.classList = "recursionDepth-" + this.recursionDepth;
        }
    }
}
class Cell {
    constructor(position, value, recursionDepth, isAssumption) {
        this.position = position; // zb "a1"
        this.value = value; // zb 9
        this.recursionDepth = recursionDepth; // beginnend mit 0
        this.isAssumption = isAssumption;
    }
}
class Grid {
    colNames = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
    rowNames = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

    constructor(obj) {
        const data = {};
        Object.assign(data, obj);
        this.data = data;
        if (!this.isValid()) {
            throw new Error("Invalid grid");
        }
    }

    setCell(position, value) {
        if (!value instanceof Cell) {
            throw new Error("Value must be an instance of Cell");
        }
        this.data[position] = value;
    }
    allEmptyCellNames() {
        // TODO #8
    }
    isFull() {
        return this.allEmptyCellNames().length === 0;
    }
    cellCount() {
        return Object.keys(this.data).length;
    }

    isValidRows() {
        for (let rowName of rowNames) {
            if (this.isValidRow(rowName) === false) return false;
        }
        return true;
    }
    isValidRow(rowName) {
        console.log("Checking row " + rowName);
        const set = new Set();
        for (let colName of colNames) {
            const cell = colName + rowName;
            if (this.data[cell] == undefined) continue;

            if (set.has(this.data[cell])) return false;
            set.add(this.data[cell]);
            console.log(set);
            console.log("row " + rowName + " is valid");
        }
        return true;
    }

    isValidCols() {
        for (let colName of colNames) {
            if (this.isValidCol(colName) == false) return false;
        }
        return true;
    }
    isValidCol(colName) {
        console.log("Checking col " + colName);
        const set = new Set();
        for (let rowName of rowNames) {
            const cell = colName + rowName;
            if (this.data[cell] == undefined) continue;
            if (set.has(this.data[cell])) {
                console.log("col " + colName + " is invalid");
                return false;
            }
            set.add(this.data[cell]);
            console.log(set);
        }
        return true;
    }

    isValidSquares() {
        for (let i = 1; i <= 9; i++) {
            if (this.isValidSquare(i) === false) return false;
        }
        return true;
    }

    isValidSquare(num) {
        const keys = getSubGridKeys(num);
        for (let i = 0; i < keys.length; i++) {
            const set = new Set();
            for (let j = 0; j < keys.length; j++) {
                const cell = keys[j];
                if (this.data[cell] == undefined) continue;
                if (set.has(this.data[cell])) return false;
                set.add(this.data[cell]);
            }
        }
        return true;
    }
    getSubGridKeys(num) {
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

    isValid() {
        if (this.isValidRows() === false) {
            console.log("Rows are invalid");

            return false;
        }
        if (this.isValidCols() === false) {
            console.log("Cols are invalid");
            return false;
        }
        if (this.isValidSquares() === false) {
            console.log("Squares are invalid");
            return false;
        }
        console.log("Grid is valid");
        return true;
    }
}
const myExports = { Sudoku, Cell, colNames, rowNames, Grid };
if (typeof window != "undefined") {
    // browser
    Object.assign(window, myExports);
} else {
    // node
    module.exports = myExports;
}
