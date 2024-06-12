const colNames = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
const rowNames = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

class Sudoku {
    #recursion_depth;
    _maxSolutions;
    _data;
    _foundSolutions;
    constructor({ data, recursionDepth, state }) {
        this.data = data;
        this.recursionDepth = recursionDepth;
        this.state = state;
    }

    solveObvious() {
        // so lange obviuos felder befüllen bis sich nix mehr tut
        const state1 = this.getStateCopy();
        // a) massimo  // TODO fehler in schleife
        for (doMassimos(); isUnEqualWith(state1); doMassimos()) { }
        // b) amin / andreas
        const state2 = this.getStateCopy();
        for (doAminAndreas(); isUnEqualWith(state2); doAminAndreas()) { }
        return this.isDeepUnEqualWith(state1);
    }

    isDeepUnEqualWith(other) {
        // deep compare
        return jaodernein;
    }
    makeAssumptions() {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators
        for (sudoku of this.assumptions()) {  // iterator bauen!!
            sudoku.solve();
            if (this.state.foundSolutions <= this.state.maxSolutions) break;
        }
        return;
    }


    // probiere für jede Annahme das Sudoku neu zu lösen

    solve() {
        if (this.solveObvious()) {
            console.log(`obvious did sth at depth ${this.#recursion_depth}`);
        }
        this.makeAssumptions();
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
export { Sudoku, Cell };