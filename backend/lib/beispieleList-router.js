const { assert } = require('console');
const express = require('express');
const fs = require('fs/promises');
const router = express.Router();
router.get('/', async (req, res) => {
    function fileName2Path(fileName) {
        if (fileName.toLowerCase().endsWith('.json')) {
            return `/beispieleJSON/${fileName.substring(0, fileName.length - 5)}`;
        }
        if (fileName.toLowerCase().endsWith('.txt')) {
            return `/beispieleTXT/${fileName.substring(0, fileName.length - 4)}`;
        }
        return null;
    }
    let content;
    try {
        content = await fs.readdir('../beispiele/');
    } catch (err) {
        return res.status(404).send(err.message);
    }
    const response = content.map(fileName => {
        return {
            name: fileName,
            url: fileName2Path(fileName)
        };
    }).filter(x => x.url);
    return res.render("beispiele", { beispiele: response });
});

module.exports = router;