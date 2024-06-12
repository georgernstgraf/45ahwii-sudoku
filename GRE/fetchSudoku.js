import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const url = 'https://a-randomizer-data-api.p.rapidapi.com/api/random/sudokus?count=1&difficultyLevel=1';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '2d42b1b7d4mshcf85bbb7aabb3bbp13b29ajsn58dfdf1fa83f',
        'x-rapidapi-host': 'a-randomizer-data-api.p.rapidapi.com'
    }
};

const fetchSudoku = async () => {
    try {
        const response = await fetch(url, options);
        const result = await response.json();

        const unsolvedSudoku = result[0].unsolvedSudoku;

        // Read the directory for existing files
        const files = fs.readdirSync('.');
        const jsonFiles = files.filter(file => file.startsWith('unsolvedSudoku') && file.endsWith('.json'));

        // Parse their numbers and find the highest one
        const numbers = jsonFiles.map(file => parseInt(file.slice(14, -5), 10));
        const maxNumber = Math.max(0, ...numbers);

        // Write the new file with a number that's one higher
        const newFile = `unsolvedSudoku${maxNumber + 1}.json`;
        fs.writeFileSync(newFile, JSON.stringify(unsolvedSudoku, null, 2));

        console.log(`The file has been saved as ${newFile}!`);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};

fetchSudoku();