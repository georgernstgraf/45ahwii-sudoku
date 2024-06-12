const colNames = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
const rowNames = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

const currentRow = 0;
const currentColumn = 0;
//
// for (i)
//
//     function do_massimos() {
//         foreach subquadrat:
//            foreach Number(1 - 9):
//                array positions = getPositionsforNumberinSubquadrat(Number, subquadrat);
//         if (array.length == 1) !!!Q!!;
//     }

function getSubquadratKeys(num) {
    firstColIndex = ((num - 1) % 3) * 3;
    firstRowIndex = Math.floor((num - 1) / 3) * 3;
    for (let zeile = firstRowIndex; zeile < firstRowIndex + 3; zeile++) {
        for (let spalte = firstColIndex; spalte < firstColIndex + 3; spalte++) {
            console.log(`${colNames[spalte]}${rowNames[zeile]}`);
        }
    }
}
const repl = require('repl');
repl.start('> ').context.getSubquadratKeys = getSubquadratKeys;