// Import necessary modules from Node.js
import { readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Get the current file name and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Solves a Sudoku puzzle using a recursive backtracking algorithm.
 * @param {number[][]} sudokuGrid - 2D array representing the Sudoku grid (0 for empty cells)
 * @param {number} depth - Current recursion depth
 * @returns {{solved: boolean, grid: number[][], maxDepth: number}} - Object containing solved status, grid, and max depth
 */
function solveSudoku(sudokuGrid, depth = 0) {
	const size = 9; // Size of the Sudoku grid (9x9)
	const boxSize = 3; // Size of each 3x3 box in the grid
	const empty = 0; // Value representing an empty cell
	let maxDepth = depth; // Track the maximum recursion depth

	/**
	 * Helper function to get the values in a specific 3x3 box
	 * @param {number} row - Row index of the cell
	 * @param {number} col - Column index of the cell
	 * @returns {Set<number>} Set of values present in the 3x3 box
	 */
	function getBoxValues(row, col) {
		const boxRow = Math.floor(row / boxSize) * boxSize;
		const boxCol = Math.floor(col / boxSize) * boxSize;
		const values = new Set();
		for (let r = 0; r < boxSize; r++) {
			for (let c = 0; c < boxSize; c++) {
				const value = sudokuGrid[boxRow + r][boxCol + c];
				if (value !== empty) {
					values.add(value);
				}
			}
		}
		return values;
	}

	/**
	 * Helper function to get possible values for a cell
	 * @param {number} row - Row index of the cell
	 * @param {number} col - Column index of the cell
	 * @returns {number[]} Array of possible values for the cell
	 */
	function getPossibleValues(row, col) {
		const allValues = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

		// Remove values from the same row and column
		for (let i = 0; i < size; i++) {
			allValues.delete(sudokuGrid[row][i]);
			allValues.delete(sudokuGrid[i][col]);
		}

		// Remove values from the same 3x3 box
		const boxValues = getBoxValues(row, col);
		boxValues.forEach((value) => allValues.delete(value));

		return Array.from(allValues);
	}

	/**
	 * Recursive function to solve the Sudoku puzzle
	 * @returns {boolean} True if the puzzle is solved, false otherwise
	 */
	function solve() {
		for (let row = 0; row < size; row++) {
			for (let col = 0; col < size; col++) {
				if (sudokuGrid[row][col] === empty) {
					const possibleValues = getPossibleValues(row, col);
					for (const value of possibleValues) {
						sudokuGrid[row][col] = value;
						const newDepth = depth + 1;
						maxDepth = Math.max(maxDepth, newDepth);
						if (solve()) {
							return true;
						}
						sudokuGrid[row][col] = empty; // Backtrack
					}
					return false; // No valid value found, backtrack
				}
			}
		}
		return true; // All cells filled
	}

	const solved = solve();
	return { solved, grid: sudokuGrid, maxDepth };
}

/**
 * Reads a Sudoku puzzle from a JSON file, solves it, and logs the results
 */
async function readAndParseSudoku() {
	try {
		// Read the JSON file containing the unsolved Sudoku
		const inputPath = join(__dirname, "unsolvedSudoku1.json");
		const jsonData = await readFile(inputPath, "utf-8");

		// Parse the JSON data into a 2-dimensional array
		const sudokuArray = JSON.parse(jsonData);

		// Log the unsolved Sudoku
		console.log("Unsolved Sudoku:");
		sudokuArray.forEach((row) => console.log(row));

		// Solve the Sudoku
		const { solved, grid: solvedSudoku, maxDepth } = solveSudoku(sudokuArray);

		// Log the solved Sudoku and maximum recursion depth
		if (solved) {
			console.log("\nSolved Sudoku:");
			solvedSudoku.forEach((row) => console.log(row));
			console.log(`\nMaximum recursion depth: ${maxDepth}`);
		} else {
			console.log("\nUnable to solve the Sudoku puzzle.");
		}
	} catch (error) {
		console.error("Error:", error.message);
	}
}

function printSudoku(grid) {
	const size = 9;
	const boxSize = 3;
	let rowSeparator = "+---+---+---+---+---+---+---+---+---+";

	for (let row = 0; row < size; row++) {
		if (row % boxSize === 0) {
			console.log(rowSeparator); // horizontale Linie alle 3 Reihen
		}

		let rowString = "|"; // Anfang der Reihe
		for (let col = 0; col < size; col++) {
			if (col % boxSize === 0 && col !== 0) {
				rowString += "|"; // vertikale Linie alle 3 Spalten
			}
			rowString += ` ${grid[row][col] || " "} `; // füge den Zellenwert hinzu
		}
		rowString += "|"; // Ende der Reihe
		console.log(rowString);
	}
	console.log(rowSeparator); // abschließende horizontale Linie
}

// Run the main function
readAndParseSudoku();

printSudoku(solveSudoku);
