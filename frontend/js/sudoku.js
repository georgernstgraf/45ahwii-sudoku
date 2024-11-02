import { assert } from "./chai.js";
const colNames = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
const rowNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
class Sudoku {
    constructor(obj) {
        if (obj instanceof Sudoku) {
            // do the deep copies here
            this.recursionDepth = obj.recursionDepth;
            this.state = obj.state;  // no deep copy, carry it across
            this.grid = new Grid(obj.grid);
            return;
        }
        const { data, recursionDepth, state } = obj;
        this.grid = new Grid({ data, recursionDepth });
        this.recursionDepth = recursionDepth;
        this.state = state;
    }

    storeSolution() {
        this.state.foundSolutions.push(new Sudoku(this)); // store the copy
    }
    storeStep(func) {
        this.state.allSteps.push([new Sudoku(this), func]); // store the copy
    }
    solve() {
        this.do_obvious();
        if (this.grid.isFull()) {
            this.storeSolution();
            return;
        }
        this.storeStep(this.do_solve.bind(this));
    }
    do_obvious() {
        const obviousCount = this.grid.fillObvious();
        if (!this.grid.isValid()) {
            throw new Error("Grid is not valid");
        }
        // if we have enough solutions: stop
        // store a found Solution in the state
        //if (obviousCount) {
        //    console.log(`Did ${obviousCount} obvious placements`);
        //}
        // valid
        // not full
        // everything obvious done, recursion needed
        //this.grid.setAssumptions(); only for fancy display
    }
    do_solve() {
        const assumption = this.grid.getAssumption();
        const position = Object.keys(assumption)[0];
        for (let value of assumption[position].toReversed()) {
            const sudoku = new Sudoku(this);
            sudoku.recursionDepth++;
            console.info(`Depth: ${sudoku.recursionDepth} for "${position}" I try "${value}"`);
            sudoku.grid.setCell(position, new Cell({ value, position }));
            sudoku.solve();
        }
    }

    render(domNode = this.state.domNode) {
        Array.from(domNode.querySelectorAll(".grid-item")).forEach(
            (e) => (e.innerHTML = "")
        );
        for (let pos in this.grid.data) {
            const elt = domNode.querySelector(`#${pos}`);
            const val = this.grid.data[pos].value;
            if (val)
                elt.innerText = val;
            // elt.classList = "recursionDepth-" + this.recursionDepth; TODO-evtl data-recursion=3
        }
    }
}
class Cell {
    value = false;
    constructor(par) {
        Object.assign(this, par);
    }
}
class Grid {

