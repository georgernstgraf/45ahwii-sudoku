class Sudoku {
    #recursion_depth;
    _maxSolutions;
    _data;
    _foundSolutions;
    constructor({ data, foundSolutions, recursionDepth, maxSolutions }) {
        this.data = data;
        this.state = state;
    }

    solveObvious() {
        // so lange obviuos felder befüllen bis sich nix mehr tut
        const state1 = this.getStateCopy();
        // a) massimo
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