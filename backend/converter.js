const fs = require('fs').promises;
const path = require('path');

async function sudoku2js(fileName) {
    try {
        const filePath = path.join(__dirname, '../beispiele', `${fileName}.txt`);
        const data = await fs.readFile(filePath, 'utf8');
        console.log('__________________________');
        console.log('Loaded data:', data); // Debugging-Ausgabe

        const lines = data.split('\n').filter(line => line.trim() !== '');
        if (lines.length !== 9) {
            throw new Error('Assertion failed: need 9 rows');
        }

        const sudokuArray = lines.map(line => {
            if (line.length !== 9) {
                throw new Error('Assertion failed: each row should have 9 columns');
            }
            return line.split('').map(char => (char === '.' ? 0 : parseInt(char, 10)));
        });

        console.log('Parsed JSON:', sudokuArray); // Debugging-Ausgabe
        return sudokuArray;
    } catch (err) {
        console.error('Fehler beim Lesen der Datei:', err);
        return [];
    }
}

module.exports = { sudoku2js };