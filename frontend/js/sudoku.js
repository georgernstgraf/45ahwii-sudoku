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
            doMassimos();  // grid befüllen mit new Cell()'s
            const countAfter = this.grid.cellCount();
            if (countBefore === countAfter) break;  // nix mehr zu holen
            countBefore = countAfter;
        }
        const massimos = this.grid.cellCount() - countBefore;
        if (massimos > 0) {
            console.log(`Massimo found ${massimos} new values / depth: ${this.#recursion_depth}`);
        }
        // b) amin / andreas
        countBefore = this.grid.cellCount();
        while (true) {
            doAminAndreas(); // grid befüllen mit new Cell()'s
            const countAfter = this.grid.cellCount();
            if (countBefore === countAfter) break;  // nix mehr zu holen
            countBefore = countAfter;
        }
        const aminadreas = this.grid.cellCount() - countBefore;
        if (aminadreas > 0) {
            console.log(`Amin / Andreas found ${aminadreas} new values / depth: ${this.#recursion_depth}`);
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
            console.error("ERROR: Sudoku is already solved, but you called solve().");
            return;
        };
        const newCellCount = this.solveObvious();
        if (newCellCount > 0) {
            console.log(`obvious found ${newCellCount} new values at depth ${this.#recursion_depth}`);
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
        Array.from(domNode.querySelectorAll(".grid-item")).forEach(e => e.innerHTML = "");
        for (let pos in this.grid.data) {
            domNode.querySelector(`#${pos}`).innerText = this.grid.data[pos];
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
    constructor(obj) {
        const data = {};
        Object.assign(data, obj);
        this.data = data;
        if (!this.isValid()) {
            throw new Error("Invalid grid");
        }
    }
    getCell(position) {
        return this.data[position];
    }
    setCell(position, value) {
        if (!value instanceof Cell) {
            throw new Error("Value must be an instance of Cell");
        }
        this.data[position] = value;
    }
    allEmptyCellNames() { // TODO #8
    }
    isFull() {
        return this.allEmptyCellNames().length === 0;
    }
    cellCount() {
        return Object.keys(this.data).length;
    }
    isValid() {
        // throw new Error("not implemented");
        return true; // TODO: implement}
    }
}
const myExports = { Sudoku, Cell, colNames, rowNames, Grid };
if (typeof window != 'undefined') {  // browser
    Object.assign(window, myExports);
} else {  // node
    module.exports = myExports;
}