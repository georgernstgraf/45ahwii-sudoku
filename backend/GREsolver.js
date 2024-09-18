// Import necessary modules from Node.js
import { readFile, writeFile } from "fs/promises";
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
 * Checks if the solved Sudoku puzzle is valid
 * @param {number[][]} sudokuGrid - 2D array representing the Sudoku grid
 * @returns {{isValid: boolean, errors: string[]}} - Object containing validation result and error messages
 */

// Alg zur Überprüfung der Gültigkeit eines Sudokus!

function checkSudoku(sudokuGrid) {
	const size = 9;
	const boxSize = 3;
	const errors = [];

	// Helper function to check for duplicates in an array
	function hasDuplicates(arr) {
		return new Set(arr).size !== arr.length;
	}

	// Check rows
	for (let row = 0; row < size; row++) {
		if (hasDuplicates(sudokuGrid[row].filter((val) => val !== 0))) {
			errors.push(`Duplicate value found in row ${row + 1}`);
		}
	}

	// Check columns
	for (let col = 0; col < size; col++) {
		const column = sudokuGrid.map((row) => row[col]);
		if (hasDuplicates(column.filter((val) => val !== 0))) {
			errors.push(`Duplicate value found in column ${col + 1}`);
		}
	}

	// Check 3x3 boxes
	for (let boxRow = 0; boxRow < size; boxRow += boxSize) {
		for (let boxCol = 0; boxCol < size; boxCol += boxSize) {
			const box = [];
			for (let r = 0; r < boxSize; r++) {
				for (let c = 0; c < boxSize; c++) {
					box.push(sudokuGrid[boxRow + r][boxCol + c]);
				}
			}
			if (hasDuplicates(box.filter((val) => val !== 0))) {
				errors.push(
					`Duplicate value found in box at position (${boxRow + 1}, ${
						boxCol + 1
					})`
				);
			}
		}
	}

	return { isValid: errors.length === 0, errors };
}

async function writeSolvedSudoku(solvedSudoku) {
	try {
		const outputPath = join(__dirname, "solvedSudoku.json");
		const jsonData = JSON.stringify(solvedSudoku, null, 2);
		await writeFile(outputPath, jsonData, "utf-8");
		console.log("\nSolved Sudoku has been written to solvedSudoku.json");
	} catch (error) {
		console.error("Error writing solved Sudoku to file:", error.message);
	}
}

async function readAndParseSudoku() {
	try {
		const inputPath = join(__dirname, "unsolvedSudoku2.json");
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
			// Check the solved Sudoku
			const { isValid, errors } = checkSudoku(solvedSudoku);
			if (isValid) {
				console.log("\nThe solved Sudoku is valid!");
				// Write the solved Sudoku to a JSON file
				await writeSolvedSudoku(solvedSudoku);
			} else {
				console.log("\nThe solved Sudoku is not valid. Errors found:");
				errors.forEach((error) => console.log(`- ${error}`));
			}
		} else {
			console.log("\nUnable to solve the Sudoku puzzle.");
		}
	} catch (error) {
		console.error("Error:", error.message);
	}
}

readAndParseSudoku();
