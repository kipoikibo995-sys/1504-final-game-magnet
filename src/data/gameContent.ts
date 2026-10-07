// Each game's HTML is loaded on demand so the main bundle doesn't carry every game.
const GAME_LOADERS: Record<string, () => Promise<string>> = {
  'quick-math': () => import('./game-content/quick-math').then(m => m.quickMathHTML),
  'sudoku-master': () => import('./game-content/sudoku-master').then(m => m.sudokuMasterHTML),
  'maze-escape': () => import('./game-content/maze-escape').then(m => m.mazeEscapeHTML),
  'sliding-puzzle': () => import('./game-content/sliding-puzzle').then(m => m.slidingPuzzleHTML),
  'word-search': () => import('./game-content/word-search').then(m => m.wordSearchHTML),
  'crossword': () => import('./game-content/crossword').then(m => m.crosswordHTML),
  'cryptogram': () => import('./game-content/cryptogram').then(m => m.cryptogramHTML),
  'word-scramble': () => import('./game-content/word-scramble').then(m => m.wordScrambleHTML),
  'killer-sudoku': () => import('./game-content/killer-sudoku').then(m => m.killerSudokuHTML),
  'kakuro': () => import('./game-content/kakuro').then(m => m.kakuroHTML),
  'number-search': () => import('./game-content/number-search').then(m => m.numberSearchHTML),
  'nonogram': () => import('./game-content/nonogram').then(m => m.nonogramHTML),
  'tic-tac-toe': () => import('./game-content/tic-tac-toe').then(m => m.ticTacToeHTML),
  'missing-vowels': () => import('./game-content/missing-vowels').then(m => m.missingVowelsHTML),
  'grid-copy': () => import('./game-content/grid-copy').then(m => m.gridCopyHTML),
  'futoshiki': () => import('./game-content/futoshiki').then(m => m.futoshikiHTML),
  'hangman': () => import('./game-content/hangman').then(m => m.hangmanHTML),
  'hashi': () => import('./game-content/hashi').then(m => m.hashiHTML),
  'minesweeper': () => import('./game-content/minesweeper').then(m => m.minesweeperHTML),
};

export function hasGameContent(id: string): boolean {
  return id in GAME_LOADERS;
}

export async function loadGameContent(id: string): Promise<string | null> {
  const loader = GAME_LOADERS[id];
  return loader ? loader() : null;
}
