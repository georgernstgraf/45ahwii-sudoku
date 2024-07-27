const { assert } = require('console');
const express = require('express');
const fs = require('fs/promises');
const router = express.Router();
const sudoku = require('../../frontend/js/sudoku.js');

router.get('/:fileName', async (req, res) => {
    let content;
    const response = {};
    try {
        content = await fs.readFile(`../beispiele/${req.params.fileName}.json`, 'utf8');
        content = JSON.parse(content);
        assert(content instanceof Array, "should be an array");
        assert(content.length == 9, "need 9 rows");
        assert(content.every(row => row.length == 9), "need 9 columns");
        assert(content.every(row => row.every(cell => cell >= 0 && cell <= 9)), "number must be between 0 and 9 inclusive");
    } catch (err) {
        return res.status(404).send(err.message);
    }
    const colNames = sudoku.colNames;
    const rowNames = sudoku.rowNames;
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

module.exports = router;