export const crosswordHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Crossword Puzzle</title>
<style>
  :root { --wf-bg: #E4E3E0; --wf-dark: #141414; --wf-white: #FFFFFF; --wf-blue: #00E5FF; }
  body { font-family: 'Courier New', Courier, monospace; background: var(--wf-bg); color: var(--wf-dark); margin: 0; padding: 20px; }
  .container { max-width: 900px; margin: 0 auto; background: var(--wf-white); border: 4px solid var(--wf-dark); box-shadow: 8px 8px 0px 0px var(--wf-dark); padding: 30px; }
  h1 { text-transform: uppercase; font-weight: 900; font-size: 2.5rem; border-bottom: 4px solid var(--wf-dark); padding-bottom: 10px; margin-top: 0; }
  .controls { display: flex; gap: 10px; margin-bottom: 30px; flex-wrap: wrap; }
  .btn { background: var(--wf-blue); color: var(--wf-dark); border: 4px solid var(--wf-dark); padding: 10px 20px; font-weight: 900; text-transform: uppercase; cursor: pointer; box-shadow: 4px 4px 0px 0px var(--wf-dark); }
  .btn:hover { transform: translate(2px, 2px); box-shadow: 2px 2px 0px 0px var(--wf-dark); }
  .custom-input-group { display: flex; gap: 10px; width: 100%; margin-bottom: 20px; flex-direction: column; }
  .custom-input-row { display: flex; gap: 10px; width: 100%; }
  .custom-input { flex-grow: 1; padding: 10px; border: 4px solid var(--wf-dark); font-family: 'Courier New', Courier, monospace; font-weight: bold; font-size: 1rem; text-transform: uppercase; }
  .custom-input.clue { flex-grow: 2; text-transform: none; }
  .word-list { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px; }
  .word-tag { background: var(--wf-dark); color: white; padding: 5px 10px; font-size: 0.8rem; font-weight: bold; display: flex; align-items: center; gap: 5px; }
  .word-tag button { background: none; border: none; color: var(--wf-blue); cursor: pointer; font-weight: bold; }
  
  .game-area { display: flex; gap: 40px; align-items: flex-start; flex-wrap: wrap; }
  .grid { display: grid; background: transparent; gap: 0; width: fit-content; }
  .cell { width: 40px; height: 40px; background: transparent; position: relative; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.5rem; text-transform: uppercase; box-sizing: border-box; }
  .cell.active { border: 2px solid var(--wf-dark); background: var(--wf-white); cursor: pointer; }
  .cell.active.selected { background: var(--wf-blue); color: var(--wf-dark); border-color: var(--wf-dark); }
  .cell.active.highlighted { background: #b3f5ff; }
  .cell.black { background: transparent !important; border: none; }
  .cell-num { position: absolute; top: 2px; left: 2px; font-size: 10px; font-weight: normal; }
  
  .clues { flex: 1; min-width: 300px; }
  .clue-section { margin-bottom: 20px; }
  .clue-section h3 { text-transform: uppercase; border-bottom: 2px solid var(--wf-dark); padding-bottom: 5px; }
  .clue-list { list-style: none; padding: 0; }
  .clue-list li { margin-bottom: 10px; line-height: 1.4; }
  
  @media print {
    body { background: white; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .container { border: none; box-shadow: none; padding: 0; }
    .no-print { display: none !important; }
    .grid { border: none !important; }
    .cell.active { border: 2px solid black !important; background: white !important; color: black !important; }
    .cell.black { background: transparent !important; border: none !important; }
    h1, h3, li, .cell-num { color: black !important; border-color: black !important; }
  }
</style>
</head>
<body>
  <div class="container">
    <h1>Crossword</h1>
    <div class="controls no-print">
      <div class="custom-input-group">
        <div class="custom-input-row">
          <input type="text" id="custom-word" class="custom-input" placeholder="Word (e.g. AMAZON)">
          <input type="text" id="custom-clue" class="custom-input clue" placeholder="Clue (e.g. Online marketplace)">
          <button class="btn" onclick="addCustomWord()">Add</button>
        </div>
        <div id="word-list" class="word-list"></div>
        <button class="btn" onclick="generateCustomPuzzle()" style="width: 100%; background: var(--wf-dark); color: white;">Generate Custom Puzzle</button>
      </div>
      <button class="btn" onclick="generate()">Random Template</button>
      <button class="btn" onclick="toggleAnswers()" style="background: var(--wf-white);">Toggle Answers</button>
      <button class="btn" onclick="window.print()" style="background: var(--wf-dark); color: white;">Print (KDP)</button>
    </div>
    <div id="keyboard-hint" class="no-print" style="margin-bottom: 15px; font-weight: bold; color: var(--wf-dark); background: #fff3cd; padding: 10px; border: 2px solid #ffeeba; display: inline-block;">💡 Tip: Click on a cell to start typing. Use Arrow keys to navigate, Backspace to delete.</div>
    <div class="game-area" id="game-board"></div>
  </div>
  <script>
    let customWords = [];

    function addCustomWord() {
      const wordInput = document.getElementById('custom-word');
      const clueInput = document.getElementById('custom-clue');
      const word = wordInput.value.trim().toUpperCase().replace(/[^A-Z]/g, '');
      const clue = clueInput.value.trim();

      if (word.length < 2) {
        alert("Word must be at least 2 letters long (letters only).");
        return;
      }
      if (!clue) {
        alert("Please provide a clue.");
        return;
      }

      customWords.push({ word, clue });
      wordInput.value = '';
      clueInput.value = '';
      renderWordList();
    }

    function removeCustomWord(index) {
      customWords.splice(index, 1);
      renderWordList();
    }

    function renderWordList() {
      const list = document.getElementById('word-list');
      list.innerHTML = customWords.map((item, index) => 
        \`<div class="word-tag">\${item.word} <button onclick="removeCustomWord(\${index})">X</button></div>\`
      ).join('');
    }

    // A very basic crossword generator algorithm for custom words
    function generateCustomPuzzle() {
      if (customWords.length < 2) {
        alert("Please add at least 2 words to generate a puzzle.");
        return;
      }

      // Sort words by length descending
      const words = [...customWords].sort((a, b) => b.word.length - a.word.length);
      
      const gridSize = 15;
      const grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
      const placements = [];

      // Place first word horizontally in the middle
      const firstWord = words[0];
      const startCol = Math.floor((gridSize - firstWord.word.length) / 2);
      const startRow = Math.floor(gridSize / 2);
      
      for (let i = 0; i < firstWord.word.length; i++) {
        grid[startRow][startCol + i] = firstWord.word[i];
      }
      placements.push({ ...firstWord, row: startRow, col: startCol, dir: 'across' });

      // Try to place remaining words
      for (let i = 1; i < words.length; i++) {
        const currentWord = words[i];
        let placed = false;

        // Find intersections
        for (let j = 0; j < currentWord.word.length && !placed; j++) {
          const char = currentWord.word[j];
          
          for (let r = 0; r < gridSize && !placed; r++) {
            for (let c = 0; c < gridSize && !placed; c++) {
              if (grid[r][c] === char) {
                // Try vertical placement
                const startR = r - j;
                if (startR >= 0 && startR + currentWord.word.length <= gridSize) {
                  let canPlace = true;
                  for (let k = 0; k < currentWord.word.length; k++) {
                    if (k !== j && grid[startR + k][c] !== '') {
                      canPlace = false;
                      break;
                    }
                  }
                  if (canPlace) {
                    for (let k = 0; k < currentWord.word.length; k++) {
                      grid[startR + k][c] = currentWord.word[k];
                    }
                    placements.push({ ...currentWord, row: startR, col: c, dir: 'down' });
                    placed = true;
                  }
                }
              }
            }
          }
        }
      }

      // Convert to standard format
      const binaryGrid = grid.map(row => row.map(cell => cell === '' ? 0 : 1));
      const numbers = {};
      const across = [];
      const down = [];
      let numCounter = 1;

      placements.forEach(p => {
        const key = \`\${p.row},\${p.col}\`;
        if (!numbers[key]) {
          numbers[key] = numCounter++;
        }
        if (p.dir === 'across') {
          across.push(\`\${numbers[key]}. \${p.clue}\`);
        } else {
          down.push(\`\${numbers[key]}. \${p.clue}\`);
        }
      });

      currentPuzzle = {
        cols: gridSize,
        rows: gridSize,
        grid: binaryGrid,
        answers: grid,
        numbers: numbers,
        across: across,
        down: down
      };

      showAnswers = false;
      initUserAnswers(gridSize, gridSize);
      render();
    }

    const puzzles = [
      {
        cols: 9, rows: 9,
        grid: [
          [0,0,0,1,0,0,0,0,0],
          [0,0,0,1,0,0,0,0,0],
          [0,1,1,1,1,1,1,0,0],
          [0,0,0,1,0,0,0,0,0],
          [0,0,1,1,1,1,0,0,0],
          [0,0,0,1,0,0,0,0,0],
          [0,0,0,1,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0]
        ],
        answers: [
          ['','','','P','','','','',''],
          ['','','','U','','','','',''],
          ['','A','M','A','Z','O','N','',''],
          ['','','','L','','','','',''],
          ['','','B','O','O','K','','',''],
          ['','','','S','','','','',''],
          ['','','','H','','','','',''],
          ['','','','','','','','',''],
          ['','','','','','','','','']
        ],
        numbers: { "0,3": 1, "2,1": 2, "4,2": 3 },
        across: [ "2. Online marketplace", "3. Written work" ],
        down: [ "1. To issue a book for sale" ]
      },
      {
        cols: 9, rows: 7,
        grid: [
          [0,0,1,0,0,0,0,0,0],
          [0,0,1,0,0,1,1,1,1],
          [1,1,1,1,1,1,0,0,0],
          [0,0,1,0,0,1,0,0,0],
          [0,0,1,0,0,1,0,0,0],
          [0,0,1,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0]
        ],
        answers: [
          ['','','I','','','','','',''],
          ['','','N','','','P','L','A','Y'],
          ['P','U','Z','Z','L','E','','',''],
          ['','','O','','','G','','',''],
          ['','','M','','','E','','',''],
          ['','','E','','','','','',''],
          ['','','','','','','','','']
        ],
        numbers: { "0,2": 1, "1,5": 2, "2,0": 3 },
        across: [ "2. A game or toy", "3. A brain teaser" ],
        down: [ "1. Revenue stream", "2. A piece of paper (PAGE)" ]
      },
      {
        cols: 10, rows: 10,
        grid: [
          [0,0,0,0,0,0,0,0,0,0],
          [0,0,1,1,1,1,1,1,0,0],
          [0,0,1,0,0,0,0,0,0,0],
          [0,0,1,0,0,1,1,1,1,0],
          [0,0,1,0,0,1,0,0,0,0],
          [0,1,1,1,1,1,0,0,0,0],
          [0,0,1,0,0,1,0,0,0,0],
          [0,0,0,0,0,1,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0]
        ],
        answers: [
          ['','','','','','','','','',''],
          ['','','A','U','T','H','O','R','',''],
          ['','','R','','','','','','',''],
          ['','','T','','','C','O','P','Y',''],
          ['','','I','','','O','','','',''],
          ['','S','S','A','L','E','','','',''],
          ['','','T','','','D','','','',''],
          ['','','','','','E','','','',''],
          ['','','','','','','','','',''],
          ['','','','','','','','','','']
        ],
        numbers: { "1,2": 1, "3,5": 2, "5,1": 3 },
        across: [ "1. Writer of a book", "2. A single specimen of a book", "3. The exchange of a commodity for money" ],
        down: [ "1. A person who creates art", "2. Instructions for a computer program (CODE)" ]
      }
    ];

    let currentPuzzle = null;
    let showAnswers = false;
    let userAnswers = [];
    let selectedRow = -1;
    let selectedCol = -1;
    let currentDir = 'across';

    function initUserAnswers(rows, cols) {
      userAnswers = Array(rows).fill(null).map(() => Array(cols).fill(''));
      selectedRow = -1;
      selectedCol = -1;
      currentDir = 'across';
    }

    function generate() {
      currentPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
      showAnswers = false;
      initUserAnswers(currentPuzzle.rows, currentPuzzle.cols);
      render();
    }

    function toggleAnswers() {
      showAnswers = !showAnswers;
      render();
    }

    function selectCell(r, c) {
      if (showAnswers) return;
      if (selectedRow === r && selectedCol === c) {
        currentDir = currentDir === 'across' ? 'down' : 'across';
      } else {
        selectedRow = r;
        selectedCol = c;
      }
      render();
    }

    function isCellInCurrentWord(r, c) {
      if (selectedRow === -1 || selectedCol === -1) return false;
      if (r === selectedRow && c === selectedCol) return false;
      
      if (currentDir === 'across' && r === selectedRow) {
        let minC = Math.min(c, selectedCol);
        let maxC = Math.max(c, selectedCol);
        for (let i = minC; i <= maxC; i++) {
          if (currentPuzzle.grid[r][i] === 0) return false;
        }
        return true;
      } else if (currentDir === 'down' && c === selectedCol) {
        let minR = Math.min(r, selectedRow);
        let maxR = Math.max(r, selectedRow);
        for (let i = minR; i <= maxR; i++) {
          if (currentPuzzle.grid[i][c] === 0) return false;
        }
        return true;
      }
      return false;
    }

    document.addEventListener('keydown', (e) => {
      if (document.activeElement.tagName === 'INPUT') return;
      if (selectedRow === -1 || selectedCol === -1) return;
      if (showAnswers) return;

      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) {
        e.preventDefault();
      }

      if (e.key.length === 1 && e.key.match(/^[a-z]$/i)) {
        userAnswers[selectedRow][selectedCol] = e.key.toUpperCase();
        moveToNextCell();
        render();
      } else if (e.key === 'Backspace') {
        if (userAnswers[selectedRow][selectedCol] !== '') {
          userAnswers[selectedRow][selectedCol] = '';
        } else {
          moveToPrevCell();
          userAnswers[selectedRow][selectedCol] = '';
        }
        render();
      } else if (e.key === 'ArrowRight') {
        moveSelection(0, 1);
      } else if (e.key === 'ArrowLeft') {
        moveSelection(0, -1);
      } else if (e.key === 'ArrowDown') {
        moveSelection(1, 0);
      } else if (e.key === 'ArrowUp') {
        moveSelection(-1, 0);
      }
    });

    function moveSelection(dr, dc) {
      let nr = selectedRow + dr;
      let nc = selectedCol + dc;
      if (nr >= 0 && nr < currentPuzzle.rows && nc >= 0 && nc < currentPuzzle.cols && currentPuzzle.grid[nr][nc] === 1) {
        selectedRow = nr;
        selectedCol = nc;
        if (dr !== 0) currentDir = 'down';
        if (dc !== 0) currentDir = 'across';
        render();
      }
    }

    function moveToNextCell() {
      let dr = currentDir === 'down' ? 1 : 0;
      let dc = currentDir === 'across' ? 1 : 0;
      let nr = selectedRow + dr;
      let nc = selectedCol + dc;
      if (nr >= 0 && nr < currentPuzzle.rows && nc >= 0 && nc < currentPuzzle.cols && currentPuzzle.grid[nr][nc] === 1) {
        selectedRow = nr;
        selectedCol = nc;
      }
    }

    function moveToPrevCell() {
      let dr = currentDir === 'down' ? -1 : 0;
      let dc = currentDir === 'across' ? -1 : 0;
      let nr = selectedRow - dr;
      let nc = selectedCol - dc;
      if (nr >= 0 && nr < currentPuzzle.rows && nc >= 0 && nc < currentPuzzle.cols && currentPuzzle.grid[nr][nc] === 1) {
        selectedRow = nr;
        selectedCol = nc;
      }
    }

    function render() {
      if(!currentPuzzle) return;
      const p = currentPuzzle;
      let html = \`<div class="grid" style="grid-template-columns: repeat(\${p.cols}, 40px);">\`;
      
      for(let r=0; r<p.rows; r++) {
        for(let c=0; c<p.cols; c++) {
          const cell = p.grid[r][c];
          if(cell === 0) {
            html += \`<div class="cell black"></div>\`;
          } else {
            const num = p.numbers[\`\${r},\${c}\`];
            const ans = showAnswers ? p.answers[r][c] : userAnswers[r][c];
            const isSelected = (r === selectedRow && c === selectedCol);
            const isHighlighted = isCellInCurrentWord(r, c);
            
            let classes = "cell active";
            if (isSelected) classes += " selected";
            else if (isHighlighted) classes += " highlighted";

            html += \`<div class="\${classes}" onclick="selectCell(\${r}, \${c})">\${num ? \`<span class="cell-num">\${num}</span>\` : ''}<span class="cell-value">\${ans}</span></div>\`;
          }
        }
      }
      html += \`</div><div class="clues">\`;
      
      html += \`<div class="clue-section"><h3>Across</h3><ul class="clue-list">\`;
      p.across.forEach(clue => html += \`<li>\${clue}</li>\`);
      html += \`</ul></div>\`;
      
      html += \`<div class="clue-section"><h3>Down</h3><ul class="clue-list">\`;
      p.down.forEach(clue => html += \`<li>\${clue}</li>\`);
      html += \`</ul></div></div>\`;
      
      document.getElementById('game-board').innerHTML = html;
    }
    generate();
  </script>
</body>
</html>`;
