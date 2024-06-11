const fs = require('fs');
const path = require('path');

function sudoku2js(fileName) {
    let obj = {};
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.error('Fehler beim Lesen der Datei:', err);
            return;
        }

        const lines = data.split('\n');
        const jsonObject = {};

        lines.forEach(line => {
            const [key, value] = line.split(':').map(item => item.trim());
            if (key && value) {
                jsonObject[key] = value;
            }
        });
        obj = JSON.parse(JSON.stringify(jsonObject))
    });
    return obj;
}
console.log(sudoku2js(__dirname + "\\input.txt"))
module.exports = sudoku2js;