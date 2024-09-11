const fs = require('fs');




function solveObvSudoku() {
    fs.readFile('/Users/Emil/Downloads/Sudoku/45ahwii-sudoku/beispiele/formteil-810.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const col = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
    const row = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const jsonData = JSON.parse(data);
    
        function getSubGridKeys(num) {
        num = num - 1;
            firstColIndex = (num % 3) * 3;
            firstRowIndex =  Math.floor(num / 3) * 3;
            let keys = [];
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    keys.push(col[firstColIndex + i] + row[firstRowIndex + j]);
                }
            }

            return keys;

        }
        console.log(getSubGridKeys(1));

});

}

solveObvSudoku();