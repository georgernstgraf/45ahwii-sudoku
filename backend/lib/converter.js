const fs = require('fs').promises;
const path = require('path');

async function converter(fileName) {
    const data = await fs.readFile(`../beispiele/${fileName}.txt`, 'utf8');
    let lines = data.split('\n');
    let returnVal = [];

    lines.forEach(line => {
        line = line.trim();
        line = line.replace(/\s+/g, '');
        line = line.replace(/\./g, '0');
        returnVal.push(line);
    });
    returnVal = returnVal.filter(l => l.length == 9);
    return returnVal;
}

async function readFilesFromDirectory(directoryPath) {
    try {
        const files = await fs.readdir(directoryPath);
        const results = [];

        for (const file of files) {
            const filePath = path.join(directoryPath, file);
            const fileStats = await fs.stat(filePath);

            if (fileStats.isFile() && path.extname(filePath) === '.txt') {
                const result = await converter(filePath);
                results.push(result);
            }
        }

        return results;
    } catch (err) {
        console.error('Fehler beim Lesen des Verzeichnisses:', err);
        return [];
    }
}

// (async () => {
//     const directoryPath = path.join(__dirname, '../../beispiele');
//     const results = await readFilesFromDirectory(directoryPath);
//     console.log(results);
// })();

module.exports = converter;;