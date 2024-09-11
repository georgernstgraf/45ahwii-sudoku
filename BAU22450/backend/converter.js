const fs = require("fs");
const path = require("path");

async function sudoku2js(fileName) {
    try {
        const data = await fs.readFile(fileName, "utf8");
        const lines = data.split("\n");
        const jsonObject = {};
        const columns = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

        lines.forEach((line, rowIndex) => {
            const values = line.split(" ").map((item) => item.trim());
            values.forEach((value, columnIndex) => {
                if (value) {
                    const key = `${columns[columnIndex]}${rowIndex + 1}`;
                    jsonObject[key] = value;
                }
            });
        });

        return jsonObject;
    } catch (err) {
        console.error("Fehler beim Lesen der Datei:", err);
        return {};
    }
}

async function readFilesFromDirectory(directoryPath) {
    const directoryPath = path.join(__dirname, "../beispiele"); // Ersetzen Sie '../beispiele' durch den Pfad zu Ihrem Verzeichnis
    const files = fs.readdirSync(directoryPath);

    files.forEach((file) => {
        console.log(file);
    });
}

async function convertTxtToJson() {
    const fileName = path.join(__dirname, "../beispiele/digitalgalaxus.txt"); // Ersetzen Sie 'digitalgalaxus.txt' durch den Namen Ihrer Datei

    try {
        const jsonObject = await sudoku2js(fileName);
        console.log(jsonObject);
    } catch (err) {
        console.error("Fehler beim Umwandeln der Datei in JSON:", err);
    }
}

convertTxtToJson();
// const directoryPath = path.join(__dirname, '../beispiele'); // Ersetzen Sie '../beispiele' durch den Pfad zu Ihrem Verzeichnis
readFilesFromDirectory(directoryPath);

module.exports = sudoku2js;
