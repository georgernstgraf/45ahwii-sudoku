/* function SimulateSudoku(){
    console.log("function called!")
for( i=1; i<=81; i++){
    const cell = document.getElementById(i.toString());
    if (cell) {
        cell.textContent = Math.floor(Math.random() * 9) + 1;
        console.log(cell.textContent)
    }
}}

window.addEventListener(load, SimulateSudoku);
document.getElementById("run").addEventListener(click, SimulateSudoku) */


// Wrap everything in an immediately invoked function expression (IIFE)
(function() {
    function simulateSudoku() {
        console.log("simulateSudoku function called");
        for (let i = 1; i <= 81; i++) {
            const cell = document.getElementById(i.toString());
            if (cell) {
                cell.textContent = Math.floor(Math.random() * 9) + 1;
            } else {
                console.log("Cell not found: " + i);
            }
        }
    }

    // Add multiple event listeners to ensure it runs
    window.addEventListener('load', simulateSudoku);
    document.addEventListener('DOMContentLoaded', simulateSudoku);

    // Also run it immediately in case the page has already loaded
    simulateSudoku();

    console.log("Script loaded");
})();