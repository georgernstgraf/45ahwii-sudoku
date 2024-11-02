const colNames = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
const rowNames = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
class Sudoku {
    #recursion_depth;
    _maxSolutions;
    _data;
    _foundSolutions;
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

    solveObvious() {
        // so lange obviuos felder befüllen bis sich nix mehr tut
        // a) massimo  // TODO fehler in schleife
        const countInital = this.grid.countSetCells();
        let countBefore = countInital;
        while (true) {
            doMassimos(); // grid befüllen mit new Cell()'s
            const countAfter = this.grid.countSetCells();
            if (countBefore === countAfter) break; // nix mehr zu holen
            countBefore = countAfter;
        }
        const massimos = this.grid.countSetCells() - countBefore;
        if (massimos > 0) {
            console.log(
                `Massimo found ${massimos} new values / depth: ${this.#recursion_depth
                }`
            );
        }
        // b) amin / andreas
        countBefore = this.grid.countSetCells();
        while (true) {
            doAminAndreas(); // grid befüllen mit new Cell()'s
            const countAfter = this.grid.countSetCells();
            if (countBefore === countAfter) break; // nix mehr zu holen
            countBefore = countAfter;
        }
        const aminadreas = this.grid.countSetCells() - countBefore;
        if (aminadreas > 0) {
            console.log(
                `Amin / Andreas found ${aminadreas} new values / depth: ${this.#recursion_depth
                }`
            );
        }
        return this.grid.countSetCells() - countInital;
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
            if (!this.grid.isValid()) {
                throw new Error("PANIC: Grid is full but invalid");
            }
            this.state.foundSolutions.push(this.deepCopy());
            return;
        }
        if (this.grid.isFull()) {
            console.error(
                "ERROR: Sudoku is already solved, but you called solve()."
            );
            return;
        }
        const newCellCount = this.solveObvious();
        if (newCellCount > 0) {
            console.log(
                `obvious found ${newCellCount} new values at depth ${this.#recursion_depth
                }`
            );
        }
        this.makeAssumptions();
    }
    renderInto(domNode) {
        Array.from(domNode.querySelectorAll(".grid-item")).forEach(
            (e) => (e.innerHTML = "")
        );
        for (let pos in this.grid.data) {
            const elt = domNode.querySelector(`#${pos}`);
            elt.innerText = this.grid.data[pos].value;
            // elt.classList = "recursionDepth-" + this.recursionDepth; TODO data-recursion=3
        }
    }
}
class Cell {
    constructor(par) {
        Object.assign(this, par);
        if (this.isAssumption == undefined) {
            this.isAssumption = false;
        }
    }
}
class Grid {

    constructor(par) {
        if (par instanceof Grid) {
            // need to return a copy
            this.recursionDepth = par.recursionDepth;
            this.data = {};
            Object.keys(par.data).forEach(position => { this.data[position] = new Cell(par.data[position]); });
            return;
        }
        const { recursionDepth, data } = par;
        if (!(typeof recursionDepth == "number")) {
            throw new Error(`RecursionDepth "${recursionDepth}" is not valid`);
        }
        this.recursionDepth = recursionDepth;
        const newData = {};
        for (let position in par.data) {
            if (typeof position != "string" || position.length != 2 || !colNames.includes(position[0]) || !rowNames.includes(position[1])) {
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
            newData[position] = new Cell({ position, value, recursionDepth, isAssumption: false });
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
    allEmptyCellNames() {
        const keys = [];
        for (let col of colNames) {
            for (let row of rowNames) {
                const key = `${col}${row}`;
                if (!(key in this.data)) {
                    keys.push(key);
                }
            }
        }
        return keys;
    }
    isFull() {
        return this.allEmptyCellNames().length === 0;
    }
    countSetCells() {
        let count = 0;
        Object.keys(this.data).forEach(k => {
            count += this.data[k]?.value ? 1 : 0;
        });
        return count;
    }

    isValidRows() {
        for (let rowName of rowNames) {
            if (this.isValidRow(rowName) === false) return false;
        }
        return true;
    }
    isValidRow(rowName) {
        const set = new Set();
        for (let colName of colNames) {
            const cell = colName + rowName;
            if (this.data[cell] == undefined) continue;

            if (set.has(this.data[cell])) return false;
            set.add(this.data[cell]);
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
        const set = new Set();
        for (let rowName of rowNames) {
            const cell = colName + rowName;
            if (this.data[cell] == undefined) continue;
            if (set.has(this.data[cell])) {
                console.log("col " + colName + " is invalid");
                return false;
            }
            set.add(this.data[cell]);
            // console.log(set);
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
        const keys = Grid.getSubGridKeys(num);
        const values = new Set();
        for (let k of keys) {
            const value = this.data[k]?.value;
            if (!value) {
                return;
            }
            if (values.has(value)) {
                return false;
            }
            values.add(value);
        }
        return true;

        for (let i = 0; i < keys.length; i++) {
            const cell = keys[j];
            if (this.data[cell] == undefined) continue;
            if (values.has(this.data[cell])) return false;
            values.add(this.data[cell]);
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
                keys.push(colNames[firstColIndex + j] + rowNames[firstRowIndex + i]);
            }
        }
        return keys;
    }

    isValid() {
        if (!this.isValidRows()) {
            console.log("Rows are invalid");

            return false;
        }
        if (!this.isValidCols()) {
            console.log("Cols are invalid");
            return false;
        }
        if (!this.isValidSquares()) {
            console.log("Squares are invalid");
            return false;
        }
        console.log("Grid is valid");
        return true;
    }
}
export { Sudoku, Cell, colNames, rowNames, Grid };