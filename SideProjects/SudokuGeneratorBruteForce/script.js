let sudokuiscorrect = false;
(function() {

    while(sudokuiscorrect=== false) {
        generateSudoku()
        checkSudoku()
    }
    window.addEventListener('load', generateSudoku);
    document.addEventListener('DOMContentLoaded', generateSudoku);

    generateSudoku();
    console.log("Script loaded");
})();

function generateSudoku() {
    console.log("generateSudoku function called");
    for (let i = 1; i <= 81; i++) {
        for (let y = 0; y<= 8; y++){
            for (let x = 0; x<= 8; x++){

        let cell = document.querySelector(`.sudoku-cell[data-x="${x}"][data-y="${y}"]`);
        if (cell) {
            cell.textContent = Math.floor(Math.random() * 9) + 1;
        } else {
            console.log("Cell not found: " + i);
        }
    }
    }
    }
}

function checkSudoku(){





}