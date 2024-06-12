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

async function readFilesFromDirectory(directoryPath) {
    try {
        const files = await fs.readdir(directoryPath);
        const results = [];

        for (const file of files) {
            const filePath = path.join(directoryPath, file);
            const fileStats = await fs.stat(filePath);

            if (fileStats.isFile() && path.extname(filePath) === '.txt') {
                const result = await sudoku2js(filePath);
                results.push(result);
            }
        }

        return results;
    } catch (err) {
        console.error('Fehler beim Lesen des Verzeichnisses:', err);
        return [];
    }
}

(async () => {
    const directoryPath = path.join(__dirname, '../beispiele'); 
    const results = await readFilesFromDirectory(directoryPath);
    console.log(results);
})();

module.exports = sudoku2js;