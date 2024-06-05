class Sudoku {
    constructor(jsn) {
        this._data = jsn;
    }

    obvious() {
        // so lange obviuos felder befüllen bis sich nix mehr tut
        // a) massimo
        // b) amin / andreas
        return true; // ob sich was geändert hat oder nicht
    }

    annahmen() {
        return; // {c1: [1,2,4]}
    }

    // probiere für jede Annahme das Sudoku neu zu lösen

    solutions() {
        return []; // erste Lösung oder null
    }

}
module.exports = Sudoku;