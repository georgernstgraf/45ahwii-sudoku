// fetchSudoku.js

//250 fetches per month for free, nice

import fetch from 'node-fetch';
import fs from 'fs';

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
		console.log(result);

		const unsolvedSudoku = result[0].unsolvedSudoku;

		fs.writeFile('unsolvedSudoku.json', JSON.stringify(unsolvedSudoku, null, 2), (err) => {
			if (err) throw err;
			console.log('The file has been saved!');
		});
	} catch (error) {
		console.error('There was a problem with the fetch operation:', error);
	}
};

fetchSudoku();
