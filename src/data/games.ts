export interface Game {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  color: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  isFeatured?: boolean;
  package: 'FE' | 'OTO1';
}

export const GAMES: Game[] = [
  // FE PACKAGE (5 Games) - The Essentials
  {
    id: 'sudoku-master',
    title: 'Sudoku Master',
    description: 'Classic Sudoku logic game. Includes Web HTML & KDP Printable Grids.',
    category: 'Puzzle',
    icon: 'Grid3X3',
    color: 'bg-wf-blue',
    difficulty: 'Hard',
    isFeatured: true,
    package: 'FE'
  },
  {
    id: 'word-search',
    title: 'Word Search',
    description: 'Find hidden words. Includes Web HTML & KDP Printable Worksheets.',
    category: 'Word',
    icon: 'Search',
    color: 'bg-wf-purple',
    difficulty: 'Medium',
    package: 'FE'
  },
  {
    id: 'maze-escape',
    title: 'Maze Escape',
    description: 'Navigate complex mazes. Includes Web HTML & KDP Activity Pages.',
    category: 'Puzzle',
    icon: 'Map',
    color: 'bg-wf-purple',
    difficulty: 'Medium',
    package: 'FE'
  },
  {
    id: 'quick-math',
    title: 'Quick Math',
    description: 'Solve equations fast. Includes Web HTML & KDP Math Worksheets.',
    category: 'Puzzle',
    icon: 'Calculator',
    color: 'bg-wf-gold',
    difficulty: 'Medium',
    package: 'FE'
  },
  {
    id: 'sliding-puzzle',
    title: 'Sliding Puzzle',
    description: 'Arrange tiles. Includes Web HTML & KDP "Cut & Play" Printable Activity.',
    category: 'Puzzle',
    icon: 'Move',
    color: 'bg-wf-gold',
    difficulty: 'Hard',
    package: 'FE'
  },
  // OTO 1 PACKAGE (10 KDP Games)
  {
    id: 'crossword',
    title: 'Crossword Puzzle',
    description: 'Classic crossword generator. Perfect for KDP puzzle books.',
    category: 'Word',
    icon: 'Grid',
    color: 'bg-wf-blue',
    difficulty: 'Hard',
    package: 'OTO1'
  },
  {
    id: 'cryptogram',
    title: 'Cryptogram',
    description: 'Decode famous quotes. High demand on Amazon KDP.',
    category: 'Word',
    icon: 'Key',
    color: 'bg-wf-purple',
    difficulty: 'Hard',
    package: 'OTO1'
  },
  {
    id: 'word-scramble',
    title: 'Word Scramble',
    description: 'Unscramble the letters. Great filler for activity books.',
    category: 'Word',
    icon: 'Shuffle',
    color: 'bg-wf-gold',
    difficulty: 'Medium',
    package: 'OTO1'
  },
  {
    id: 'killer-sudoku',
    title: 'Killer Sudoku',
    description: 'Advanced Sudoku with math. For hardcore puzzle fans.',
    category: 'Logic',
    icon: 'Skull',
    color: 'bg-wf-red',
    difficulty: 'Hard',
    package: 'OTO1'
  },
  {
    id: 'kakuro',
    title: 'Kakuro',
    description: 'Cross sums math puzzle. A rising trend on Etsy & KDP.',
    category: 'Logic',
    icon: 'Calculator',
    color: 'bg-wf-green',
    difficulty: 'Hard',
    package: 'OTO1'
  },
  {
    id: 'number-search',
    title: 'Number Search',
    description: 'Find hidden number sequences. Very popular and easy for all ages.',
    category: 'Logic',
    icon: 'Binary',
    color: 'bg-wf-blue',
    difficulty: 'Easy',
    package: 'OTO1'
  },
  {
    id: 'nonogram',
    title: 'Nonogram (Picross)',
    description: 'Paint by numbers logic puzzle. Reveals a pixel art picture.',
    category: 'Visual',
    icon: 'Image',
    color: 'bg-wf-purple',
    difficulty: 'Hard',
    package: 'OTO1'
  },
  {
    id: 'tic-tac-toe',
    title: 'Tic-Tac-Toe Grids',
    description: 'Classic activity page filler. Blank grids ready for print.',
    category: 'Visual',
    icon: 'Grid3X3',
    color: 'bg-wf-gold',
    difficulty: 'Easy',
    package: 'OTO1'
  },
  {
    id: 'missing-vowels',
    title: 'Missing Vowels',
    description: 'Word puzzle where vowels are removed from famous phrases.',
    category: 'Word',
    icon: 'Type',
    color: 'bg-wf-red',
    difficulty: 'Medium',
    package: 'OTO1'
  },
  {
    id: 'grid-copy',
    title: 'Grid Copy (Drawing)',
    description: 'Copy the pixel art from the left grid to the right grid.',
    category: 'Visual',
    icon: 'Copy',
    color: 'bg-wf-green',
    difficulty: 'Easy',
    package: 'OTO1'
  }
];
