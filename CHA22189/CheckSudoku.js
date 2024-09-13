const fs = require('fs');
const path = require('path');

//Anleitung: Wenn man eine json Datei mit den gelösten Sudoku (z.B. solvedSudoku1.json) kann man das in diesem Programm überprüfen ob es stimmt.


// Pfad zur JSON-Datei
const jsonFilePath = path.join(__dirname, 'solvedSudoku1.json'); //hier das gelöste Sudoku hinzufügen

// Funktion zur Überprüfung einer Sudoku-Lösung
function isSudokuValid(sudoku) {
  console.log("Überprüfung:");


// Die funktion könnte statt zu prüfen ob ein row/col zwei gleiche Werte hat, überprüfen ob die Gesamtsumme 45 beträgt 

  // Überprüfe Zeilen und Spalten                 
  for (let i = 0; i < 9; i++) {
    const rowSet = new Set(); 
    const colSet = new Set();

    for (let j = 0; j < 9; j++) {
      // Überprüfe Zeile
      const rowValue = sudoku[i][j]; //es schaut ob die Zahlen im Bereich von 1 bis 9 sind und schaut ob die Zahl im RowValue im rowset sich befindet
      if (rowValue < 1 || rowValue > 9 || rowSet.has(rowValue)) {
        console.log(`Fehler in Zeile ${i + 1}: Wert ${rowValue} ist wiederholt oder ungültig.`);
        return false;
      }
      rowSet.add(rowValue);

      // Überprüfe Spalte
      const colValue = sudoku[j][i]; //selbe hier nur eben mit col
      if (colValue < 1 || colValue > 9 || colSet.has(colValue)) {
        console.log(`Fehler in Spalte ${i + 1}: Wert ${colValue} ist wiederholt oder ungültig.`);
        return false;
      }
      colSet.add(colValue);
    }
  }

  console.log("Keine Fehler gefunden.");
  // Falls keine Duplikate gefunden wurden, ist das Sudoku korrekt
  return true;
}

// Lese die JSON-Datei ein und überprüfe das Sudoku
fs.readFile(jsonFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error("Fehler beim Lesen der Datei:", err);
    return;
  }

  try {
    // Die JSON-Daten sind ein Array von Arrays, daher direkt Parsen
    const sudokuData = JSON.parse(data);
    const result = isSudokuValid(sudokuData);
    console.log(result ? "Das Sudoku ist korrekt gelöst!" : "Das Sudoku ist falsch gelöst.");
  } catch (e) {
    console.error("Fehler beim Parsen der JSON-Daten:", e);
  }
});
