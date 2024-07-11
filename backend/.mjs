import path from 'path';
import { fileURLToPath } from 'url';

export function getAbsolutePath(relativePath) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.resolve(__dirname, relativePath);
}

// Verwendung in fetchSudoku.mjs:
import { getAbsolutePath } from './pathHelper.mjs';

const directoryPath = getAbsolutePath('../SUDOKUS');
// Verwenden Sie directoryPath in Ihrer fetchSudoku-Funktion