    constructor(par) {
        if (par instanceof Grid) {
            // need to return a copy
            this.recursionDepth = par.recursionDepth;
            this.data = {};
            Object.keys(par.data).forEach(position => { if (par.data[position].value) { this.data[position] = new Cell(par.data[position]); } });
            return;
        }
        const { recursionDepth, data } = par;
        if (!(typeof recursionDepth == "number")) {
            throw new Error(`RecursionDepth "${recursionDepth}" is not valid`);
        }
        this.recursionDepth = recursionDepth;
        const newData = {};
        for (let position in par.data) {
            if (typeof position != "string" || position.length != 2 || !colNames.includes(position[0]) || !rowNumbers.includes(position[1])) {
                throw new Error(`Position "${position}" is not valid`);
            }
            let value = par.data[position];
            if (value instanceof Cell) {
                newData[position] = value;
                continue;
            }
            if (typeof value == "string") {
                value = Number(value);
            }
            if (isNaN(value) || value < 1 || value > 9) {
                throw new Error(`Number "${value}" at Position "${position}" is not valid`);
            }
            newData[position] = new Cell({ position, value, recursionDepth });
        }
        this.data = newData;
        if (!this.isValid()) {
            throw new Error("Invalid grid");
        }
    }
    setCell(position, value) {
        if (!(value instanceof Cell)) {
            throw new Error("Value must be an instance of Cell");
        }
        this.data[position] = value;
    }
    // use this only for fancy display
    //setAssumptions() {
    //    if (!this.data[key]) {
    //        this.data[key] = new Cell({ recursionDepth: this.recursionDepth, position: key });
    //    }
    //    this.data[key].possibilities = possibilities;
    //}
    getAssumption() {
        const position = this.allEmptyCellNames()[0];
        const possibilities = this.getPossibleFor(position);
        const rv = {};
        rv[position] = possibilities;
        return rv;
    }
    getPossibleFor(key) {
        const rv = [];
        const col = key[0];
        const row = key[1];
        const subSquare = Grid.getSubGridFromPos(key);
        for (let val = 1; val <= 9; val++) {
            if (!this.isRowValid(row, val)) continue;
            if (!this.isColValid(col, val)) continue;
            if (!this.isSquareValid(subSquare, val)) continue;
            rv.push(val);
        }
        return rv;
    }
    fillObvious() {
        let doAgain;
        let foundCount = 0;
        do {
            doAgain = false;
            for (let position of this.allEmptyCellNames()) {
                const possible = this.getPossibleFor(position);
                if (possible.length == 1) {
                    const value = possible[0];
                    this.data[position] = new Cell({ value, position });
                    //  console.log(`found obvious "${value}" at "${position}"`);
                    doAgain = true;
                    foundCount++;
                    break;
                }
            }
        } while (doAgain);
        return foundCount;
    }
    allEmptyCellNames() {
        const keys = [];
        for (let col of colNames) {
            for (let row of rowNumbers) {
                const key = col + row;
                if (!this.data[key]?.value)
                    keys.push(key);
            }
        }
        return keys;
    }
    isFull() {
        return this.allEmptyCellNames().length === 0;
    }
    areAllRowsValid() {
        for (let rowNum of rowNumbers) {
            if (!this.isRowValid(rowNum)) return false;
        }
        return true;
    }
    areAllColsValid() {
        for (let colName of colNames) {
            if (!this.isColValid(colName)) return false;
        }
        return true;
    }
    areSquaresValid() {
        for (let i = 1; i <= 9; i++) {
            if (!this.isSquareValid(i)) return false;
        }
        return true;
    }
    isRowValid(rowNumber, val) {
        const set = new Set();
        if (val) { set.add(val); }
        for (let colName of colNames) {
            const cell = colName + rowNumber;
            if (!this.data[cell]?.value) continue;
            if (set.has(this.data[cell].value)) return false;
            set.add(this.data[cell].value);
        }
        return true;
    }
    isColValid(colName, val) {
        const set = new Set();
        if (val) { set.add(val); }
        for (let rowNumber of rowNumbers) {
            const cell = colName + rowNumber;
            if (!this.data[cell]?.value) continue;
            if (set.has(this.data[cell].value)) return false;
            set.add(this.data[cell].value);
        }
        return true;
    }
    isSquareValid(num, val) {
        const set = new Set();
        if (val) { set.add(val); }
        for (let cell of Grid.getSubGridKeys(num)) {
            if (!this.data[cell]?.value) continue;
            if (set.has(this.data[cell].value)) return false;
            set.add(this.data[cell].value);
        }
        return true;
    }
    static getSubGridKeys(subGrid) {
        const num = subGrid - 1;
        const firstColIndex = (num % 3) * 3;
        const firstRowIndex = Math.floor(num / 3) * 3;
        const keys = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                keys.push(colNames[firstColIndex + j] + rowNumbers[firstRowIndex + i]);
            }
        }
        return keys;
    }
    static getSubGridFromPos(pos) {
        const colChar = pos[0];
        const rowChar = pos[1];
        let col = colNames.indexOf(colChar);
        let row = rowNumbers.indexOf(rowChar);
        assert(col >= 0 && col < 9, `pos ${pos} yields invalid col ${col}`);
        assert(row >= 0 && row < 9, `pos ${pos} yields invalid col ${row}`);
        row = Math.floor(row / 3);
        col = Math.floor(col / 3);
        const rv = 1 + row * 3 + col;
        assert(rv >= 1 && rv <= 9, `pos ${pos} yields invalid subgrid ${rv}`);
        return rv;
    }
    isValid() {
        if (!this.areAllRowsValid()) {
            console.log("Rows are invalid");
            return false;
        }
        if (!this.areAllColsValid()) {
            console.log("Cols are invalid");
            return false;
        }
        if (!this.areSquaresValid()) {
            console.log("Squares are invalid");
            return false;
        }
        //console.log("Grid is valid");
        return true;
    }
}
export { Sudoku, Cell, colNames, rowNumbers, Grid };