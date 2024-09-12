import { readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function solveSudoku(sudokuGrid, depth = 0) {
	const size = 9;
	const boxSize = 3;
	const empty = 0;
	let maxDepth = depth;

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

	function getPossibleValues(row, col) {
		const allValues = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
		for (let i = 0; i < size; i++) {
			allValues.delete(sudokuGrid[row][i]);
			allValues.delete(sudokuGrid[i][col]);
		}
		const boxValues = getBoxValues(row, col);
		boxValues.forEach((value) => allValues.delete(value));
		return Array.from(allValues);
	}

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

function checkSudoku(sudokuGrid) {
	const size = 9;
	const boxSize = 3;
	const errors = [];

	function hasDuplicates(arr) {
		return (
			new Set(arr.filter((val) => val !== 0)).size !==
			arr.filter((val) => val !== 0).length
		);
	}

	// Check rows
	for (let row = 0; row < size; row++) {
		if (hasDuplicates(sudokuGrid[row])) {
			errors.push(`Duplicate value found in row ${row + 1}`);
		}
	}

	// Check columns
	for (let col = 0; col < size; col++) {
		const column = sudokuGrid.map((row) => row[col]);
		if (hasDuplicates(column)) {
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
			if (hasDuplicates(box)) {
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

function displaySudoku(grid) {
	const horizontalLine = "+-------+-------+-------+";
	let output = "";

	grid.forEach((row, rowIndex) => {
		if (rowIndex % 3 === 0) {
			output += horizontalLine + "\n";
		}

		row.forEach((cell, cellIndex) => {
			if (cellIndex % 3 === 0) {
				output += "| ";
			}
			output += cell === 0 ? ". " : cell + " ";
			if (cellIndex === 8) {
				output += "|";
			}
		});

		output += "\n";

		if (rowIndex === 8) {
			output += horizontalLine;
		}
	});

	return output;
}

async function importSudokuFromJSON(filename) {
	try {
		const filePath = join(__dirname, filename);
		const jsonData = await readFile(filePath, "utf-8");
		const sudokuGrid = JSON.parse(jsonData);

		if (!Array.isArray(sudokuGrid) || sudokuGrid.length !== 9) {
			throw new Error("Invalid Sudoku grid format: must be a 9x9 array");
		}

		for (const row of sudokuGrid) {
			if (!Array.isArray(row) || row.length !== 9) {
				throw new Error(
					"Invalid Sudoku grid format: each row must contain 9 elements"
				);
			}
			for (const cell of row) {
				if (!Number.isInteger(cell) || cell < 0 || cell > 9) {
					throw new Error(
						"Invalid Sudoku grid format: each cell must be an integer between 0 and 9"
					);
				}
			}
		}

		return sudokuGrid;
	} catch (error) {
		console.error("Error importing Sudoku from JSON:", error.message);
		return null;
	}
}

async function readAndSolveSudoku(filename) {
	try {
		console.log(`Importing Sudoku puzzle from ${filename}...`);
		const sudokuArray = await importSudokuFromJSON(filename);

		if (!sudokuArray) {
			console.log(
				"Failed to import Sudoku puzzle. Please check the JSON file and try again."
			);
			return;
		}

		console.log("Unsolved Sudoku:");
		console.log(displaySudoku(sudokuArray));

		const { solved, grid: solvedSudoku, maxDepth } = solveSudoku(sudokuArray);

		if (solved) {
			console.log("\nSolved Sudoku:");
			console.log(displaySudoku(solvedSudoku));
			console.log(`\nMaximum recursion depth: ${maxDepth}`);

			const { isValid, errors } = checkSudoku(solvedSudoku);
			if (isValid) {
				console.log("\nThe solved Sudoku is valid!");
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

// Run the solver with a JSON file
readAndSolveSudoku("unsolvedSudoku1.json");
