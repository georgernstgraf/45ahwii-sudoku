class Sudoku {
    #recursion_depth;
    #maxSolutions;
    #data;
    #foundSolutions;
    constructor(jsn, foundSolutions, maxSolutions) {
        this.#data = jsn;
        this.#foundSolutions = commonSolutions;
        this.#maxSolutions = maxSolutions;
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
        for (sudoku of this) {
            sudoku.solve();
            if (this.#foundSolutions <= this.#maxSolutions) break;
        }
        // this.#data is now: {c1: [1,2,4]}
        return;
    }


    // probiere für jede Annahme das Sudoku neu zu lösen

    solve() {
        if (this.solveObvious()) {
            console.log(`obvious did sth at depth ${this.#recursion_depth}`);
        }

        return this.#foundSolutions;
    }

}
module.exports = Sudoku;