import assert from 'node:assert';
import * as express from 'npm:express';
const router = express.Router();
import * as sudoku from '../../frontend/js/sudoku.js';
import { converter } from '../lib/converter.js';

router.get('/:fileName', async (req, res) => {
    let content;
    const digits = /^[0-9]+$/;
    try {
        content = await converter(req.params.fileName);  // 9-array of 9-strngs
        assert(content instanceof Array, "should be an array");
        assert(content.length == 9, "need 9 rows");
        assert(content.every(row => row.length == 9), "need 9 columns");
        assert(content.every(row => digits.test(row)), "number must be between 0 and 9 inclusive");
    } catch (err) {
        return res.status(404).send(err.message);
    }


    const colNames = sudoku.colNames;
    const rowNames = sudoku.rowNames;
    const response = {};
    for (let row = 0; row < content.length; row++) {
        for (let col = 0; col < content[row].length; col++) {
            if (content[row][col] == 0) {
                continue;
            }
            response[`${colNames[col]}${rowNames[row]}`] = content[row][col];
        }
    }
    return res.json(response);
});

export { router };