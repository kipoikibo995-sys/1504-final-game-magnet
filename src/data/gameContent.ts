import { quickMathHTML } from './game-content/quick-math';
import { sudokuMasterHTML } from './game-content/sudoku-master';
import { mazeEscapeHTML } from './game-content/maze-escape';
import { slidingPuzzleHTML } from './game-content/sliding-puzzle';
import { wordSearchHTML } from './game-content/word-search';
import { crosswordHTML } from './game-content/crossword';
import { cryptogramHTML } from './game-content/cryptogram';
import { wordScrambleHTML } from './game-content/word-scramble';
import { killerSudokuHTML } from './game-content/killer-sudoku';
import { kakuroHTML } from './game-content/kakuro';
import { numberSearchHTML } from './game-content/number-search';
import { nonogramHTML } from './game-content/nonogram';
import { ticTacToeHTML } from './game-content/tic-tac-toe';
import { missingVowelsHTML } from './game-content/missing-vowels';
import { gridCopyHTML } from './game-content/grid-copy';

export const GAME_CONTENT: Record<string, string> = {
  'quick-math': quickMathHTML,
  'sudoku-master': sudokuMasterHTML,
  'maze-escape': mazeEscapeHTML,
  'sliding-puzzle': slidingPuzzleHTML,
  'word-search': wordSearchHTML,
  'crossword': crosswordHTML,
  'cryptogram': cryptogramHTML,
  'word-scramble': wordScrambleHTML,
  'killer-sudoku': killerSudokuHTML,
  'kakuro': kakuroHTML,
  'number-search': numberSearchHTML,
  'nonogram': nonogramHTML,
  'tic-tac-toe': ticTacToeHTML,
  'missing-vowels': missingVowelsHTML,
  'grid-copy': gridCopyHTML,
};
