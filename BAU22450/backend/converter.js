const fs = require('fs').promises; 
const path = require('path');

async function sudoku2js(fileName) {
    try {
        const data = await fs.readFile(fileName, 'utf8');
        const lines = data.split('\n');
        const jsonObject = {};
        const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];

        lines.forEach((line, rowIndex) => {
            const values = line.split(' ').map(item => item.trim());
            values.forEach((value, columnIndex) => {
                if (value) {
                    const key = `${columns[columnIndex]}${rowIndex + 1}`;
                    jsonObject[key] = value;
                }
            });
        });

        
        await fs.writeFile(path.join(__dirname, 'output.json'), JSON.stringify(jsonObject, null, 2), 'utf8');
        console.log('Konvertierung erfolgreich!');
    } catch (err) {
        console.error('Fehler beim Lesen der Datei:', err);
    }
}

sudoku2js(path.join(__dirname, 'fastleer.txt')).then(console.log).catch(console.error);