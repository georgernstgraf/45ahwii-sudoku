const fs = require('fs/promises');
function fileName2Path(fileName) {
    if (fileName.toLowerCase().endsWith('.json')) {
        return `/beispieleJSON/${fileName.substring(0, fileName.length - 5)}`;
    }
    if (fileName.toLowerCase().endsWith('.txt')) {
        return `/beispieleTXT/${fileName.substring(0, fileName.length - 4)}`;
    }
    return null;
}
async function beispiele() {
    let content;
    content = await fs.readdir('../beispiele/');
    const response = content.map(fileName => {
        return {
            name: fileName,
            url: fileName2Path(fileName)
        };
    }).filter(x => x.url);
    return response;
}
module.exports = { beispiele };