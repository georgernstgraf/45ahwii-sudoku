import fs from 'fs';
// Read the JSON file
const jsonData = fs.readFileSync('/SUDOKUS/unsolvedSudoku1.json', 'utf-8');

// Parse the JSON data
const data = JSON.parse(jsonData);

// Use the data as needed
console.log(data);