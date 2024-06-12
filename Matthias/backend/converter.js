const fs = require('fs').promises;
const path = require('path');

async function sudoku2js(fileName) {
    try {
        const data = await fs.readFile(fileName, 'utf8');
        const lines = data.split('\n');
        const jsonObject = {};

        lines.forEach(line => {
            const [key, value] = line.split(':').map(item => item.trim());
            if (key && value) {
                jsonObject[key] = value;
            }
        });

        return jsonObject;
    } catch (err) {
        console.error('Fehler beim Lesen der Datei:', err);
        return {};
    }
}

(async () => {
    const result = await sudoku2js(path.join(__dirname, 'input.txt'));
    console.log(result);
})();

module.exports = sudoku2js;